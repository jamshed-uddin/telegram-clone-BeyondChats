import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineArrowLeft, HiXMark } from "react-icons/hi2";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import NameCard from "./NameCard";
import { useNavigate } from "react-router-dom";
import useData from "../hooks/useData";
import ContextMenu from "./ContextMenu";
import RightSideChatOptions from "./RightSideChatOptions";

const InboxHeader = ({ setOpenInfo, chat }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const { setOpenInbox } = useData();
  const navigateBack = () => {
    navigate("/");
  };

  return (
    <div className="py-1.5 px-4 shadow-sm flex justify-between items-center bg-white relative">
      {/* searchbar */}
      <div
        className={`flex items-center gap-3 absolute left-20 top-2 bottom-2 right-5 bg-white z-10 transition-opacity duration-300 ${
          isSearchbarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex w-full items-center  rounded-2xl shadow-md  px-4">
          <button className="">
            <HiMiniMagnifyingGlass size={25} />
          </button>
          <div className="flex-grow">
            <input
              type="text"
              className="input input-sm input-ghost focus:border-0 focus:outline-0 w-full text-lg"
            />
          </div>
          <button
            onClick={() => setIsSearchbarOpen(false)}
            className="cursor-pointer"
          >
            <HiXMark size={25} />
          </button>
        </div>
        <div className="cursor-pointer">
          <IoCalendarClearOutline size={25} />
        </div>
      </div>

      {/* right side 3 dot menu */}
      <ContextMenu
        top={68}
        right={10}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      >
        <RightSideChatOptions />
      </ContextMenu>

      <div className="flex items-center gap-5">
        {/* navigate back button for mobile */}
        <button onClick={navigateBack} className=" lg:hidden">
          <HiOutlineArrowLeft size={25} />
        </button>
        {/* avatar and name */}
        <NameCard chat={chat} placedIn={"inboxHeader"} />
      </div>

      {/* right side buttons */}
      <div className="flex items-center gap-7 ">
        <button className="cursor-pointer">
          <BsTelephone size={20} />
        </button>
        <button
          onClick={() => setIsSearchbarOpen(true)}
          className="cursor-pointer opacity-90 hidden lg:block"
        >
          <HiMiniMagnifyingGlass size={25} />
        </button>
        <button
          onClick={() => setMenuOpen((p) => (p ? false : true))}
          className="cursor-pointer"
        >
          <IoEllipsisVerticalSharp size={20} />
        </button>
      </div>
    </div>
  );
};

export default InboxHeader;
