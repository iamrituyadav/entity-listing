const Review = require("../models/reviews.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const review = await Review.find().populate("product_id").lean().exec();
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).lean().exec();
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    return res.send(review);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
