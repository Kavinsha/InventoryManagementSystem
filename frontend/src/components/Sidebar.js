import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import logo from "../assets/logo.png";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="Trackit logo" />
                <h2>Trackit</h2>
            </div>
            
            <nav>
                <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>
                <NavLink to="/dashboard/view-products" className={({ isActive }) => isActive ? "active" : ""}>View Products</NavLink>
                <NavLink to="/dashboard/add-product" className={({ isActive }) => isActive ? "active" : ""}>Add Product</NavLink>
                <NavLink to="/dashboard/manage-products" className={({ isActive }) => isActive ? "active" : ""}>Manage Products</NavLink>
                <NavLink to="/dashboard/add-vendor" className={({ isActive }) => isActive ? "active" : ""}>Add Vendor</NavLink>
                <NavLink to="/dashboard/manage-vendors" className={({ isActive }) => isActive ? "active" : ""}>Manage Vendors</NavLink>
                <NavLink to="/dashboard/orders" className={({ isActive }) => isActive ? "active" : ""}>Create Order</NavLink>
                <NavLink to="/dashboard/manage-orders" className={({ isActive }) => isActive ? "active" : ""}>Manage Orders</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
