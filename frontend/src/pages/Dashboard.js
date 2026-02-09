import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import "./../styles/dashboard.css";
import { buildBarData, buildPieData, commonOptions } from "../utils/chartConfig";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalInventoryValue, setTotalInventoryValue] = useState(0); // New:Total Price
    const [user, setUser] = useState(null);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

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
        
        // Get user from localStorage
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []); 

    useEffect(() => {
        axios.get("http://localhost:5000/api/products/").then(r => setProducts(r.data));
        axios.get("http://localhost:5000/api/orders/").then(r => setOrders(r.data));
    }, []);

    const productLabels = products.map(p => p.name);
    const productQtys = products.map(p => p.quantity);

    const paymentCounts = {
        paid: orders.filter(o => o.paymentStatus === "paid").length,
        pending: orders.filter(o => o.paymentStatus !== "paid").length
    };

    const barData = buildBarData(productLabels, productQtys);
    const pieData = buildPieData(paymentCounts.paid, paymentCounts.pending);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="dashboard-layout">
            <div className="content">
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p>Welcome to the Inventory Dashboard!</p>
                    </div>
                    <div className="account-menu-container">
                        <button 
                            className="account-btn"
                            onClick={() => setShowAccountMenu(!showAccountMenu)}
                        >
                            👤 {user?.username || "Account"}
                        </button>
                        {showAccountMenu && (
                            <div className="account-dropdown">
                                <div className="account-info">
                                    <p><strong>Name:</strong> {user?.username}</p>
                                    <p><strong>Email:</strong> {user?.email}</p>
                                </div>
                                <button 
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

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
                        <h2>Rs.{totalInventoryValue.toFixed(2)}</h2> 
                        <p>Total Inventory Value</p>
                    </div>
                </div>

                <div className="charts-row">
                    <div className="chart-card">
                        <h4>Inventory Quantities</h4>
                        <div className="chart-container">
                            <Bar data={barData} options={commonOptions} />
                        </div>
                    </div>

                    <div className="chart-card">
                        <h4>Order Payment Status</h4>
                        <div className="chart-container">
                            <Pie data={pieData} options={commonOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
