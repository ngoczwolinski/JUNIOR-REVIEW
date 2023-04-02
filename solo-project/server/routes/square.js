const express = require('express');
const router = express.Router();
const {createSquare, getSquares} = require('../controllers/squareController');
const {verifySession} = require('../controllers/authController')
 
// // GET request to data base to show all reciepes in db
// router.get('/', getMethod, (req, res, next) => {
//   console.log('get squareRoute');
//   res.status(200).json(res.locals.getInformation);
// });

// POST request to data base to show all reciepes in db
router.post('/', verifySession, createSquare, (req, res, next) => {
  console.log('post squareRoute');
  return res.status(201).json(res.locals.newSquare);
}); 

// router.get('/getsquares', verifySession, getSquares, (req, res, next) => {
//   return res.status(201).json(res.locals.squares);
// });

// // PUT request to data base to show all reciepes in db
// router.put('/', putMethod, (req, res, next) => {
//   console.log('put squareRoute');
//   res.status(200).json(res.locals.putInformation);
// });

// // DELETE request to data base to show all reciepes in db
// router.delete('/', deleteMethod, (req, res, next) => {
//   console.log('delete squareRoute');
//   res.status(200).json(res.locals.deleteInformation);
// });

module.exports = router;
