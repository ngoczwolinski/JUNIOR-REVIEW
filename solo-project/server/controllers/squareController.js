const { User, Session, Square } = require('../database/model.js');

const squareController = {};

// get all squares for the loggedin user
squareController.getSquares = async (req, res, next) => {
  const { SessionID } = req.cookies;

  let sessionDoc;

  try {
    sessionDoc = await Session.findOne({ id : SessionID });
  } catch(err) {
    return next('Could not find session with squareController.getSquares');
  }

  try {
      user = await User.findOne({ id : sessionDoc.user_id });
    } catch(err) {
      return next('Could not find user with squareController.getSquares');
  }

  try {
    squares = await Square.find({ user_id: user.id});
    res.locals.squares = squares;
    return next();
  } catch(err) {
    return next('Could not find squares with squareController.getSquares');
}

}

squareController.createSquare= async (req, res, next) => {
    console.log('Inside postMethod');
  
    // they will input a square color in the form
    const { color } = req.body; 
  
    const { SessionID } = req.cookies;

    let sessionDoc;
  
    try {
      sessionDoc = await Session.findOne({ id : SessionID });
    } catch(err) {
      return next('Could not find session with squareController.createSquare');
    }

    try {
        user = await User.findOne({ id : sessionDoc.user_id });
      } catch(err) {
        return next('Could not find user with squareController.createSquare');
    }

    try {
        square = await Square.create({ user_id: user.id, color: color});
        res.locals.newSquare = square;
        return next();
    } catch(err) {
        return next('Could not create square with squareController.createSquare');
    }


  };

module.exports = squareController;