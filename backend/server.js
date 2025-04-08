    const express = require("express");
    const mongoose = require("mongoose");
    const cors = require("cors");
    require("dotenv").config();
    const productRoutes = require("./routes/productRoutes");
    const authRoutes =require("./routes/authRoutes")
    const app = express();
    const PORT = process.env.PORT || 5000;

    // Middleware
    app.use(cors());
    app.use(express.json()); // Allows JSON data parsing

    // MongoDB Connection
    mongoose.connect("mongodb://127.0.0.1:27017/stockDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("✅ Connected to MongoDB - stockDB"))
        .catch(err => console.error("❌ MongoDB connection error:", err));

    // Import Routes
 // Ensure this file exists
    app.use("/api/products", productRoutes);
    app.use("/api/users",authRoutes);

    // Start Server
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
