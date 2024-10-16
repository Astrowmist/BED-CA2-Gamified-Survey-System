const express = require('express');
const router = express.Router();
const questcontroller = require('../controllers/questController');
const  jwtMiddleware= require('../middlewares/jwtMiddleware');


router.get('/', questcontroller.readAllQuests); // Route to get all quests
router.get('/:quest_id', questcontroller.readQuestById); // Route to get specific quests by quest_id
// Route to complete quest
router.put('/:quest_id/pet/:owned_pet_id', jwtMiddleware.verifyToken,questcontroller.checkLastFed,questcontroller.checkLastShowered,questcontroller.checkLastShowered,questcontroller.questCheck,questcontroller.readQuestStats,questcontroller.readPetStatsAndBattle,questcontroller.levelUp,questcontroller.addCompletedQuest,questcontroller.showNewPetStats)
module.exports = router;