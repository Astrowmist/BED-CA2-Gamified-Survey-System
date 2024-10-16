const express = require('express');
const router = express.Router();
const storecontroller = require('../controllers/storeController');
const  jwtMiddleware= require('../middlewares/jwtMiddleware');

router.get('/',storecontroller.readAllStoreItems); // Route to get all store items
router.post('/buy/commonchest', jwtMiddleware.verifyToken, storecontroller.readUserPoints,storecontroller.commonCostCheck,storecontroller.deductUserPoints,storecontroller.openCommonChest,storecontroller.addPet,storecontroller.selectNewPet); // Route to open common chest
router.post('/buy/premiumchest', jwtMiddleware.verifyToken, storecontroller.readUserPoints,storecontroller.premiumCostCheck,storecontroller.deductUserPoints,storecontroller.openPremiumChest,storecontroller.addPet,storecontroller.selectNewPet); // Route to open premium chest
router.post('/buy/ultimatechest', jwtMiddleware.verifyToken, storecontroller.readUserPoints,storecontroller.ultimateCostCheck,storecontroller.deductUserPoints,storecontroller.openUltimateChest,storecontroller.addPet,storecontroller.selectNewPet); // Route to open ultimate chest
router.put('/:owned_pet_id/buy/:item_id', jwtMiddleware.verifyToken, storecontroller.selectOwnerId,storecontroller.readUserPointsForArmour, storecontroller.armourCostCheck,storecontroller.deductUserPointsArmour,storecontroller.addArmour,storecontroller.selectPetWithNewArmour) // Route to buy armour
module.exports = router;