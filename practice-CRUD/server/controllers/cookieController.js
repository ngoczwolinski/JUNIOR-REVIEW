const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    // we want the cookie to have the property sessionID, the same id as the session (whose id is the user's id)
    res.cookie('sessionID', res.locals.user._id, { httpOnly: true });
    // console.log('You created a user and then started a session,  here is a cookie', res.cookies); // returning undefined
    return next();
}

module.exports = cookieController;