import { Outlet, useLocation } from "react-router-dom";
import ChatsBar from "./ChatsBar";
import useData from "../hooks/useData";
import UserInfo from "./UserInfo";
import { useEffect } from "react";

const Chatpage = () => {
  const { profileInfoOpened, setProfileInfoOpened, openInbox, setOpenInbox } =
    useData();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      setOpenInbox(false);
    } else {
      setOpenInbox(true);
    }
  }, [pathname, setOpenInbox]);

  console.log(openInbox, profileInfoOpened);

  return (
    <div className="flex h-screen w-screen relative hide-scrollbar hide-scrollbar overflow-hidden">
      {/* left side chat list bar */}
      <div
        className={`h-fulll  lg:w-[33%] shrink-0 h-full overflow-y-auto hide-scrollbar transition-all duration-300 absolute lg:static inset-0 z-10  ${
          openInbox ? "-translate-x-24 lg:translate-x-0" : "translate-x-0"
        }`}
      >
        <ChatsBar />
      </div>
      <div
        className={`h-fulll w-full flex-grow overflow-y-auto  absolute inset-0 lg:static z-50 transition-all duration-300 transform ${
          openInbox ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }  ${
          profileInfoOpened
            ? openInbox
              ? "-translate-x-24 lg:translate-x-0"
              : "translate-x-0"
            : ""
        }`}
      >
        <Outlet />
      </div>

      {/* userInfo */}
      <div
        className={` transition-all duration-300 lg:duration-200 overflow-hidden bg-white h-full absolute inset-0 transform  lg:static z-50  ${
          profileInfoOpened
            ? "lg:w-[60%] w-full  translate-x-0"
            : "lg:w-0 translate-x-full"
        }`}
      >
        <UserInfo />
      </div>
    </div>
  );
};

export default Chatpage;
