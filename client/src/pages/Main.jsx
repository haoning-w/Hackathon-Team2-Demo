import Delivery from "../features/delivery/Delivery";
import AppMap from "../features/map/AppMap";
import SideBar from "../ui/SideBar";

function Main() {
  return (
    <div className="h-[100vh] flex w-full">
      <SideBar />
      <div className="relative flex-grow">
        <AppMap />
        <Delivery />
      </div>
    </div>
  );
}

export default Main;
