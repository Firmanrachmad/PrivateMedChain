const Document = require("../models/Documents");
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper");

const getDocuments = async (req,res) => {
    try {
        const documents = await Document.find();
        res.status(200).json({documents});
    } catch(error) {
        console.log(error);
    }
};

const addDocuments = asyncWrapper(async (req,res) => {
    const {name} = req.body;
    const file = req.file.path;
    const document = await Document.create({name,file});
    res.status(201).json({document});
});

const downloadFile = asyncWrapper(async (req,res) => {
    const {id} = req.params;
    const document = await Document.findById(id);
    if(!document){
        return next(new Error("No Document Found"));
    }
    const file = document.file;
    const filePath = path.join(__dirname, `../${file}`);
    res.download(filePath);
})

module.exports = {getDocuments,addDocuments,downloadFile};
