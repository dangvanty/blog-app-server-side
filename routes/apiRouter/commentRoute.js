const router=require('express').Router();
const {checkAuth}=require('../../utils/authen')

const commentController=require('../../controllers/commentController');

router.route('/').post(checkAuth,commentController.createComment)

module.exports=router