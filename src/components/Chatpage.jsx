import { Outlet, useLocation } from "react-router-dom";
import ChatsBar from "./ChatsBar";
import useData from "../hooks/useData";
import UserInfo from "./UserInfo";
import { useEffect } from "react";
import LeftSideMenu from "./LeftSideMenu";
import { LuPencil } from "react-icons/lu";

const Chatpage = () => {
  const {
    profileInfoOpened,

    openInbox,
    setOpenInbox,
    dark,
    leftMenuOpened,
  } = useData();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      setOpenInbox(false);
    } else {
      setOpenInbox(true);
    }
  }, [pathname, setOpenInbox]);

  return (
    <div className="flex h-screen w-screen relative hide-scrollbar  overflow-hidden">
      <div
        className={`absolute right-24 lg:right-auto  left-0  bottom-0 top-0 lg:top-16 lg:left-4  z-50 transition-all duration-300 transform ${
          leftMenuOpened
            ? "translate-x-0"
            : "md:-translate-x-[45rem] lg:-translate-x-96 -translate-x-96"
        } `}
      >
        <LeftSideMenu />
      </div>

      {/* add more button */}
      <div
        className={`absolute bottom-12 left-80 z-50 ${
          dark ? "secondary-bg" : "primary-bg"
        } w-fit p-3  rounded-full `}
      >
        <span>
          <LuPencil color="#fff" size={25} />
        </span>
      </div>

      {/* left side chat list bar */}

      <div
        className={`h-fulll  lg:w-[33%] shrink-0 h-full  hide-scrollbar transition-all duration-300  absolute lg:static inset-0 z-10  ${
          openInbox ? "-translate-x-24 lg:translate-x-0" : "translate-x-0"
        } ${
          dark ? "border-r border-r-gray-700" : "border-r border-r-gray-300"
        } ${
          leftMenuOpened
            ? "disable-scroll translate-x-16 lg:translate-x-0"
            : "overflow-y-auto "
        }`}
      >
        <ChatsBar />
      </div>
      <div
        className={`h-fulll w-full flex-grow overflow-y-auto  absolute inset-0 lg:static z-50 transition-all  duration-300 transform ${
          openInbox ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }  ${
          profileInfoOpened
            ? openInbox
              ? "-translate-x-16 lg:translate-x-0"
              : "translate-x-0"
            : ""
        }`}
      >
        <Outlet />
      </div>

      {/* userInfo */}
      <div
        className={` transition-all duration-300 lg:duration-200 overflow-hidden  h-full absolute inset-0 transform  lg:static z-50   ${
          dark
            ? "bg-gray-900 text-white border-l border-l-gray-700"
            : "bg-white  border-l border-r-gray-300"
        }  ${
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
