const router = require('express').Router();
const {checkAuth} =require('../utils/authen')
const dashboardController= require('../controllers/dashBoardController')

router.route('/').get(checkAuth, dashboardController.getDashboard)
router.route('/new-post').get(checkAuth, dashboardController.getCreateNewPost)
router.route('/edit-post/:id').get(checkAuth, dashboardController.getEditPost)

module.exports=router