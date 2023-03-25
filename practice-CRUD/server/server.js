const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const sessionController = require('./controllers/sessionController.js');
const userController = require('./controllers/userController.js');
const cookieController = require('./controllers/cookieController.js');
const pokeController = require('./controllers/pokeController.js');
// const apiRouter = require('./api.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', sessionController.isLoggedIn, (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/dashboard.html'));
});

app.get('/pokemon', sessionController.isLoggedIn, pokeController.getPokemon , (req, res) => {
    console.log('the pokemon at express ', res.locals.pokemon);
    res.status(200).send(res.locals.pokemon);
})

app.post('/pokemon', sessionController.isLoggedIn, pokeController.createPokemon, (req, res) => {
    console.log('pokemon successfully created');
    res.sendStatus(200);
})

app.patch('/pokemon', sessionController.isLoggedIn, pokeController.updatePokemon, (req, res) => {
    console.log('pokemon successfully updated');
    res.sendStatus(200).json(res.locals.pokemon);
})

app.get('/login', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/login.html'));
});

app.post('/login', userController.verifyUser,
                   sessionController.startSession,
                   cookieController.setCookie, 
  (req, res) => {
    res.redirect('/');
})

app.get('/register', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/register.html'));
});

app.post('/register', userController.createUser, 
                      sessionController.startSession,
                      cookieController.setCookie,
                      (req, res) => { 
                      res.redirect('/');
});

app.use('*', (req, res) => res.status(400).json("we don't have this route"));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware handler',
        status: 400,
        message: 'an error occurerd'
    };

    const errorObj = Object.assign({}, defaultErr, err);

    console.log('for developer: ', errorObj.log);

    return res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
