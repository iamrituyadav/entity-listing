const Product = require("../models/products.model");
const express = require("express");
const ReviewsModel = require("../models/reviews.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const product = await Product.find().populate("category_id").lean().exec();
    return res.send(product);
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.send(product);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category_id")
      .lean()
      .exec();
    const reviews = await ReviewsModel.aggregate().match({
      product_id: req.params.id,
    });
    return res.send(product);
  } catch (e) {
    return res.send(e.message);
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(product);
  } catch (e) {
    return res.send(e.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
