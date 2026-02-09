import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";


const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const ManageProducts = lazy(() => import("./pages/ManageProducts"));
const ViewProducts = lazy(() => import("./pages/ViewProducts"));
const AddVendor = lazy(() => import("./pages/AddVendor"));
const ManageVendors = lazy(() => import("./pages/ManageVendors"));
const Orders = lazy(() => import("./pages/Orders"));
const ManageOrders = lazy(() => import("./pages/ManageOrders"));

function App() {
    return (
        <Router>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Dashboard Routes (With Sidebar) */}
                    <Route path="/dashboard" element={<DashboardLayoutWrapper />}>
                        <Route index element={<Dashboard />} />
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="manage-products" element={<ManageProducts />} />
                        <Route path="view-products" element={<ViewProducts />} />
                        <Route path="add-vendor" element={<AddVendor />} />
                        <Route path="manage-vendors" element={<ManageVendors />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="manage-orders" element={<ManageOrders />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}


const DashboardLayoutWrapper = () => {
    return (
        <DashboardLayout>
            <Outlet /> {/* Renders the active route inside the layout */}
        </DashboardLayout>
    );
};

export default App;
