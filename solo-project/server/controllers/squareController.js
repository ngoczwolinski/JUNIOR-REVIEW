const { User, Session, Square } = require('../database/model.js');

const squareController = {};

// get all squares for the loggedin user
squareController.getSquares = async (req, res, next) => {
  const { SessionID } = req.cookies;

  const userID = '6429fab9ec4d408c20ff3f2d';

  try {
    const user = await User.findOne({ id: SessionID });
    console.log({ user });
    // const squares = await Square.find({ user_id: SessionID });
    // trying to do it the hardcoded way
    const squares = await Square.find({ user_id: SessionID });
    res.locals.squares = squares;
    console.log('squares from squareController.getSquares ', squares);
    return next();
  } catch (err) {
    return next('Could not find squares with squareController.getSquares');
  }
};

squareController.createSquare = async (req, res, next) => {
  // they will input a square color in the form
  const { color } = req.body;

  const { SessionID } = req.cookies;

  let sessionDoc;
  let user;
  let square;

  // try {
  //   sessionDoc = await Session.findOne({ id: SessionID });
  // } catch (err) {
  //   return next('Could not find session with squareController.createSquare');
  // }

  // try {
  //   user = await User.findOne({ id: sessionDoc.user_id });
  // } catch (err) {
  //   return next('Could not find user with squareController.createSquare');
  // }

  // hard coding claire's account's id so getSquares can work...
  const userID = '6429fab9ec4d408c20ff3f2d';

  try {
    // userID used to be user.id
    square = await Square.create({ user_id: userID, color: color });
    res.locals.newSquare = square;
    return next();
  } catch (err) {
    return next('Could not create square with squareController.createSquare');
  }
};

module.exports = squareController;
