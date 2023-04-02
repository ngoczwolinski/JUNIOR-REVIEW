//--------------------------------- START OF IMPORT-----------------------------
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const PORT = 3000;
const dotenv = require('dotenv');

// const apiRouter = require('./routes/apiRoute');

//------------------------------- START OF MIDDLEWARE --------------------------
//Handle parsing request body
app.use(express.json());
// handle parsing the input 
app.use(express.urlencoded({ extended: true }));

//Handle requests for static files
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

//Transfer all current cookies in browser to the request cookies
app.use(cookieParser());

const logLocation = (req, res, next) => {
  console.log('HERE');
  return next();
};
//-----------------------------START OF ROUTING HANDLERS------------------------
//Forward all request to /api to api router
// app.use('/api', apiRouter);
app.post('/login', logLocation, (req, res) => {
  console.log('body',req.body);
  res.send('nice');
});

//---------------------------- START OF GENERAL ROUTES--------------------------
// route handler to respond with main app
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});
// catch-all route handler for any requests to an unknown route
// app.use('*', (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, '../client/404.html'));
// });

//----------------------------- START OF ERROR HANDLER--------------------------
/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
// ---------------------------- CONNECT TO SERVER ------------------------------
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

// --------------------------- CONNECT TO DATABASE -----------------------------
dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const URI = process.env.MONGO_URI;

mongoose
  .connect(URI, {
    // these are parsers to prevent deprecation errors
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // set name of db
    dbName: 'jr-crud-demo',
  })
  .then(() => console.log('db connected'))
  .catch((err) => `db error: ${err}`);

module.exports = app;
