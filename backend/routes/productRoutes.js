const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// ✅ Create a new product
router.post("/add", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Log request body
    const { name, description, price, quantity, category } = req.body;
    const product = await Product.create({ name, description, price, quantity, category });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({ error: "Failed to add product" });
  }
});


// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Update a product
router.put("/update/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: "Failed to update product" });
  }
});

// ✅ Delete a product
router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
