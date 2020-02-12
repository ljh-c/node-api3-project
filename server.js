const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

const logger = (req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} Request to ${req.originalUrl}`);

  console.dir(req.headers);

  next();
}

module.exports = server;