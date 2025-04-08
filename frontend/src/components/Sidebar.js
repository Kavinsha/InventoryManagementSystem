import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Inventory</h2>
            <nav>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>
                <NavLink to="/dashboard/add-product" className={({ isActive }) => isActive ? "active" : ""}>Add Product</NavLink>
                <NavLink to="/dashboard/manage-products" className={({ isActive }) => isActive ? "active" : ""}>Manage Products</NavLink>
                <NavLink to="/dashboard/view-products" className={({ isActive }) => isActive ? "active" : ""}>View Products</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
