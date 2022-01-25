'use strict';
const router = require('express').Router();
//health
router.get('/health', (req, res) => {
  res.json({ message: 'API running' });
});
//get token
router.post('/access-token', (req, res) => {
  if (req.body.username == 'test' && req.body.password == '123') {
    res.json({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0Iiwic2VuaGEiOiIxMjMifQ.TJJ3WaWIVTOmjUCMZ39d33yKCjl068k0wNyK0_A86PI',
    });
  } else {
    res.status(401).send({ message: 'User or password invalid' });
  }
});
//refresh token
router.post('/refresh-token', (req, res) => {
  if (req.header['x-api-key']) {
    res.json({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0Iiwic2VuaGEiOiIxMjMifQ.TJJ3WaWIVTOmjUCMZ39d33yKCjl068k0wNyK0_A86PI',
    });
  } else {
    res.status(401).send({ message: 'Token no provided' });
  }
});

module.exports = (app) => app.use(router);
