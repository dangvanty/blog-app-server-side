const router = require('express').Router();
const {checkAuth, authorizeRoles} = require('../utils/authen')
const adminController = require('../controllers/adminController')

router.route('/').get(checkAuth,authorizeRoles("admin"),adminController.showListUsers)
router.route('/users/create').post(checkAuth,authorizeRoles("admin"),adminController.createUser)
router.route('/users/:id').delete(checkAuth,authorizeRoles("admin"),adminController.deleteUser)
router.route('/users/:id').get(checkAuth,authorizeRoles("admin"),adminController.editUser)
router.route('/users/:id').put(checkAuth,authorizeRoles("admin"),adminController.updateUser)

module.exports=router

