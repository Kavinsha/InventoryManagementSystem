import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/dashboard.css";

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalInventoryValue, setTotalInventoryValue] = useState(0); // NEW: Total Price

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                const products = response.data;

                // Count total products
                setTotalProducts(products.length);

                // Count unique categories
                const uniqueCategories = new Set(products.map(product => product.category));
                setTotalCategories(uniqueCategories.size);

                // Calculate total inventory value (price * quantity)
                const totalValue = products.reduce((sum, product) => {
                    return sum + (product.price * product.quantity);
                }, 0);
                setTotalInventoryValue(totalValue);

            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchData();
    }, []); // Runs once when component mounts

    return (
        <div className="dashboard-layout">
            <div className="content">
                <h1>Dashboard</h1>
                <p>Welcome to the Inventory Dashboard! Here's a quick overview of your inventory.</p>

                <div className="stats-container">
                    <div className="stat-card">
                        <h2>{totalProducts}</h2>
                        <p>Total Products</p>
                    </div>
                    <div className="stat-card">
                        <h2>{totalCategories}</h2>
                        <p>Total Categories</p>
                    </div>
                    <div className="stat-card">
                        <h2>Rs.{totalInventoryValue.toFixed(2)}</h2> {/* Display total price */}
                        <p>Total Inventory Value</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
