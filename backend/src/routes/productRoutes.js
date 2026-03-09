const express = require("express");
const { getAllProducts, getProductById } = require("../controllers/productController");

const router = express.Router();

// Public: list all products
router.get("/", getAllProducts);

// Public: get single product
router.get("/:id", getProductById);

module.exports = router;