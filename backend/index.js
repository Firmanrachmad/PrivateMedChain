const express = require("express");
const connectDB = require("./db/connect");

const app = express();
const dotenv = require('dotenv').config();
const cors = require("cors");

const port = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send("Hello World");
});

const documentRouter = require("./routes/documents");
app.use("/backend/v1/documents", documentRouter);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();



