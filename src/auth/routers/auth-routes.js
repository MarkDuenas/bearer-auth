'use strict';

const express = require('express');

const authRouter = express.Router();

const User = require('../models/users-model.js');
const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');

authRouter.post('/signup', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(user => res.status(201).send(user));
});

authRouter.post('/signin', basicAuth, (req, res) => {
  res.status(200).json({message: 'Sign in successful', user: req.user });
});

authRouter.get('/user', bearerAuth, (req, res) => {
  res.status(200).json({ messge: 'Token valid, User access permitted', user: req.user })
});

module.exports = authRouter;