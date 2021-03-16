'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const notFoundError = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const authRoutes = require('./auth/routers/auth-routes.js');
const app = express();

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);


app.use(notFoundError);
app.use(errorHandler);

module.exports = {
  app:app,
  start: port => {
    app.listen(port, () => {
      console.log(`Server is ready to rock and roll on port ${port}`);
    });
  },
};