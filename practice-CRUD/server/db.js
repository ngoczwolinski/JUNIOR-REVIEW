const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

// this is the connection string for the mongoDB database
const MONGO_URI =
  'mongodb+srv://clairenj:HCQiD5bCU2v0BUcI@cluster0.qjgkucd.mongodb.net/?retryWrites=true&w=majority';

// connect to the database
// new url parser and unified topology are required options to avoid deprecation warnings
// dbName specifiess the name of the database to connect to at the URI
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'pokefriends',
  })
  .then(() => console.log('connected to mongo db'))
  .catch((error) => console.log(error));

const Schema = mongoose.Schema;

// creates a schema for the user
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// this is a pre-save hook that will hash the password before saving it to the database
// salt work factor is the number of rounds of hashing to apply, the higher the number the more secure but the more computing power is needed
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (error, hash) => {
    if (error) return next(error);
    this.password = hash;
    return next();
  });
});

const pokemonSchema = new Schema({
  name: { type: String, required: true },
  sprite: { type: String, required: true },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const sessionSchema = new Schema({
  cookieID: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const User = mongoose.model('users', userSchema);

const Session = mongoose.model('sessions', sessionSchema);

const Pokemon = mongoose.model('pokemon', pokemonSchema);

module.exports = {
  User,
  Session,
  Pokemon,
};
