'use strict';

const User = require('../models/users-model.js');

module.exports = async (req, res, next) => {
  if(!req.headers.authorization) next('No Token Available');
  
  const token = req.headers.authorization.split(' ').pop();

  try {

    req.user = await User.authenticateToken(token);
    next();

  } catch (e) {
    res.status(403).send('Invalid Login');
  };

  // User.authenticateToken(token)
  //   .then(user => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch(e => next( { message:'User is not valid', status: 403 } ));
  
};