// isLoggedCompany.js
const User = require('../models/User');
const Company = require('../models/Company');
const jwt = require("jsonwebtoken");

const isLoggedCompany = async (req, res, next) => {
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


            const decodedData = jwt.verify(bearerToken , process.env.COMPANY_ACCESS_SECRET_TOKEN);
            req.company = decodedData;
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }

    return next();
};

module.exports = {
    isLoggedCompany,
};
