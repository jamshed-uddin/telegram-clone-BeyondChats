import React from "react";

import { IoBookmarkOutline, IoMoon } from "react-icons/io5";
import { LuArchive } from "react-icons/lu";
import { TbHistoryToggle } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import { SlSettings } from "react-icons/sl";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GrBug } from "react-icons/gr";
import { RxMoon } from "react-icons/rx";
import { IoIosSunny } from "react-icons/io";
import useData from "../hooks/useData";
import { HiXMark } from "react-icons/hi2";

const menuItems = [
  { item: "Saved messages", icon: IoBookmarkOutline },
  { item: "Archived chats", icon: LuArchive },
  { item: "My story", icon: TbHistoryToggle },
  { item: "Contact", icon: FaRegUser },
  { item: "Settings", icon: SlSettings },
  { item: "Telegram features", icon: AiOutlineQuestionCircle },
  { item: "Report a bug", icon: GrBug },
];
const LeftSideMenu = () => {
  const { dark, toggleTheme, setLeftMenuOpened } = useData();
  const buttonStyle = `flex items-center gap-6  font-semibold text-xl lg:text-base w-full pr-7 rounded-lg  transition-all duration-100 px-2 py-1 font-medium ${
    dark ? "hover:bg-gray-800" : "hover:bg-gray-50"
  }`;
  return (
    <div
      className={` px-4 py-3 rounded-xl flex flex-col  lg:h-fit  h-full  space-y-3 lg:space-y-1 ${
        dark ? "bg-gray-900 text-white " : " bg-gray-100"
      }`}
    >
      <div className="lg:hidden mt-4 flex justify-end mb-7">
        <button onClick={() => setLeftMenuOpened(false)} className="">
          <HiXMark size={25} />
        </button>
      </div>

      <button className={buttonStyle}>
        <span>
          <RxMoon />
        </span>
        <span className="flex items-center justify-between w-full">
          <span>Dark mode</span>{" "}
          <span onClick={toggleTheme} className="flex items-c">
            {dark ? <RxMoon size={20} /> : <IoIosSunny size={20} />}
          </span>
        </span>
      </button>
      {menuItems.map((item) => (
        <button key={item.item} className={buttonStyle}>
          <span>
            <item.icon
              size={20}
              color={`${item.item === "Delete chat" && "red"}`}
            />
          </span>{" "}
          <span className={`${item.item === "Delete chat" && "text-red-500"}`}>
            {item.item}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LeftSideMenu;
