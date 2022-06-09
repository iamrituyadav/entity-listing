const Brand = require("../models/brands.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const brand = await Brand.find().populate("product_id").lean().exec();
    return res.send(brand);
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    return res.send(brand);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id).lean().exec();
    return res.send(brand);
  } catch (e) {
    return res.send(e.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(brand);
  } catch (e) {
    return res.send(e.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    return res.send(brand);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
