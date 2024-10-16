const model = require("../models/ownedpetModel.js");


// Select all owned pets by user
module.exports.selectAllOwnedPets = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectAllOwnedPets:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// Select all owned pets by user
module.exports.selectAllOwnedPetsWithOwnerId= (req, res, next) => {
    const data = {
        id: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectPetById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else {
                var currentTime=new Date();
                for(var i = 0 ; i < results.length ; i++){
                var lastfed=new Date(results[i].last_fed)
                var lastshowered=new Date(results[i].last_showered)
                var lastplayed=new Date(results[i].last_time_spent)

                const diffFed = (currentTime - lastfed) / 1000 / 60 / 60;
                const diffShower = (currentTime - lastshowered) / 1000 / 60 / 60;
                const diffPlayed = (currentTime - lastplayed) / 1000 / 60 / 60;

                if (diffFed <= 1) {
                    results[i].last_fed="Full"
                }else{
                    results[i].last_fed="Hungry"
                }

                if (diffShower <= 1.5) {
                    results[i].last_showered="Clean"
                }else{
                    results[i].last_showered="Dirty"
                }

                if (diffPlayed <= 1) {
                    results[i].last_time_spent="Happy"
                }else{
                    results[i].last_time_spent="Upset"
                }
            }
                res.status(200).json(results);
            }
        }
    }

    model.selectByOwnerId(data, callback);
}

// Select owned pets by id
module.exports.selectOwnedPetsById= (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectPetById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet does not exist"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectByOwnedPetId(data, callback);
}

// Check if Feeding cooldown is over
module.exports.checkLastFed = (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkLastFed:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet does not exist"
                });
            }
            else{ 
                var lastfed=new Date(results[0].last_fed)
                var currentTime=new Date();
                const diffHours = (currentTime - lastfed) / 1000 / 60 / 60;

                if (diffHours <= 1) {
                    res.status(409).json({
                        message: "Pet is not hungry"
                    });
                }else{
                    next()
                }
                
            }
        }
    }

    model.selectByOwnedPetId(data, callback);
}


// Feed the pet by replacing the timestamp with current timestamp
module.exports.feedPet = (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error feedPet:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({message: "Yum! Your pet just had a delicious meal and is feeling full and happy."});
        }
    }

    model.updateLastFed(data, callback);
}


// Check if showering cooldown is over
module.exports.checkLastShowered = (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkLastShowered:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet does not exist"
                });
            }
            else{ 
                var lastShowered=new Date(results[0].last_showered)
                var currentTime=new Date();
                const diffHours = (currentTime - lastShowered) / 1000 / 60 / 60;
                
                if (diffHours <= 1.5) {
                    res.status(409).json({
                        message: "Pet is not dirty"
                    });
                }else{
                    next()
                }
                
            }
        }
    }

    model.selectByOwnedPetId(data, callback);
}


// Shower the pet by replacing the timestamp with current timestamp
module.exports.showerPet = (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error showerPet:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({message: "Splish splash! Your pet just had a refreshing shower and smells fantastic."});
        }
    }

    model.updateLastShowered(data, callback);
}


// Check if playing cooldown is over
module.exports.checkLastTimeSpent = (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkLastTimeSpent:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet does not exist"
                });
            }
            else{ 
                var lastShowered=new Date(results[0].last_time_spent)
                var currentTime=new Date();
                const diffHours = (currentTime - lastShowered) / 1000 / 60 / 60;
                
                if (diffHours <= 1) {
                    res.status(409).json({
                        message: 'Your pet says "I do not have time for silly games. Its time to Embark on Quests!"'
                    });
                }else{
                    next()
                }
                
            }
        }
    }

    model.selectByOwnedPetId(data, callback);
}


// Play with the pet by replacing the timestamp with current timestamp
module.exports.playWithPet = (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error playWithPet:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({message: "Woohoo! Your pet just had an epic playtime session"});
        }
    }

    model.updateLastTimeSpent(data, callback);
}


// Read the first pet's type and category
module.exports.readPet1= (req, res, next) => {
    if(req.params.pet_id_1 == req.params.pet_id_2){
        res.status(403).json({
            message: `You silly, you cannot breed your pet with itself !`
        });
    }else{
    const data = {
        owned_pet_id: req.params.pet_id_1
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectPet1:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `Pet with id ${req.params.pet_id_1} does not exist`
                });
            }
            else {
                res.locals.pet1=results[0]
                next()
            }
        }
    }

    model.selectByOwnedPetId(data, callback);
}}


// Read the second pet's type and category
module.exports.readPet2= (req, res, next) => {
    const data = {
        owned_pet_id: req.params.pet_id_2
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectPet2:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `Pet with id ${req.params.pet_id_2} does not exist`
                });
            }
            else if(res.locals.pet1.owner_id != results[0].owner_id){
                res.status(403).json({
                    message: `You cannot breed your pet with another user's pet !`
                });
            }
            else {
                res.locals.pet2=results[0]
                next()
            }
        }
    }

    model.selectByOwnedPetId(data, callback);
}


// Check if breeding cooldown is over
module.exports.checkLastBred = (req, res, next) => {
    const data = {
        id:  res.locals.pet2.owner_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checkLastBred:", error);
            res.status(500).json(error);
        } else {
                var lastBred=new Date(results[0].last_bred)
                var currentTime=new Date();
                const diffHours = (currentTime - lastBred) / 1000 / 60 / 60;
                
                if (diffHours <= 24) {
                    res.status(403).json({
                        message: "Your pet says, 'I'm not in the mood for matchmaking right now! Try again later.' You can only breed once a day"
                    });
                }else{
                    res.locals.username=results[0].username
                    next()
                }
        }
    }

    model.selectUser(data, callback);
}


// Breed the pet by randomly selecting a new pet with similar category and type
module.exports.breed = (req, res, next) => {
    const data = {
        category1: res.locals.pet1.category,
        category2: res.locals.pet2.category,
        type1_1:res.locals.pet1.type1,
        type1_2:res.locals.pet1.type2,
        type1_3:res.locals.pet1.type3,
        type2_1:res.locals.pet2.type1,
        type2_2:res.locals.pet2.type2,
        type2_3:res.locals.pet2.type3,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error breed:", error);
            res.status(500).json(error);
        } else {
            res.locals.child=results[0]
            next()
        }
    }

    model.breed(data, callback);
}

// Insert the new pet into the ownedpet table
module.exports.addBredPet = (req, res, next) => {
    const data = {
        owner_id: res.locals.pet2.owner_id,
        pet_id: res.locals.child.pet_id,
        pet_level:1,
        pet_hp:res.locals.child.hp,
        pet_atk:res.locals.child.atk,
        pet_def:res.locals.child.def,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addBredPet:", error);
            res.status(500).json(error);
        } else {
            res.locals.insertId=results.insertId
            next();
        }
    }

    model.insertOwnedPet(data, callback);
}


// Reset the breeding cooldown
module.exports.updateLastBred = (req, res, next) => {
    const data = {
        id:  res.locals.pet2.owner_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error setLastBred:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }

    model.updateLastBred(data, callback);
}


// Select the newly inserted pet for the response body
module.exports.selectNewlyBredPet= (req, res, next) => {
    const data = {
        owned_pet_id: res.locals.insertId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectPetById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                message:`Congratulations ${res.locals.username}! Your pets ${res.locals.pet1.pet_name} and ${res.locals.pet2.pet_name} have created a cute new companion for you!`,
                'New Pet Stats': results[0]
            });
        }
    }

    model.selectByOwnedPetId(data, callback);
}