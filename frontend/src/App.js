import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Lazy load components
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const ManageProducts = lazy(() => import("./pages/ManageProducts"));
const ViewProducts = lazy(() => import("./pages/ViewProducts"));

function App() {
    return (
        <Router>
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
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

// Ensures Sidebar is Always Present in Dashboard
const DashboardLayoutWrapper = () => {
    return (
        <DashboardLayout>
            <Outlet /> {/* Renders the active route inside the layout */}
        </DashboardLayout>
    );
};

export default App;
