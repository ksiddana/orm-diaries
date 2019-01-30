const express = require('express');
const bodyParser = require('body-parser');

const { addUser } = require('./mongoose-queries');

const apiRouter = express.Router();

apiRouter.use(bodyParser.json({ type: 'application/json' }));

apiRouter.post('/users', addUser);

module.exports = apiRouter;
