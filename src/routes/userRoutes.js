const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/userController');
const  jwtMiddleware= require('../middlewares/jwtMiddleware');

//router.post('/', usercontroller.userCheck,usercontroller.createNewUser,usercontroller.selectDefaultPet,usercontroller.createDefaultPet,usercontroller.readUserByUsername); // Route to create user
router.get('/', usercontroller.readAllUser);// Route to get all users
router.get('/survey/points',jwtMiddleware.verifyToken,usercontroller.getPoints);
router.get('/singleUser',jwtMiddleware.verifyToken, usercontroller.readUserById); // Route to get specific user by id
router.put('/', jwtMiddleware.verifyToken,usercontroller.userCheckWithUserID,usercontroller.updateUserById); // Route to update username

module.exports = router;