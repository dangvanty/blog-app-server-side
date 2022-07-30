const {Post,Profile,User,Comment} = require('../models')

//homepage:

const homePage= async(req,res)=>{
    try {
        const postData=await Post.findAll({
            include:[{model:User, attributes:["username"]},]
        })
        const posts = postData.map((post)=>post.get({
            plain:true
        }))

        res.render("homepage",{posts,logged_in:req.session.logged_in});
    } catch (error) {
        res.status(500).json(error);
    }
}

// Get single post with comments

const getSinglePost = async(req,res)=>{
    try {
        const postData = await Post.findByPk(req.params.id,{
            include:[
                { model: User, attributes: ["username"],
            include:[{model: Profile}] },
                {
                model: Comment,
                include: [{ model: User, attributes: ["username"] }],
                },
                
            ]
        })
        const post = postData.get({ plain: true });

        res.render("post", { ...post, logged_in: req.session.logged_in });
        // res.json({ ...post, logged_in: req.session.logged_in }); // TESTING
    } catch (error) {
        res.status(500).json(error);
    }
}

// login 

const getLogin = (req,res)=>{
    if(req.session.logged_in){
        res.redirect('/')
        return;
    }
    res.render('login');
}

const getSignUp =(req,res)=>{
    res.render('signup')
}

module.exports={getSignUp, getLogin, getSinglePost, homePage}
