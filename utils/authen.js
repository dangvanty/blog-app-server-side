const ErrorHandler= require('../utils/erorrHandle')
exports.checkAuth = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) return res.redirect("/login");
  
    next();
  };


exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `Vai trò: ${req.user.role} thì không thể truy cập vào được`,403
                ))
        }
        next();
    }
}
    