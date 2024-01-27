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

// ROUTEs
const UserRoutes = require("./routes/UserRoutes");
app.use("/api", UserRoutes);

const dbUrl = process.env.MONGO_URL;
const port = process.env.PORT;

mongoose
  .connect(dbUrl)
  .then((data) => {
    app.listen(port);
  })
  .catch((err) => console.log("error in connecting to db!"));
