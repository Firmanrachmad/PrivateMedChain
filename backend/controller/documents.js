const Document = require("../models/Documents");
const Keys = require("../models/Asymmetric");
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper");
const crypto = require("crypto");
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	modulusLength: 2048,
});

function encryptText(plainText) {
  const publicKeyPEM = publicKey.export({
    format: 'pem',
    type: 'pkcs1',
  });

  const encryptedBuffer = crypto.publicEncrypt(
    {
      key: publicKeyPEM,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(plainText)
  );

  const encryptedText = encryptedBuffer.toString('base64');
  return encryptedText;
}

const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json({ documents });
  } catch (error) {
    console.log(error);
  }
};

const addDocuments = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const file = req.file.path;
  // const plainText = "simple text";
  const { id } = req.params;
  const stringid = id.toString();
  const encryptedText = encryptText(stringid);
  const document = await Document.create({ name, file, encryptedText });
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

module.exports = { getDocuments, addDocuments, downloadFile };
