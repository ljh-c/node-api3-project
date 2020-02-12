const express = require('express');

const userRouter = require('./users/userRouter.js');

const server = express();

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toUTCString()}]\n${req.method} Request to ${req.originalUrl}`);

  // console.dir(req.headers);

  next();
}

server.use(express.json());

server.use('/api/user', logger, userRouter);

module.exports = server;