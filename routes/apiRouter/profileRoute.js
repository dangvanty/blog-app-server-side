const router = require('express').Router()
const profileController=require('../../controllers/profileController')
const {checkAuth} = require('../../utils/authen')

router.route('/').post(checkAuth,profileController.createProfile)
router.route('/').get(checkAuth,profileController.getProfileById)
router.route('/').put(checkAuth,profileController.updateProfileById)

module.exports=router