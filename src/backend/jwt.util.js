const jwt = require('jsonwebtoken');
const secret = 'b43fdd98b1fd705ae4c3a10cf25aad8a'; //backend
module.exports.sign = function () {
  const payload = {
    id: 1,
    name: 'Test',
  };
  return jwt.sign(payload, secret);
};
module.exports.verify = function () {
  const payload = {
    id: 1,
    name: 'Test',
  };
  const secret = 'b43fdd98b1fd705ae4c3a10cf25aad8a'; //backend
  const token = jwt.sign(payload, secret);
  res.json({ token });
};

module.exports.verify = function (apiKey, req, res, next, callBack) {
  // Verify token
  return jwt.verify(apiKey, secret, (err, decoded) => {
    return callBack(err, res, req, next, decoded);
  });
};
