var mongoose = require('mongoose');
const validator = require('validator');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value)
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

// Model methods
// https://mongoosejs.com/docs/api.html#document_Document-toJSON
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  // user.tokens.push({access, token})
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => { return token })
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject('error')
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject('no user found');
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, hash) => {
        if (hash === true) {
          resolve(user);
        } else {
          reject();
        }
      })
    })
  })
}


// This are methods from the Mongoose documentation
// https://mongoosejs.com/docs/api.html#schema_Schema-pre
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = { User };
