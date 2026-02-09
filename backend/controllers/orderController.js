const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
    console.log("CreateOrder Hit")
    try {
        const { vendor, product, quantity } = req.body;
        console.log({product})
        const prod = await Product.findById(product);
        console.log(prod)
        if (!prod) return res.status(404).json({ msg: "Product not found" });

        // Check if quantity is available
        if (prod.quantity < Number(quantity)) {
            return res.status(400).json({ msg: `Only ${prod.quantity} items available` });
        }

        // Calculate amount
        const amount = (prod.price || 0) * Number(quantity);
        
        // Create order
        const order = new Order({ vendor, product, quantity, amount });
        await order.save();

        // Deduct quantity from product
        prod.quantity -= Number(quantity);
        await prod.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("vendor").populate("product").sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const updates = req.body; // e.g. { paymentStatus, received }
        const order = await Order.findByIdAndUpdate(req.params.id, updates, { new: true }).populate("vendor").populate("product");
        if (!order) return res.status(404).json({ msg: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};