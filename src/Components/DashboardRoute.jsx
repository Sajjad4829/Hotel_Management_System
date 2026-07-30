import { Outlet } from "react-router-dom";
import Sidebar from "./MainDashBoard/DashBoard/Sidebar";
import TopNavbar from "./MainDashBoard/DashBoard/Topnavbar";


const DashboardRoute = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <TopNavbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardRoute;