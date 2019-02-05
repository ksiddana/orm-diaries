const _ = require('lodash');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var { ObjectID } = require('mongodb');

const express = require('express')
var { Todo } = require('./db/models/todo');
var { User } = require('./db/models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();

app.use(bodyParser.json());

// create a new todo for an authenticated user
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET all the todos for a authenticated user
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({ todos })
  }, (e) => {
    res.send(e);
  });
});

// GET /todos/1234 specific todo item
app.get('/todos/:id', authenticate, (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({ todo })
  }).catch(e => {
    res.send(e);
  });
});


app.delete('/todos/:id', authenticate, (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then(todo => {
    if (!todo) {
      return res.status(404).send();
    }
    return res.send(todo)
  }, e => {
    res.status(404).send(e);
  }).catch(e => {
    res.send(e)
  });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({ _id: id, _creator: req.user._id },  { $set: body },  { new: true }).then(todo => {
    if (!todo) {
      res.status(404).send('Not found id');
    }
    res.send({todo})
  }).catch(e => {
    res.status(404).send('Major Error sir');
  })
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

// app.get('*', (req, res, next) => {
//   const routePath = path.join(__dirname + '..', '..', 'src/' + 'index.html');
//   res.sendFile(routePath);
// });

module.exports = app;
