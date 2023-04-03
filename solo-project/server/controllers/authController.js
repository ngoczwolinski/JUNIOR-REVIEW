const { Session } = require('../database/model');

const authController = {};

authController.makeSession = async (req, res, next) => {
  // Extract id from our user
  // you must do ._id if you create add a foreign key referring to user in the session schema
  console.log('user id', res.locals.user.id);
  const id = res.locals.user.id;
  try {
    // Create a session document using the id
    const sessionDoc = await Session.create({ user_id : id });
    res.locals.sessionDoc = sessionDoc;
    return next();
  }
  catch {
    return next('Error in authoController.makeSession: ', error)
  }
}

authController.addCookie = async (req, res, next) => {
  // Extract id from sessionDoc
  const sessionID = res.locals.sessionDoc.id;
  try {
    // Create a cookie with the session id; make it secure
    res.cookie('sessionID', sessionID, { httpOnly: true });
    return next();
  }
  catch {
    return next('Error in authoController.addCookie: ', error)
  }
}

authController.verifySession = async (req, res, next) => {
  // Extract sessionID from cookie
  const { sessionID } = req.cookies;
  try{
    const sessionDoc = await Session.findOne({ _id : sessionID});
    if (sessionDoc) return next();
    else res.redirect('/login')
  }
  catch (err){
    return next('Error in authoController.addCookie: ', error)
  }
}

authController.deleteSession = async (req, res, next) => {
  // Extract sessionID from cookie
  const { sessionID } = req.cookies;
  try {
    await Session.deleteOne({ _id: sessionID })
    res.locals.deletedSession = true;
    return next();
  }
  catch {
    return next('Error in authoController.addCookie: ', error)
  }
}

authController.deleteCookie = (req, res, next) => {
  // remove the cookie from our user's browser
  res.clearCookie('sessionID');
  res.locals.deletedCookie = true;
  return next();
}

module.exports = authController;