import { Outlet } from "react-router-dom";
import ChatsBar from "./ChatsBar";
import useData from "../hooks/useData";
import UserInfo from "./UserInfo";

const Chatpage = () => {
  const { profileInfoOpened, setProfileInfoOpened } = useData();
  return (
    <div className="flex h-screen w-screen relative hide-scrollbar hide-scrollbar">
      <div className="h-fulll  lg:w-[33%] shrink-0 hidden md:block h-full overflow-y-auto hide-scrollbar">
        <ChatsBar />
      </div>
      <div className="h-fulll w-full flex-grow overflow-y-auto">
        <Outlet />
      </div>
      <div
        className={` transition-all duration-200 overflow-hidden bg-white  ${
          profileInfoOpened ? "w-[60%] " : "w-0"
        }`}
      >
        <UserInfo />
      </div>
    </div>
  );
};

export default Chatpage;
