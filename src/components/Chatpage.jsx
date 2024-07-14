import { Outlet } from "react-router-dom";
import ChatsBar from "./ChatsBar";

const Chatpage = () => {
  return (
    <div className="flex h-screen relative hide-scrollbar hide-scrollbar">
      <div className="h-fulll  lg:w-[33%] shrink-0 hidden md:block h-full overflow-y-auto hide-scrollbar">
        <ChatsBar />
      </div>
      <div className="h-fulll  lg:w-[67%] overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Chatpage;
