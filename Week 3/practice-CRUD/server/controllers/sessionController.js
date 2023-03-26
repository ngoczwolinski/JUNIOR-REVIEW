const {Session} = require('../db.js');

const sessionController = {};

// check if user has a logged in session
sessionController.isLoggedIn = (req, res, next) => {
    // console.log('we need to check if there\'s a cookie, and if said cookie has an id that matches a session id', req.cookies);

    Session.findOne(
        { cookieID: req.cookies.sessionID },
        (error, session) => {
            if (error) {
                return next('sessionController.isLoggedIn: ' + JSON.stringify(error));
            }
            else if (!session) {
                // console.log('req.cookies', req.cookies);
                res.redirect('/login');
            }
            else {
                return next();
            }
        }
    );
}

sessionController.startSession = (req, res, next) => {
    const id  = res.locals.user._id;

    // session will have the user's id as its cookie id
    Session.create(
        { cookieID: id },
        (error, session) => {
            if (error) {
                return next('sessionController.startSession, ' + JSON.stringify(error));
            }
            else {
            //   console.log("You just created a user, here is the session ", session);
              return next();
            } 
        });
}

module.exports = sessionController;