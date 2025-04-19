const express= require('express');
const router= express.Router();
const {body}= require('express-validator');
const userController= require('../controller/user.controller');
const authMiddleware= require('../middleware/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullName.firstName').isLength({min: 3}).withMessage('It should be of length more than 3'),
    body('password').isLength({min:6}).withMessage('It should be greater than 6')
], 
userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('It should be greater than 6')
],
userController.loginUser);

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)
module.exports=router;