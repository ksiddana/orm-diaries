const _ = require('lodash');
var bodyParser = require('body-parser');
const app = require('express').Router();
var { Todo } = require('./db/models/todo');
var { User } = require('./db/models/user');

app.use(bodyParser.json());

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({ todos })
  }, (e) => {
    res.send(e);
  });
});

app.post('/users', (req, res) => {
  console.log(req.body);
  const body = _.pick(req.body, ['username', 'password']);

  const user = new User({
    email: body.username,
    password: body.password
  });

  user.save().then(user => {
    return user.generateAuthToken();
    // res.send(doc)
  }).then((token) => {
    res.header('x-auth', token).send(user.toJSON())
  }).catch((e) => res.status(400).send(e));
});

app.get('*', (req, res, next) => {
  const routePath = path.join(__dirname + '..', '..', 'src/' + 'index.html');
  res.sendFile(routePath);
});

module.exports = app;
