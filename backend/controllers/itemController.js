const Product = require("../models/Product");

//Create a new product
exports.createProduct = async (req, res) => {
  try {
    console.log("Received Data:", req.body); 
    const { name, description, price, quantity, category } = req.body;
    const product = await Product.create({ name, description, price, quantity, category });
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({ error: "Failed to add product" });
  }
}


//Get all products
exports.getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;

        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
        product.category = category;

        await product.save();
        res.json({ msg: "Product updated successfully", product });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

//Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete product" });
  }
};
