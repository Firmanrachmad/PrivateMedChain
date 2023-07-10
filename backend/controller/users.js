const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/Users");

const authUser = asyncWrapper(async (req, res) => {
    
    res.status(200).json({message: 'Auth User'});
});

const registerUser = asyncWrapper(async (req,res) => {
    const { name, email, password } = req.body;
    res.status(200).json({message: 'Register User'});
});

const logoutUser = asyncWrapper(async(req, res) => {
    res.status(200).json({message: 'Logout User'});
});

const getUserProfile = asyncWrapper(async(req, res) => {
    res.status(200).json({message: 'Get User Profiel'});
});

const updateUserProfile = asyncWrapper(async(req, res) => {
    res.status(200).json({message: 'Update User'});
});

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};
