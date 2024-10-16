const express = require('express');
const router = express.Router();
const ownedpetcontroller = require('../controllers/ownedpetController.js');
const  jwtMiddleware= require('../middlewares/jwtMiddleware');

router.get('/', ownedpetcontroller.selectAllOwnedPets)
router.get('/userownedpets', jwtMiddleware.verifyToken,ownedpetcontroller.selectAllOwnedPetsWithOwnerId); // Route to get all pets owned by user
router.get('/:owned_pet_id/pet',ownedpetcontroller.selectOwnedPetsById); // Route to get specific pets
router.put('/:owned_pet_id/feed', jwtMiddleware.verifyToken,ownedpetcontroller.checkLastFed,ownedpetcontroller.feedPet); // Route to feed a specific pet
router.put('/:owned_pet_id/shower', jwtMiddleware.verifyToken,ownedpetcontroller.checkLastShowered,ownedpetcontroller.showerPet); // Route to shower a specific pet
router.put('/:owned_pet_id/play', jwtMiddleware.verifyToken,ownedpetcontroller.checkLastTimeSpent,ownedpetcontroller.playWithPet); // Route to play with a specific pet
// Route to breed pets
// router.post('/:pet_id_1/breed/:pet_id_2', ownedpetcontroller.readPet1,ownedpetcontroller.readPet2,ownedpetcontroller.checkLastBred,ownedpetcontroller.breed,ownedpetcontroller.addBredPet,ownedpetcontroller.updateLastBred,ownedpetcontroller.selectNewlyBredPet);

module.exports = router;