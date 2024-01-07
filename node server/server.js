const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv/config");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server");
});

const dbUrl = process.env.MONGO_URL;
const port = process.env.PORT;

app.listen(port, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + port
    );
  else console.log("Error occurred, server can't start", error);
});

mongoose
  .connect(dbUrl)
  .then((data) => {
    console.log("db connected!");
    app.listen(port);
  })
  .catch((err) => console.log("error in connecting to db!"));
