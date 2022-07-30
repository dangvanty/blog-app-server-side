const {User} =require('../models')

//signup new user 

const signupUser= async (req,res)=>{
    try {
        const userData= await User.create(req.body);
        req.session.save(()=>{
            req.session.user_id=userData.id;
            req.session.logged_in=true;
            res.status(200).json(userData)
        })
    } catch (error) {
        res.status(400).json(error);
    }
}

//login user
const loginUser= async(req,res)=>{
    try {
        const userData= await User.findOne({
            where:{username:req.body.username}
        })
        if(!userData){
            res.status(400).json({
                message:"Incorrect username or password, please try again"
            })
            return
        }

        const validatePassword = await userData.checkPassword(req.body.password)
        if(!validatePassword){
            res.status(400).json({
                message:"Incorrect username or password, please try again"
            })
            return
        }

        req.session.save(()=>{
            req.session.user_id=userData.id;
            req.session.logged_in=true
            
            res.json({
                user:userData,
                message:"You are now logged in!"
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

const logoutUser=(req,res)=>{
    req.session.destroy(()=>{
        res.status(204).end();
    })
}

module.exports={signupUser,loginUser,logoutUser}