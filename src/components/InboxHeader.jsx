import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { SlMagnifier } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { HiXMark } from "react-icons/hi2";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useState } from "react";
import { generateAvatarColor } from "../utils/utilFunctions";

const InboxHeader = ({ setOpenInfo, creator }) => {
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  return (
    <div className="py-1.5 px-4 shadow-sm flex justify-between items-center bg-white relative">
      <div
        className={`flex items-center gap-3 absolute left-20 top-2 bottom-2 right-5 bg-white transition-opacity duration-300 ${
          isSearchbarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex w-full items-center  rounded-2xl shadow-md  px-4">
          <span>
            <SlMagnifier size={25} />
          </span>
          <div className="flex-grow">
            <input
              type="text"
              className="input input-sm input-ghost focus:border-0 focus:outline-0 w-full text-lg"
            />
          </div>
          <span
            onClick={() => setIsSearchbarOpen(false)}
            className="cursor-pointer"
          >
            <HiXMark size={25} />
          </span>
        </div>
        <div className="cursor-pointer">
          <IoCalendarClearOutline size={25} />
        </div>
      </div>

      <div className="flex items-center gap-5 ">
        <div
          onClick={() => setOpenInfo((p) => !p)}
          className={`w-11 h-11 rounded-full cursor-pointer flex items-center justify-center text-2xl font-bold text-black`}
          style={{ backgroundColor: generateAvatarColor(creator?.id) }}
        >
          {creator?.name?.slice(0, 1)?.toUpperCase()}
        </div>
        <h1 className="font-semibold text-lg">
          {creator?.name || "User name"}
        </h1>
      </div>
      <div className="flex items-center gap-8">
        <span className="cursor-pointer">
          <BsTelephone size={20} />
        </span>
        <span
          onClick={() => setIsSearchbarOpen(true)}
          className="cursor-pointer"
        >
          <SlMagnifier size={20} />
        </span>
        <span className="cursor-pointer">
          <IoEllipsisVerticalSharp size={20} />
        </span>
      </div>
    </div>
  );
};

export default InboxHeader;
