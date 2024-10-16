// REQUIRE MODULES
const express = require('express');
const userRoutes = require('./userRoutes');
const questionRoutes = require('./questionRoutes');
const ownedpetRoutes = require('./ownedpetRoutes');
const storeRoutes = require('./storeRoutes');
const questRoutes = require('./questRoutes');
const  bcryptMiddleware= require('../middlewares/bcryptMiddleware');
const  jwtMiddleware= require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController');
const reviewRoutes = require('./reviewRoutes');

// CREATE ROUTER
const router = express.Router();



// Routes for Login & Register
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register" ,userController.userCheck, bcryptMiddleware.hashPassword, userController.register,userController.selectDefaultPet,userController.createDefaultPet, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.use("/users", userRoutes);
router.use("/questions", questionRoutes);
router.use("/ownedpet",ownedpetRoutes)
router.use("/store",storeRoutes)
router.use("/quest",questRoutes)
router.use("/review", reviewRoutes);

// EXPORT ROUTER
module.exports=router;