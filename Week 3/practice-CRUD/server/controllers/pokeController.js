const { Pokemon } = require('../db.js');
const { User } = require('../db.js');

const pokeController = {};

pokeController.updatePokemon = (req, res, next) => {
    const { sessionID } = req.cookies;
    const { pastName, newName } = req.body;

    Pokemon.findOneAndUpdate(
        { name: pastName, user_id: sessionID },
        { $set: {name : newName}},
        {new : true},
        (error, updatedPokemon) => {
            if (error) {
                return next("updatedPokemon failed: ", error);
            }
            if (updatedPokemon === null) {
                res.status(400).send('this pokemon does not exist and cannot be updated');
            } 
            res.locals.pokemon = updatedPokemon;
            return next();
        }
    )
}

pokeController.createPokemon = (req, res, next) => {
    const { sessionID } = req.cookies;
    const {name, sprite} = req.body;

    Pokemon.create(
        { name: name, sprite: sprite, user_id: sessionID },
        (error, pokemon) => {
            if (error) {
                return next('Trouble creating pokemon in userController.js ' + JSON.stringify(error));
            } else {
                // console.log("just created pokemon ", pokemon);
                res.locals.pokemon = pokemon;
                return next();
            }
        }
    )
}

pokeController.getPokemon = (req, res, next) => {
    // since user must be logged in, we just need to look at the cookie, which will have the user id
    // remember sessionID and userID are the same
    const { sessionID } = req.cookies;

    // console.log('inside getPokemon');

    User.findOne( 
        { _id : sessionID },
        (error, user) => {

            // console.log('inside user find one');
            if (error) {
                return next('pokeController.getPokemon: ' + JSON.stringify(error));
            }
            else if (!user) {
                // console.log('if user does not exist, we cannot get its pokemon');
                res.redirect('/login');
            }
            else {
                Pokemon.find(
                    {user_id: user._id},
                    function(error, result) {
                        if (error) {
                            return next('pokeController.getPokemon: ' + JSON.stringify(error));
                        }
                        res.locals.pokemon = result;
                        return next();
                    }
                )
            }     
        }
    )

    // var threadObject = await db
    //     .collection("threads")
    //     .findOne({ tabs: { $in: [ObjectId("5f2ad2ed59645244cc6a837a")] } });

    // var user = await db
    //     .collection("users")
    //     .findOne({ threads: threadObject._id });

    // threadObject.user_name = user.name;


}

module.exports = pokeController;