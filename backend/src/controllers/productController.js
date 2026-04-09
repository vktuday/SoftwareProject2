const products = require("../data/products");

// Get all products
async function getAllProducts(req, res) {
  try {
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}

// Get single product by ID
async function getProductById(req, res) {
  try {
    const product = products.find((item) => item._id === req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: err.message,
    });
  }
}

module.exports = { getAllProducts, getProductById };