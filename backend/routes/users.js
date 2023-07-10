const express = require('express')

const {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
} = require("../controller/users");

const router = express.Router();

router.route('/').post(registerUser);
router.route('/auth').post(authUser);
router.route('/logout').post(logoutUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);

module.exports = router

