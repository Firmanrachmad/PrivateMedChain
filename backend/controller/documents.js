const Document = require("../models/Documents");
const Asymmetric = require("../models/Asymmetric");
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper");
const crypto = require("crypto");
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

function encryptText(plainText) {
  const publicKeyPEM = publicKey.export({
    format: "pem",
    type: "pkcs1",
  });

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

function decryptText(encryptedText) {
  const privateKeyPEM = privateKey.export({
    format: "pem",
    type: "pkcs1",
  });

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
  const { id } = req.params;
  const documentId = id;
  const encryptedId = encryptText(documentId);
  const decryptedId = decryptText(encryptedId);
  const asymmetric = await Asymmetric.create({
    documentId,
    encryptedId,
    decryptedId,
  });
  res.status(201).json({ asymmetric });
});

const decryptId = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const encryptedId = decodeURIComponent(id);
  const decryptedId = decryptText(encryptedId);
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
