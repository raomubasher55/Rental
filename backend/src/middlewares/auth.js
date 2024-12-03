const jwt = require('jsonwebtoken');
const User = require('../models/User')


const isLogined = async(req , res ,next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization'];
    if(!token){
        return res.status(403).json({
            success: false,
            message: 'A Token is required for authorization'
        })
    }

    try {
            const bearer = token.split(" ");
            const bearerToken = bearer[1];


            const decodedData = jwt.verify(bearerToken , process.env.ACCESS_SECRET_TOKEN);
            req.user = decodedData;
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Please Again Login'
        })
    }

    return next();
};


const isAdmin = async(req, res, next) => {
    const admin = await User.findById(req.user.user._id);    
    if (req.user && admin.role == 1) {
        return next();
    } else {
        return res.status(403).json({
            success: false,
            message: 'Access Denied: Admins only'
        }); 
    }
};
module.exports = {isLogined ,isAdmin };