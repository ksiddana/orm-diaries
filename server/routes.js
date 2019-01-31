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

// Creating new users using POST with an email and password in the body
// once the user is unique, we save the username and also generateAuthToken for that user
// we get the generated auth token which is hashed and salted and send that back to the server
// we send it in the header x-auth, custom header
app.post('/users', (req, res) => {
  console.log(req.body);
  const body = _.pick(req.body, ['email', 'password']);

  // const user = new User({
  //   email: body.email,
  //   password: body.password
  // });
  // more efficient way
  const user =  new User(body);

  user.save().then(user => {
    console.log(user);
    return user.generateAuthToken();
    // res.send(user)
  }).then((token) => {
    res.header('x-auth', token).send(user.toJSON())
  }).catch((e) => res.status(400).send(e));
});

app.get('*', (req, res, next) => {
  const routePath = path.join(__dirname + '..', '..', 'src/' + 'index.html');
  res.sendFile(routePath);
});

module.exports = app;
