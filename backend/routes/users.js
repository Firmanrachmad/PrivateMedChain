const express = require("express");
const router = express.Router();
const { protect, checkPRKRoles, checkRoles } = require("../middleware/authMiddleware");

const {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserId,
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
router.route("/allusers").get(checkRoles, getAllUser);
router.route("/delete/:id").delete(checkPRKRoles, deleteUser);
router.route("/get/:id").get(checkPRKRoles, getUserId);
router.route("/update/:id").put(checkPRKRoles, updateUserId);

module.exports = router;
