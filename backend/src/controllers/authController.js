
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const randomString = require('randomstring');
const Company = require('../models/Company');


//siginup user
const  signupUser = async (req, res) => {
    try {

        //Express  validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }

        const { name, email, password, mobile } = req.body;
        const isExistUser = await userModel.findOne({ email });
        if (isExistUser) {
            return res.status(200).json({
                success: false,
                msg: "Email already registered"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            name,
            email,
            password: hashPassword,
            mobile,
        });
        const userData = await user.save();


        return res.status(200).json({
            success: true,
            msg: "Your Account is created is successfuly",
            data: userData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

const gernateAccessToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "30d" });
    return token;
}

const gernateRefreshToken = async (user) => {
    const token = jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "3d" });
    return token;
}

//loin user
const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            })
        }

        const { password, email } = req.body;
        const userData = await userModel.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password or Email"
            });
        }

        const isMatchPassword = await bcrypt.compare(password, userData.password);
        if (!isMatchPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password or Email"
            });
        }
        if (userData.isVerified == 0) {
            return res.status(401).json({
                success: false,
                message: "Please verify your account"
            })
        }
        const accessToken = await gernateAccessToken({ user: userData });
        const refreshToken = await gernateRefreshToken({ user: userData });

        return res.status(200).json({
            success: true,
            message: "You logined successfully",
            user: userData,
            accessToken: accessToken,
            refreshToken: refreshToken,
            tokenType: "Bearer"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

//Profile
const userProfile = async (req, res) => {
    try {
        const userId = req.user.user._id
        const user = await userModel.findOne({_id : userId})
        .populate('rentals')
        .populate('operator')
        .populate('inspection')
        .populate('consultation');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User Profile  Data",
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}


const refreshToken = async (req, res) => {
    try {
        //User is saved in Logined middlewire so ,
        const user_id = req.user.user._id;

        const userData = await userModel.findOne({ _id: user_id });
        const accessToken = await gernateAccessToken({ user: userData });
        const refreshToken = await gernateRefreshToken({ user: userData });

        return res.status(200).json({
            success: true,
            message: "Token Refreshed",
            userData: userData,
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//logout 
const logout = async (req, res) => {
    try {
        const token = req.body.token || req.query.token || req.headers['authorization'];
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token not provided"
            });
        }

        const bearer = token.split(" ");
        const bearerToken = bearer[1];

        res.setHeader('Clear-Site-Data', ' "cookies" , "storage"');
        return res.status(200).json({
            success: true,
            message: "You are logged out"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


//All User
const getAllUser = async(req, res)=>{
    const allUser = await userModel.find({});
    return res.status(200).json({
        success: true,
        message: "All User",
        allUser: allUser
        });
}

//All company 
const getAllCompanies = async(req , res)=>{
    const allCompany = await Company.find({});
    return res.status(200).json({
        success: true,
        message: "All Company",
        allCompany: allCompany
        });
}

module.exports = {
    signupUser,
    loginUser,
    userProfile,
    refreshToken,
    logout,
    getAllUser,
    getAllCompanies,
}