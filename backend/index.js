// To connect with your mongoDB database
const mongoose = require('mongoose');
const UserSchema = require('./model/user');
const ImageSchema = require('./model/image');

mongoose.connect('mongodb://localhost:27017/', {
	dbName: 'testnet',
	useNewUrlParser: true,
	useUnifiedTopology: true
}, err => err ? console.log(err) :
	console.log('Connected to MongoDB database'));

const User = mongoose.model('users', UserSchema);
User.createIndexes();
const Image = mongoose.model('images', ImageSchema);
Image.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
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
