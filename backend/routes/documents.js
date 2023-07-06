const upload = require("../middleware/multer");
const express = require("express");

const {encryptId, decryptId, getDocuments, getFile, addDocuments, downloadFile} = require("../controller/documents");

const router = express.Router();

router.route('/').get(getDocuments).post(upload.single('file'), addDocuments);
router.route('/file').get(getFile);
router.route('/download/:id').get(downloadFile);
router.route('/encrypt/:id').post(encryptId);
router.route('/decrypt/:id').get(decryptId);
module.exports = router;