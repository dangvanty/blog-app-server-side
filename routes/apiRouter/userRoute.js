const router=require('express').Router();

const userController=require('../../controllers/userController');

router.route('/signup').post(userController.signupUser)
router.route('/login').post(userController.loginUser)
router.route('/logout').post(userController.logoutUser)

module.exports=router