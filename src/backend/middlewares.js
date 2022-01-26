module.exports = (express, app) => {
  app.use(express.urlencoded({ limit: '5mb', extended: true }));
  app.use(express.json({ limit: '5mb' }));
  const cors = require('cors');
  app.use(cors());
  //handle auth api
  app.use(_verifyApiKey);
  //handle api error
  app.use(_handleErrorMiddleware);
};

function _handleErrorMiddleware(err, req, res, next) {
  const code = err.status || 500;
  let message = req.tokenError ? req.tokenError : err.message + ' ' + err.path;
  const data = {
    code: code,
    message: message,
    error: err.name,
  };
  res.status(code).send(data);
}
function _verifyApiKey(req, res, next) {
  const jwt = require('jsonwebtoken');
  const secret = '1234';
  // Get auth header value
  const apiKey = req.headers['x-api-key'];
  const public = ['/access-token', '/refresh-token', '/health'];

  if (public.includes(req.originalUrl)) {
    return next();
  }
  //exist token
  else if (apiKey) {
    //pre validation
    if (apiKey.split(' ').length > 1) {
      req.tokenError = `Token jwt invalid`;
      return false;
    }
    // Verify token
    jwt.verify(apiKey, secret, (err, decoded) => {
      //invalid token (expired or other)
      if (err) {
        req.tokenError = `Token ${err.message}`;
        return next('router');
      } else {
        // Save session in request
        req.security = decoded;
        next();
      }
    });
  } else {
    //token error
    req.tokenError = 'Token is required. Access Denied';
    res.status(401).send({
      statusCode: 403,
      statusText: 'FORBIDDEN',
      path: req.originalUrl,
      message: 'Token is required. Access Denied',
    });
  }
}
