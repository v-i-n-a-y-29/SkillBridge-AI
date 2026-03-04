const jwt = require("jsonwebtoken")


/** 
 * @name authUser
 * @description Middleware for authenticating a user , it will check if the token is provided in the request cookies and if the token is valid then it will decode the token and attach the user details to the request object and call the next middleware
 * @access Private
 */

function authUser(req, res, next) {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }
    
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY)
        req.user=decoded
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"token invalid"
        })
    }
}

module.exports = {authUser}