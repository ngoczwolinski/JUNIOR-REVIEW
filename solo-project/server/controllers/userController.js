const { User } = require('../database/model.js');
const bcrypt = require('bcrypt');

const userController = {};

userController.verifyUser = async (req, res, next) => {
    const { username, password } = req.body;
    console.log('req.body', req.body);
    
    if (!username || !password) return next({ log: 'No username or password in verifyUser in userController.js'});
    
    try{
        const userDoc = await User.findOne({username});
        if (!userDoc) res.redirect('/signup');
        else{
            const foundUser = await bcrypt.compare(password, userDoc.password);
            if (foundUser) {
                // store user object on res.locals
                res.locals.user = userDoc;
                console.log('passwords match!');
                return next();
            }
            else {
                console.log('passwords do not match.  You shall not pass.');
                res.redirect('/signup');
            }
        }

    }
    catch (error){
        return next('userController.verifyUser: ' + JSON.stringify(error));
    }
}

userController.createUser = async (req, res, next) => {
    // the route calling this is register, and the method POST
    // so the response will have the filled out form for registration
    console.log('req.body', req.body);
    const { username, password } = req.body;

    if (!username || !password) return next('No username or password in createUser in userController.js');
    try{
        const userDoc = await User.create({username,password})
        console.log("just created user with hashed password", userDoc);
        // we want to use user when making a cookie and session later
        res.locals.user = userDoc;
        return next();
    }
    catch(error){
        return next('Trouble with createUser in userController.js ' + JSON.stringify(error));
    }
}

module.exports = userController;