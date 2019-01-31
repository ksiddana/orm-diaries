const _ = require('lodash');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');

const app = require('express').Router();
var { Todo } = require('./db/models/todo');
var { User } = require('./db/models/user');
var { authenticate } = require('./middleware/authenticate');


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
  }).catch((e) => {
    res.status(401).send(e)
  });
});


/*
app.get('/users/me', (req, res) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject();
    }
    res.send(user);
  }).catch(e => {
    res.status(401).send();
  });
});
*/

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch(e => {
    res.status(401).send();
  });
}

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user.toJSON())
    });
  }).catch((e) => {
    res.send(400).send(e);
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});


app.get('*', (req, res, next) => {
  const routePath = path.join(__dirname + '..', '..', 'src/' + 'index.html');
  res.sendFile(routePath);
});

module.exports = app;
