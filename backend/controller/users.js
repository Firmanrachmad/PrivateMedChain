const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/Users");
const {generateToken} = require("../utils/generateToken");

const authUser = asyncWrapper(async (req, res) => {
    
    res.status(200).json({message: 'Auth User'});
});

const registerUser = asyncWrapper(async (req,res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

    // res.status(200).json({message: 'Register User'});
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
