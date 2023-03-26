const { User } = require('../db.js');
const bcrypt = require('bcryptjs');

const userController = {};

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;

  // console.log('req.body', req.body);

  if (!username || !password)
    return next({
      log: 'No username or password in verifyUser in verifyUser.js',
    });

  User.findOne({ username: username }, (error, user) => {
    if (error) {
      return next('userController.verifyUser: ' + JSON.stringify(error));
    } else if (user === null) {
      res.redirect('/register');
    } else {
      bcrypt.compare(password, user.password, function (error, result) {
        if (error) {
          return next('userController.verfiyUser: ' + JSON.stringify(error));
        } else if (result === false) {
          // console.log('passwords do not match.  you shall not pass.');
          res.redirect('/register');
        } else {
          // store user on res.locals
          res.locals.user = user;
          // console.log('passwords match!');
          return next();
        }
      });
    }
  });
};

userController.createUser = (req, res, next) => {
  // the route calling this is register, and the method POST
  // so the response will have the filled out form for registration
  const { username, password } = req.body;

  if (!username || !password)
    return next('No username or password in createUser in userController.js');

  User.create({ username, password }, (error, user) => {
    if (error) {
      return next(
        'Trouble creating user in userController.js ' + JSON.stringify(error)
      );
    } else {
      // console.log("just created user with hashed password", user);
      // we want to use user when making a cookie and session later
      res.locals.user = user;
      return next();
    }
  });
};

module.exports = userController;
