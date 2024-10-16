const model = require("../models/questModel.js");


// Select all quests
module.exports.readAllQuests = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllQuest:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}


// Select quest by id
module.exports.readQuestById = (req, res, next) => {
    const data = {
        id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Quest not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectQuestById(data, callback);
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

                if (diffHours > 1) {
                    res.status(403).json({
                        message: "Pet is hungry"
                    });
                }else next()
            }
        }
    }

    model.selectByOwnedPetId(data, callback);
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
                
                if (diffHours > 1.5) {
                    res.status(409).json({
                        message: "Pet is dirty"
                    });
                }
                else next()
            }
        }
    }

    model.selectByOwnedPetId(data, callback);
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
                
                if (diffHours > 1) {
                    res.status(409).json({
                        message: 'Your pet is upset :( .Spend more time with it'
                    });
                }
                else next()
                
            }
        }
    }

    model.selectByOwnedPetId(data, callback);
}

// Check if the pet has completed the quest
module.exports.questCheck = (req, res, next) => {

    const data = {
        quest_id: req.params.quest_id,
        pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error questCheck:", error);
            res.status(500).json(error);
        } else {
            if (results.length != 0) {
                res.status(409).json({
                    message: "This pet has already completed this quest. Choose another pet or another quest"
                });
            }
            else next();
        }
    }

    model.selectCompletedQuest(data, callback);
}


// Select the quest's boss stats
module.exports.readQuestStats = (req, res, next) => {
    const data = {
        id: req.params.quest_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readQuestById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Quest not found"
                });
            }
            else {
                res.locals.quest = results[0];
                next();
            }
        }
    }

    model.selectQuestById(data, callback);
}


// Select the pet stats and compute the pet stats and the boss stats to get the winner
module.exports.readPetStatsAndBattle = (req, res, next) => {
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
            else {
                var bossHp = res.locals.quest.boss_hp;
                var petHp = results[0].pet_hp
                while (bossHp >= 0 && petHp >= 0) {
                    bossHp -= (results[0].pet_atk + results[0].armour_atk) / (res.locals.quest.boss_def + 100 / 100)
                    if (bossHp <= 0)
                        break
                    petHp -= res.locals.quest.boss_atk / ((results[0].pet_def + results[0].armour_def) + 100 / 100)
                }

                if (bossHp <= 0)
                    next()
                else
                    res.status(200).json({message: `Oh no! ${results[0].pet_name} gave it their all but couldn't complete the quest this time. Mission Failed, We'll get'em next time` });
            }
        }
    }

    model.selectByOwnedPetId(data, callback);
}


// If pet wins, level it up by 1 level and increase the stats by 5
module.exports.levelUp = (req, res, next) => {
    const data = {
        id: req.params.owned_pet_id,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error levelUp:", error);
            res.status(500).json(error);
        } else next();
    }

    model.updatePetStats(data, callback);
}


// Add the pet id and quest id to the completedquest table to ensure that the pet does not redo the quest again
module.exports.addCompletedQuest = (req, res, next) => {
    const data = {
        quest_id: req.params.quest_id,
        pet_id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error insertCompletedQuest:", error);
            res.status(500).json(error);
        } else {
            next()
        }
    }

    model.insertCompletedQuest(data, callback);
}


// Select the pet to show its leveled up stats
module.exports.showNewPetStats= (req, res, next) => {
    const data = {
        id: req.params.owned_pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error showNewPetStats:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                message:`Congratulations! ${results[0].pet_name} triumphed in the quest ${res.locals.quest.quest_name} and came back victorious!`,
                Pet_Stats: results[0]
            });
        }
    }

    model.selectPetStats(data, callback);
}