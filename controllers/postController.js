const {Post} =require('../models')

const createPost= async (req,res)=>{
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id:req.session.user_id
        })

        res.status(200).json(newPost);

    } catch (error) {
        res.status(400).json(error)
    }
}

const getPostById = async(req,res)=>{
    try {
        const postData= await Post.findByPk(req.params.id);
        const post = postData.get({plain:true})

        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error)
    }
}

//update post 

const updatePostById = async(req,res)=>{
    try {
        const postData=await Post.update(req.body,{
            where:{id:req.params.id}
        })
        if(!postData[0]){
            res.status(404).json({
                message:'Post does not exist to update'
            })
            return;
        }
        res.status(200).json(postData)
    } catch (error) {
        res.status(400).json(error)
    }
}

//delete post 
const deletePostById=async(req,res)=>{
    try {
        const postData=await Post.destroy({
            where:{id:req.params.id},
        })
        if (!postData) {
            res.status(404).json({ message: `Post does not exist to delete` });
            return;
          }
          res.status(200).json(postData);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports={getPostById,createPost,deletePostById,updatePostById}