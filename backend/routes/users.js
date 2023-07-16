const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUserId,
  getAllUser,
  deleteUser,
} = require("../controller/users");

router.route("/").post(registerUser);
router.route("/auth").post(authUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/allusers").get(getAllUser);
router.route("/delete/:id").delete(protect, deleteUser);
router.route("/update/:id").put(protect, updateUserId);

module.exports = router;
