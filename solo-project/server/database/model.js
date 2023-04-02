const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const SALT_WORK_FACTOR = 10;

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
});

// here we use .env, grab the url of your database and add it to
const URI = process.env.MONGO_URI;

// grab schema construtor from mongoose
const Schema = mongoose.Schema;

// connect database
mongoose
  .connect(URI, {
    // these are parsers to prevent deprecation errors
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // set name of db
    dbName: 'jr-crud-demo',
  })
  .then(() => console.log('db connected'))
  .catch((err) => `ran into error: ${err}`);

// define schemas for our collections:
const userSchema = new Schema({
  username: { type: String, required: true },
  password: String,
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

// we then export our collection
module.exports = User;
