'use strict';

require('dotenv').config();
const  server  = require('./src/server.js');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3333;
const MONGODB_URI = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGODB_URI, options)
  .then( () => {
    console.log('Connected to the DB');
    server.start(PORT);
  })
  .catch(err => {console.error(err)});