const upload = require("../middleware/multer");
const express = require("express");

const {getDocuments, addDocuments, downloadFile} = require("../controller/documents");

const router = express.Router();

router.route('/').get(getDocuments).post(upload.single('file'), addDocuments);
router.route('/download/:id').get(downloadFile);

module.exports = router;