// ---------------------------IMPORT MODUDLE PACKAGES---------------------------
// express is a NodeJS framework for building and managing a web server
const express = require('express');
/**
 * path module provides utilities for working with file and directory paths.
 * @example path.join(__dirname, fileLocationRelativeToCurrentDir) : give the exact path for file
 */
const path = require('path');
// we import cookie parser (reference ln 23)
const cookieParser = require('cookie-parser');

// ---------------------------IMPORT CONTROLLERS--------------------------------
const sessionController = require('./controllers/sessionController.js');
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const pokeController = require('./controllers/pokeController.js');

//-----------------------------START OF MIDDLEWARE------------------------------
// invoking express will give us access to our crud methods (get, post, patch, delete)
// creates an instance of the express application
const app = express();

// the server will be listening on port 3000
// once you start up the server, you can visit the app at localhost:3000
const PORT = 3000;

// here we will parse requests with:
// this will only parses json and will looks at request with Content-Type headers match type JSON, gives us access to req.body
app.use(express.json());

// parses incoming requests with urlencoded payloads
// when you submit a form on the webpage, the form's urlencoed body will be parsed and accessible on the request body
app.use(express.urlencoded({ extended: true }));
// when cookieParsere is invoked, it parses our cookies in our headers prop to be available in our request body; req.cookies
app.use(cookieParser());

/**
 * server static file from client folder
 * For this app, when load dashboard.html, we need to run the script dashboard.js in client folder => this is a static file => need to establish the static server.
 * This can be used also for serve other static files such as img, video.
 *  Best practice: have a folder for static files inside client, such as public => server static as (__dirname, '../client/public')
 */
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', sessionController.isLoggedIn, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dashboard.html'));
});

app.get(
  '/pokemon',
  sessionController.isLoggedIn,
  pokeController.getPokemon,
  (req, res) => { 
    // console.log('the pokemon at express ', res.locals.pokemon);
    res.status(200).send(res.locals.pokemon);
  }
);

app.post(
  '/pokemon',
  sessionController.isLoggedIn,
  pokeController.createPokemon,
  (req, res) => {
    // console.log('pokemon successfully created');
    res.sendStatus(200);
  }
);

app.patch(
  '/pokemon',
  sessionController.isLoggedIn,
  pokeController.updatePokemon,
  (req, res) => {
    // console.log('pokemon successfully updated');
    res.sendStatus(200).json(res.locals.pokemon);
  }
);

app.get('/login', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/login.html'));
});

app.post(
  '/login',
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    // console.log('heelo') michael mustve written this whats a heelo?
    res.redirect('/');
  }
);

app.get('/register', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/register.html'));
});

app.post(
  '/register',
  userController.createUser,
  sessionController.startSession,
  cookieController.setCookie,
  (req, res) => {
    res.redirect('/');
  }
);

app.use('*', (req, res) => res.status(400).json("we don't have this route"));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware handler',
    status: 400,
    message: 'an error occurerd',
  };

  const errorObj = Object.assign({}, defaultErr, err);

  // console.log('for developer: ', errorObj.log);

  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
