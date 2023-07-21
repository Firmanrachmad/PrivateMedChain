const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../models/Users");
const { generateToken } = require("../utils/generateToken");
const ethers = require("ethers");
const crypto = require("crypto");

function deriveSecretKeyFromPassword(password) {
  const salt = crypto.randomBytes(16);
  const keyLength = 32; // Panjang kunci yang diinginkan (32 byte = 256 bit untuk AES-256)
  return crypto.scryptSync(password, salt, keyLength);
}

function encryptText(plainText, password) {
  const secretKey = deriveSecretKeyFromPassword(password);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", secretKey, iv);
  let encrypted = cipher.update(plainText, "utf-8", "base64");
  encrypted += cipher.final("base64");
  return iv.toString("base64") + ":" + encrypted;
}

function decryptText(encryptedText, secretKey) {
  const parts = encryptedText.split(":");
  const iv = Buffer.from(parts[0], "base64");
  const encrypted = parts[1];
  const decipher = crypto.createDecipheriv("aes-256-cbc", secretKey, iv);
  let decrypted = decipher.update(encrypted, "base64", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

const authUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      ethaddress: user.ethaddress.address,
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncWrapper(async (req, res) => {
  const { name, email, password, roles } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User Already Exists" });
    throw new Error("User Already Exists");
  }

  const idCrypto = crypto.randomBytes(32).toString("hex");
  const _privateKey = "0x" + idCrypto;

  const privateKey = encryptText(_privateKey, password);
  const address = new ethers.Wallet(_privateKey).address;

  const user = await User.create({
    name,
    email,
    password,
    roles,
    ethaddress: { address, privatekey: privateKey },
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
      ethaddress: user.ethaddress,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncWrapper(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

const getUserProfile = asyncWrapper(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    roles: req.user.roles,
    ethaddress: req.user.ethaddress,
  };
  res.status(200).json({ user });
});

const updateUserProfile = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user._id);
  // const oldPrivateKey = decryptText(user.ethaddress.privatekey, user.password);
  const enteredPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (newPassword) {
      if (await user.matchPassword(enteredPassword)) {
        const decryptedPrivateKey = decryptText(
          user.ethaddress.privatekey,
          user.password
        );
        const newencryptedPrivateKey = encryptText(
          decryptedPrivateKey,
          newPassword
        );
        user.password = newPassword;
        user.ethaddress.privatekey = newencryptedPrivateKey;
      } else {
        res.status(400).json({ message: "Invalid Old Password" });
        throw new Error("Invalid Old Password");
      }
    }

    // const newPrivateKey = decryptText( user.ethaddress.privatekey, user.password );

    const updatedUser = await user.save();
    res.status(200).json({
      // oldPrivateKey: oldPrivateKey,
      // newPrivateKey: newPrivateKey,
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      ethaddress: updatedUser.ethaddress.privatekey,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserId = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  res.status(200).json({ user });
});

const updateUserId = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

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
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAllUser = asyncWrapper(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
});

const deleteUser = asyncWrapper(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Jika pengguna ditemukan, lakukan penghapusan
      await user.remove();
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserId,
  updateUserId,
  getAllUser,
  deleteUser,
};
