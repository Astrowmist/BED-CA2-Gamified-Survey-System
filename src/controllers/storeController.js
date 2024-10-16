const model = require("../models/storeModel.js");


// Select all store items
module.exports.readAllStoreItems = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllStoreItems:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}


// Select by owned_pet_id from the ownedpet table and store the owner_id to select the points from the user table in the next middleware
module.exports.selectOwnerId= (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectOwnerId:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Pet does not exist"
                });
            }
            else{
                res.locals.ownerId=results[0].owner_id
                next()
            }
        }
    }

    model.selectOwnerId(data, callback);
}


// Select the points of the user from the user table
module.exports.readUserPoints = (req, res, next) => {
    const data = {
        id: res.locals.userId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserPoints:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else{
                res.locals.points=results[0].points
                next()
            }
        }
    }

    model.selectByUserId(data, callback);
}


// Select the user's points and store it in res.locals.points
module.exports.readUserPointsForArmour = (req, res, next) => {
    const data = {
        id: res.locals.ownerId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserPointsForArmour:", error);
            res.status(500).json(error);
        } else {
                res.locals.points=results[0].points
                next()
        }
    }

    model.selectByUserId(data, callback);
}


// Check if the user has enough points to buy the chest
module.exports.commonCostCheck = (req, res, next) => {
    const data = {
        id:1
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error commonCostCheck:", error);
            res.status(500).json(error);
        } else {
            if(results[0].cost>res.locals.points){
                res.status(402).json({
                    message: "You do not have enough points to buy this item"
                });
            }
            else{
                res.locals.item=results[0]
                next()
            }
        }
    }

    model.selectByItemId(data, callback);
}


// Check if the user has enough points to buy the chest
module.exports.premiumCostCheck = (req, res, next) => {
    const data = {
        id:2
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error premiumCostCheck:", error);
            res.status(500).json(error);
        } else {
            if(results[0].cost>res.locals.points){
                res.status(402).json({
                    message: "You do not have enough points to buy this item"
                });
            }
            else{
                res.locals.item=results[0]
                next()
            }
        }
    }

    model.selectByItemId(data, callback);
}


// Check if the user has enough points to buy the chest
module.exports.ultimateCostCheck = (req, res, next) => {
    const data = {
        id:3
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error ultimateCostCheck:", error);
            res.status(500).json(error);
        } else {
            if(results[0].cost>res.locals.points){
                res.status(402).json({
                    message: "You do not have enough points to buy this item"
                });
            }
            else{
                res.locals.item=results[0]
                next()
            }
        }
    }

    model.selectByItemId(data, callback);
}


// Check if the user has enough points to buy the armour and if the armour id exist
module.exports.armourCostCheck = (req, res, next) => {
    if(req.params.item_id<4){
        res.status(400).json({
            message: "This is the wrong route to buy a chest"
        });
    }else{

    const data = {
        id : req.params.item_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error armourCostCheck:", error);
            res.status(500).json(error);
        } 
        else if (results.length == 0) {
            res.status(404).json({
                message: "Armour does not exist"
            });
        }else {
            if(results[0].cost>res.locals.points){
                res.status(402).json({
                    message: "You do not have enough points to buy this item"
                });
            }
            else{
                res.locals.item=results[0]
                next()
            }
        }
    }

    model.selectByItemId(data, callback);
}}


// Deduct the user points by the cost of the chest
module.exports.deductUserPoints = (req, res, next) => {
    var updatedPoints=res.locals.points-res.locals.item.cost
    const data = {
        id: res.locals.userId,
        points:updatedPoints
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deductUserPoints:", error);
            res.status(500).json(error);
        } else {
            next()
        }
    }

    model.updatePointsById(data, callback);
}


// Deduct the user points by the cost of the armour
module.exports.deductUserPointsArmour = (req, res, next) => {
    var updatedPoints=res.locals.points-res.locals.item.cost
    const data = {
        id: res.locals.ownerId,
        points:updatedPoints
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deductUserPoints:", error);
            res.status(500).json(error);
        } else {
            next()
        }
    }

    model.updatePointsById(data, callback);
}

//  Randomly select a pet by categories using Math.random() and store its stats in res.locals.chestItem
module.exports.openCommonChest = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else {
            res.locals.chestItem=results[0]
            next()
        }
    }

    const randomValue = Math.random();

    if(randomValue<0.75){  // 75% chance to get common pet
        model.selectRandomCommonPet(callback);
    }
    else model.selectRandomRarePet(callback); // 25% chance to get rare pet
}


//  Randomly select a pet by categories using Math.random() and store its stats in res.locals.chestItem
module.exports.openPremiumChest = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else {
            res.locals.chestItem=results[0]
            next()
        }
    }

    const randomValue = Math.random();

    if(randomValue<0.55){  // 55% chance to get common pet
        model.selectRandomCommonPet(callback); 
    }
    else if(randomValue<0.8){ // 25% chance to get rare pet
        model.selectRandomRarePet(callback);
    }
    else if(randomValue<0.95){  // 15% chance to get very rare pet
        model.selectRandomVeryRarePet(callback);
    }
    else model.selectRandomUniquePet(callback); // 5% chance to get unique pet
}


//  Randomly select a pet by categories using Math.random() and store its stats in res.locals.chestItem
module.exports.openUltimateChest = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        }
        else {
            res.locals.chestItem=results[0]
            next()
        }
    }

    const randomValue = Math.random();

    if(randomValue<0.55){  // 55% chance to get very rare pet
        model.selectRandomVeryRarePet(callback); 
    }
    else if(randomValue<0.8){  // 25% chance to get unique pet
        model.selectRandomUniquePet(callback);
    }
    else if(randomValue<0.95){   // 15% chance to get mythic pet
        model.selectRandomMythicPet(callback);  
    }
    else model.selectRandomGodPet(callback); // 5% chance to get god pet
}


// Insert the new pet into the ownedpet table
module.exports.addPet = (req, res, next) => {
    const data = {
        owner_id: res.locals.userId,
        pet_id: res.locals.chestItem.pet_id,
        pet_level:1,
        pet_hp:res.locals.chestItem.hp,
        pet_atk:res.locals.chestItem.atk,
        pet_def:res.locals.chestItem.def,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addPet:", error);
            res.status(500).json(error);
        } else {
            res.locals.insertId=results.insertId
            next();
        }
    }

    model.insertOwnedPet(data, callback);
}


// Adding the armour stats into the ownedpet table
module.exports.addArmour = (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id,
        armour_id:res.locals.item.item_id,
        armour_atk:res.locals.item.atk,
        armour_def:res.locals.item.def,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error addPet:", error);
            res.status(500).json(error);
        } else{
            next();
        }
    }

    model.updateArmour(data, callback);
}


// Return the new pet in the respose body
module.exports.selectNewPet= (req, res, next) => {
    const data = {
        owned_pet_id: res.locals.insertId
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectPetById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                message:`You just got a ${results[0].category} pet !!!`,
                'Pet_Stats': results[0]
            });
        }
    }

    model.selectByOwnedPetId(data, callback);
}


// Return the pet with new armour in the respose body
module.exports.selectPetWithNewArmour= (req, res, next) => {
    const data = {
        owned_pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectPetById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                message:`Congratulations! ${results[0].pet_name} just got equipped with the awesome ${results[0].armour_name}! Ready to take on the world in style and strength!`
            });
        }
    }

    model.selectByOwnedPetId(data, callback);
}