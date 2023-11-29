import Menu from "../ui/Menu";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="bg-[var(--color-dark--1)] h-[100vh]">
      <Menu />
      <Outlet />
    </div>
  );
}

export default Dashboard;
