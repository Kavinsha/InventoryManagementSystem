import Sidebar from "./Sidebar";
import "../styles/dashboardLayout.css"; 

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar />  {/* Sidebar is always present */}
            <div className="main-content">{children}</div>
        </div>
    );
};

export default DashboardLayout;
