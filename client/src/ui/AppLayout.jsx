import { Outlet } from "react-router-dom";
import Menu from "./Menu";

function AppLayout() {
  return (
    <div className="h-[100vh] w-[100%]">
      <Menu />
      <Outlet />
    </div>
  );
}

export default AppLayout;
