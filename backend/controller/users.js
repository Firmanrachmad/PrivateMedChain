const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/Users");
const { generateToken } = require("../utils/generateToken");

const authUser = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles
        });
    } else {
        res.status(400);
        throw new Error('Invalid email or password');
    }

});

const registerUser = asyncWrapper(async (req,res) => {
    const { name, email, password, roles } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        roles
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            roles: user.roles
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const logoutUser = asyncWrapper(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'User logged out'});
});

const getUserProfile = asyncWrapper(async(req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        roles: req.user.roles
    }
    res.status(200).json({ user });
});

const updateUserProfile = asyncWrapper(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.status(200).json({ 
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email
         });
    } else { 
        res.status(404);
        throw new Error('User not found');
    }
    // res.status(200).json({message: 'Update User'});
});

module.exports = {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};
