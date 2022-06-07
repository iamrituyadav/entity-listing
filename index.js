const express = require("express");
const mongoose = require("mongoose");
const connect = require("./src/db/db");
const indexController = require("./src/controllers/index.controller");
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use("/products", indexController);

app.listen(8080, async function () {
  try {
    await connect();
    console.log("Listening to port 8080");
  } catch (err) {
    console.log(err.message);
  }
});
