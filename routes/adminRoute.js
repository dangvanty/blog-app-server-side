const router = require('express').Router();
const {checkAuth, authorizeRoles} = require('../utils/authen')
const adminController = require('../controllers/adminController')

router.route('/').get(checkAuth,authorizeRoles("admin"),adminController.showListUsers)

module.exports=router

