const express = require("express");
const connectDB = require("./db/connect");
const documentRouter = require("./routes/documents");
const userRouter = require("./routes/users");
const CookieParser = require("cookie-parser");

const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(CookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/backend/v1/documents", documentRouter);

app.use("/backend/users", userRouter);

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
