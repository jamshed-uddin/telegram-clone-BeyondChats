import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineArrowLeft, HiXMark } from "react-icons/hi2";
import { IoCalendarClearOutline } from "react-icons/io5";
import { VscPinnedDirty } from "react-icons/vsc";

import { useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import NameCard from "./NameCard";
import { useNavigate } from "react-router-dom";
import useData from "../hooks/useData";
import ContextMenu from "./ContextMenu";
import RightSideChatOptions from "./RightSideChatOptions";

const InboxHeader = ({
  setOpenInfo,
  chat,
  pinnedMessage,
  pinnedMessageRef,
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const { setOpenInbox, dark } = useData();
  const navigateBack = () => {
    navigate("/");
  };

  const scrollToPinnedMessage = () => {
    if (pinnedMessageRef?.current[pinnedMessage?.id]) {
      pinnedMessageRef.current[pinnedMessage?.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      const messageElement = pinnedMessageRef?.current[pinnedMessage?.id];

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            messageElement.classList.add("ping-message");
            setTimeout(() => {
              messageElement.classList.remove("ping-message");
            }, 1000);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(messageElement);
    }
  };

  return (
    <div
      className={`py-1.5 px-4 shadow-sm flex flex-wrap lg:flex-nowrap justify-between items-center relative ${
        dark ? "bg-gray-900 text-white" : "bg-white"
      }`}
    >
      {/* searchbar */}
      <div
        className={`flex items-center gap-3 absolute left-20 top-2 bottom-2 right-5  z-20 transition-opacity duration-300 ${
          isSearchbarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } ${dark ? "bg-gray-900 text-white" : "bg-white"}`}
      >
        <div
          className={`flex w-full items-center  rounded-2xl shadow-md  px-4 ${
            dark && "shadow-gray-700"
          }`}
        >
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

      {/* avatar/name and navigate button */}
      <div className="flex flex-grow items-center gap-5 shrink-0">
        {/* navigate back button for mobile */}
        <button onClick={navigateBack} className=" lg:hidden">
          <HiOutlineArrowLeft size={25} />
        </button>
        {/* avatar and name */}
        <NameCard chat={chat} placedIn={"inboxHeader"} />
      </div>

      {/* right side buttons */}
      <div className="flex items-center gap-7 lg:order-3">
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

      {/* pinned message */}
      {pinnedMessage?.message && (
        <div
          onClick={scrollToPinnedMessage}
          className={`lg:order-2 lg:mr-8 flex shrink-0 items-center justify-between lg:justify-normal  w-full lg:w-auto cursor-pointer z-10 ${
            dark ? "bg-black" : "bg-white"
          }`}
        >
          <div className=" leading-5">
            <h4 className={`text-blue-600 font-medium`}>Pinned message</h4>
            <h5 className={`text-sm ${dark ? "text-white" : "text-black"}`}>
              {pinnedMessage?.message?.slice(0, 35)}...{" "}
            </h5>
          </div>
          <span>
            <VscPinnedDirty size={25} />
          </span>
        </div>
      )}
    </div>
  );
};

export default InboxHeader;
