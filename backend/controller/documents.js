const Document = require("../models/Documents");
const Asymmetric = require("../models/Asymmetric");
const Keys = require("../models/Keys");
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper");
const crypto = require("crypto");

function encryptText(plainText, publicKeyPEM) {
  const encryptedBuffer = crypto.publicEncrypt(
    {
      key: publicKeyPEM,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(plainText)
  );

  const encryptedText = encryptedBuffer.toString("base64");
  return encryptedText;
}

function decryptText(encryptedText, privateKeyPEM) {
  const encryptedBuffer = Buffer.from(encryptedText, "base64");

  const decryptedBuffer = crypto.privateDecrypt(
    {
      key: privateKeyPEM,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedBuffer
  );

  const decryptedText = decryptedBuffer.toString();
  return decryptedText;
}

const encryptId = asyncWrapper(async (req, res) => {
  const key = await Keys.findOne();
  const publicKeyPEMs = key.publicKeys;
  const { id } = req.params;
  const documentId = id;
  const encryptedId = encryptText(documentId, publicKeyPEMs);
  // const asymmetric = await Asymmetric.create({ encryptedId });
  res.status(201).json({ encryptedId });
});

const decryptId = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const key = await Keys.findOne();
  const privateKeyPEMs = key.privateKeys;
  const encryptedId = decodeURIComponent(id);
  const decryptedId = decryptText(encryptedId, privateKeyPEMs);
  res.status(200).json({ decryptedId });
});

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json({ documents });
  } catch (error) {
    console.log(error);
  }
};

const getFile = async (req, res) => {
  try {
    const asymmetrics = await Asymmetric.find();
    res.status(200).json({ asymmetrics });
  } catch (error) {
    console.log(error);
  }
};

const addDocuments = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const file = req.file.path;
  const { id } = req.params;
  const document = await Document.create({ name, file });
  res.status(201).json({ document });
});

const downloadFile = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const document = await Document.findById(id);
  if (!document) {
    return next(new Error("No Document Found"));
  }
  const file = document.file;
  const filePath = path.join(__dirname, `../${file}`);
  res.download(filePath);
});

module.exports = {
  encryptId,
  decryptId,
  getDocuments,
  getFile,
  addDocuments,
  downloadFile,
};
