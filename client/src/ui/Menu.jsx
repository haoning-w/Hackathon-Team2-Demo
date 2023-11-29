import { NavLink } from "react-router-dom";

function Menu() {
  const navLinkStyle = "text-[24px]";
  return (
    <div className="h-[64px] bg-[#2d3439] flex flex-col justify-center border-b-gray-600 border-b-2">
      <div className="ml-40 flex gap-16 text-[var(--color-light--2)]">
        <NavLink to="/main" className={navLinkStyle}>
          Logistics
        </NavLink>
        <NavLink to="/dashboard/supplier" className={navLinkStyle}>
          Supplier
        </NavLink>
        <NavLink to="/dashboard/requester" className={navLinkStyle}>
          Requester
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;
