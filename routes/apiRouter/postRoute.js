const router = require('express').Router()
const postController=require('../../controllers/postController')
const {checkAuth} = require('../../utils/authen')

router.route('/').post(checkAuth,postController.createPost)
router.route('/:id').get(checkAuth,postController.getPostById)
router.route('/:id').put(checkAuth,postController.updatePostById)
router.route('/:id').delete(checkAuth,postController.deletePostById)

module.exports=router