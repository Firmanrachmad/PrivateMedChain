// To connect with your mongoDB database
const mongoose = require('mongoose');
const multer = require("multer");
const UserSchema = require('./model/user');
const ImageSchema = require('./model/image');
const DocumentSchema = require('./model/document');
const { GridFsStorage } = require("multer-gridfs-storage");


mongoose.connect('mongodb://localhost:27017/', {
	dbName: 'testnet',
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) :
	console.log('Connected to MongoDB database'));

//
const User = mongoose.model('users', UserSchema);
User.createIndexes();
const Image = mongoose.model('images', ImageSchema);
Image.createIndexes();
const Document = mongoose.model('documents', DocumentSchema);
Document.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");

// GridFS Storage
const storage = new GridFsStorage({
	url: 'mongodb://localhost:27017/testnet', // Ganti dengan URL MongoDB Anda
	file: (req, file) => {
	  return {
		bucketName: 'uploads', // Nama bucket untuk menyimpan file
		filename: file.originalname // Menggunakan nama file asli
	  };
	}
});

const upload = multer({ storage });

//
console.log("App listen at port 5000");
app.use(express.json({limit: '20mb'}));
app.use(cors());
app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});

app.post("/register", async (req, resp) => {
	try {
		const user = new User(req.body);
		let result = await user.save();
		result = result.toObject();
		if (result) {
			delete result.password;
			resp.send(req.body);
			console.log(result);
		} else {
			console.log("User already register");
		}

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.post("/upload-image", async (req, resp) => {
	const {base64} = req.body;
	try {
		await Image.create({image:base64});
		resp.send({ status: "ok" });

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});

app.post("/upload-pdf", upload.single('pdf'), async (req, resp) => {
	
	  const { filename, id } = req.file;
	try {
	  // Lakukan sesuatu dengan informasi file yang di-upload, misalnya menyimpannya ke database atau memprosesnya
	  await Document.create({filename});
	  resp.send({ status: "ok", filename, id });
	} catch (e) {
	  resp.send("Something Went Wrong");
	}
});

app.get("/get-image", async (req, resp) => {
	try {
		await Image.find({}).then(data => {
			resp.send({ status: "ok", data: data})
		})

	} catch (e) {
		resp.send("Something Went Wrong");
	}
});


app.listen(5000);
