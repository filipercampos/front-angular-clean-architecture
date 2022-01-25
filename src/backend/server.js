const express = require('express');
const app = express();
const http = require('http');
const expressMiddleware = require('./middlewares');
const routes = require('./routes');
//setup middleware app
expressMiddleware(express, app);
//api routes
routes(app);
//server
const server = http.createServer(app);
//port
const port = 3001;
//start app
server.listen(port, () => {
  console.log(`API running on port ${port}`);
});
