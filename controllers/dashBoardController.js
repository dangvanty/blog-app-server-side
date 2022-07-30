const {Post,Profile,User,Comment} = require('../models')

// Dashboard
const getDashboard = async ()=>{
    try {
        const userData = await User.findByPk(req.session.user_id,{
            attributes:{exclude:["password",]},
            include:[{model:Post},{model:Profile}]
        })

        const user=userData.get({plain:true})
        res.render("dashboard", { ...user, logged_in: true });
    } catch (error) {
        res.status(500).json(error);
    }
}

//New post: 

const getCreateNewPost = async(req,res)=>{
    try {
        res.render("post-manage",{
            newPost: true,
            logged_in: req.session.logged_in,
        })
    } catch (error) {
        res.status(500).json(error);
    }
} 

const getEditPost = async (req,res)=>{
    try {
        res.render('post-manage',{
           newPost:false,
           logged_in: req.session.logged_in
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports= {getEditPost,getCreateNewPost,getDashboard}