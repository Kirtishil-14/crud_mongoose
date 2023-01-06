const express = require("express");
const mongoose = require("mongoose");
const testRouter = require("./routes/test.route.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const url = 'mongodb://127.0.0.1:27017';

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(testRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});