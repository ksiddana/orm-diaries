'use strict';
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes.js');
const mongoose = require('./db/mongoose');

let connection;

app.use('/', routes);

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));

  app.listen(port);
  console.log('DEV ENV server running at http://localhost:' + port);

}
else {
  const static_path = path.join(__dirname, '..', 'dist');
  app.use(express.static(static_path));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist/index.html'));
  });

  app.listen(port);
  console.log('PROD ENV server running at http://localhost:' + port);
}
