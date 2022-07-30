const {Comment} = require('../models');

//create new comment :
const createComment= async (req,res)=>{
    try {
        const newComment= await Comment.create({...req.body,
            user_id:req.session.user_id
        })
        res.status(200).json(newComment)
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports={createComment}
