'use strict';

const { sign } = require('./jwt.util');

const router = require('express').Router();
//health
router.get('/health', (req, res) => {
  res.json({ message: 'API running' });
});
//get token
router.post('/access-token', (req, res) => {
  if (req.body.username == 'test' && req.body.password == '123') {
    const token = sign();
    res.json({ token });
  } else {
    res.status(401).send({ message: 'User or password invalid' });
  }
});
//refresh token
router.post('/refresh-token', (req, res) => {
  //TODO valid x-api-key valid
  if (req.header['x-api-key']) {
    const token = sign();
    res.json({ token });
  } else {
    res.status(401).send({ message: 'Token no provided' });
  }
});
//test => params, query and headers are coming
router.get('/test/:id', (req, res) => {
  console.log(req.query);
  console.log(req.headers.params);
  console.log(req.headers['x-api-key']);
  if (req.params.id == '1') {
    res.json({
      id: 1,
      name: 'Administrator',
    });
  } else {
    res.status(422).send({ message: 'Test not exists' });
  }
});

module.exports = (app) => app.use(router);
