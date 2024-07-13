import { Outlet } from "react-router-dom";
import ChatsList from "./ChatsList";

const Chatpage = () => {
  return (
    <div className="flex h-screen relative">
      <div className="h-fulll border border-black lg:w-[33%] shrink-0 hidden md:block">
        <ChatsList />
      </div>
      <div className="h-fulll  lg:w-[67%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Chatpage;
