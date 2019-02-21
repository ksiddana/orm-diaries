const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://admin:passw0rd@ds147125.mlab.com:47125/heroku_1qjjmrjx';
mongoose.Promise = global.Promise;


if (process.env.NODE_ENV !== 'production') {
  mongoose.connect('mongodb://localhost:27017/TodoApp');
} else {
  mongoose.connect(MONGO_URI, (err, db) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to Production database", db.host + '/'+ db.name);
    }
  });
}

module.exports = { mongoose };
