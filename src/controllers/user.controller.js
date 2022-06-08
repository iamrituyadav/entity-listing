const User = require("../models/user.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.send(users);
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const users = await User.create(req.body);
    return res.send(users);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
