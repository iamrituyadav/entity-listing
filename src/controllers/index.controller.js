const Product = require("../models/index.model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let page = req.query.page || 0;
    let prodPerPage = req.query.size || 5;
    let filter = req.query.filter;
    let sort = req.query.sort;
    console.log(sort);

    if (!filter && !sort) {
      const products = await Product.find()
        .skip(page * prodPerPage)
        .limit(prodPerPage)
        .lean()
        .exec();
      return res.send(products);
    } else if (filter && !sort) {
      const products = await Product.find({ category: filter })
        .skip(page * prodPerPage)
        .limit(prodPerPage)
        .lean()
        .exec();
      return res.send(products);
    } else if (sort) {
      let value = null;
      if (sort === "asc") {
        value = 1;
      } else if (sort === "dsc") {
        value = -1;
      }
      const products = await Product.find({ category: filter })
        .skip(page * prodPerPage)
        .limit(prodPerPage)
        .sort({ id: value })
        .lean()
        .exec();
      return res.send(products);
    }
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const products = await Product.create(req.body);
    return res.send(products);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
