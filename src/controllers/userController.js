const model = require("../models/userModel.js");

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////
module.exports.login = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).json({message:"Error: username/password is/are undefined"});
        return;
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else{ 
                res.locals.hash=results[0].password
                res.locals.userId=results[0].user_id
                next();
            }
        }
    }

    model.getUserIdAndPassword(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////
module.exports.register = (req, res, next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).json({message: "username/password is/are undefined"});
        return;
    }

    const data = {
        username: req.body.username,
        password: res.locals.hash,
        points: 0
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            res.locals.userId=results.insertId
            res.locals.message=`User ${req.body.username} created successfully.`
            next()
        }
    }

    model.insertUser(data, callback);
}


//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME EXISTS
//////////////////////////////////////////////////////

module.exports.userCheck = (req, res, next) => {
    if (req.body.username == undefined) {
        res.status(400).json({message: "Username is undefined"});
        return;
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error userCheck:", error);
            res.status(500).json(error);
        } else {
            if (results.length != 0) {
                res.status(409).json({
                    message: "Username is already associated with another user. Choose another username"
                });
            }
            else next();
        }
    }

    model.selectByUsername(data, callback);
}

//  Select a default pet for the user
module.exports.selectDefaultPet = (req, res, next) => {
    randomPet= Math.floor(Math.random() * 2);
    var data;
    if(randomPet==0){
        data = {
            pet_name:'Cat'
        }
    }else{
        data = {
            pet_name:'Dog'
        }
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectDefaultPet:", error);
            res.status(500).json(error);
        } else {
            res.locals.pet=results[0]
            next();
        }
    }

    model.selectByPetName(data, callback);
}


//  Create a default pet for the user
module.exports.createDefaultPet = (req, res, next) => {
    const data = {
        owner_id: res.locals.userId,
        pet_id: res.locals.pet.pet_id,
        pet_level:1,
        pet_hp:res.locals.pet.hp,
        pet_atk:res.locals.pet.atk,
        pet_def:res.locals.pet.def,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createDefaultPet:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }

    model.insertOwnedPet(data, callback);
}


// Return the details of the newly created user
module.exports.readUserByUsername = (req, res, next) => {
    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByUsername:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results[0]);
        }
    }

    model.selectByUsername(data, callback);
}

module.exports.readAllUser = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}


module.exports.getPoints = (req, res, next) => {
    const data = {
        userId: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserByUsername:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }

    model.selectByUserId(data, callback);
}

module.exports.readUserById = (req, res, next) => {
    const data = {
        user_id: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results[0].user_id == null) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectUserWithUserId(data, callback);
}


module.exports.userCheckWithUserID = (req, res, next) => {
    if (req.body.username == undefined) {
        res.status(400).json({Error: "username is undefined"});
        return;
    }

    const data = {
        user_id:res.locals.userId,
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error userCheck:", error);
            res.status(500).json(error);
        } else {
            if (results.length != 0) {
                res.status(409).json({
                    message: "username is already associated with another user"
                });
            }
            else next();
        }
    }

    model.selectByUsernameAndUserId(data, callback);
}


module.exports.updateUserById = (req, res, next) => {
    const data = {
        user_id: res.locals.userId,
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else{
                res.status(200).json({
                    message:"Successfully Updated"
                });
            }
        }
    }

    model.updateById(data, callback);
}

// module.exports.readUserByUsername200 = (req, res, next) => {
//     const data = {
//         username: req.body.username
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error readUserByUsername200:", error);
//             res.status(500).json(error);
//         } else {
//             res.status(200).json(results[0]);
//         }
//     }

//     model.selectByUsername(data, callback);
// }