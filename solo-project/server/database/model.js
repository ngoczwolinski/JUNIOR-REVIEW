const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const SALT_WORK_FACTOR = 10;

// grab schema construtor from mongoose
const Schema = mongoose.Schema;

// define schemas for our collections:
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: String,
});

// define schema for Session collection
const sessionSchema = new Schema({
  // has an id that gets automatically created
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  createdAt: { type: Date, expires: 3000, default: Date.now },
});

// define schema for Square collection
const squareSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  color: String,
  text: String,
});

// create a pre that runs everytime we are adding a user; here it hashes password
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (error, hash) => {
    if (error) return next(error);
    this.password = hash;
    return next();
  });
});

// then create our collection
const User = mongoose.model('user', userSchema);
const Session = mongoose.model('session', sessionSchema);
const Square = mongoose.model('square', squareSchema);

// we then export our collection
module.exports = { User, Session, Square };
