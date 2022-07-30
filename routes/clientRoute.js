const router = require('express').Router()
const clientRoutes= require('../controllers/clientController')

router.route('/').get(clientRoutes.homePage)
router.route('/post/:id').get(clientRoutes.getSinglePost)
router.route('/login').get(clientRoutes.getLogin)
router.route('/signup').get(clientRoutes.getSignUp)

module.exports=router