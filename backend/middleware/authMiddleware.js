const jwt = require("jsonwebtoken");
const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/Users");

const protect = asyncWrapper(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const checkPRKRoles = asyncWrapper(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      if (req.user.roles == "PRK") {
        next();
      } else {
        res.status(403);
        throw new Error("Not Authorized, Only PRK Can Access This");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Only PRK Can Access This");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const checkTkRoles = asyncWrapper(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      if (req.user.roles == "TK") {
        next();
      } else {
        res.status(403);
        throw new Error("Not Authorized, Only TK Can Access This");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Only TK Can Access This");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

module.exports = { protect, checkPRKRoles, checkTkRoles };
