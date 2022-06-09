const Order = require("../models/order.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const order = await Order.find()
      .populate("user_id")
      .populate("product_id")
      .lean()
      .exec();
    return res.send(order);
  } catch (e) {
    return res.send(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.send(order);
  } catch (e) {
    return res.send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean().exec();
    return res.send(order);
  } catch (e) {
    return res.send(e.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.send(order);
  } catch (e) {
    return res.send(e.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    return res.send(order);
  } catch (e) {
    return res.send(e.message);
  }
});

module.exports = router;
