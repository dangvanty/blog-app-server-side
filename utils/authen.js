const createHttpError = require('http-errors');
const {User} =require('../models')
exports.checkAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) return res.redirect("/login");
    console.log(req.session);
    next();
  };


exports.authorizeRoles=(...role)=>{
    return  async (req,res,next)=>{
        const user= await User.findOne({where:{id: req.session.user_id}})
        const userdata = user.get({plain:true})
        if(!role.includes(userdata.role)){
           return res.render('404.handlebars')
        }
        next()
    }
}
    