import { LuPencil } from "react-icons/lu";
import { HiXMark } from "react-icons/hi2";
import { BsTelephone } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { IoMailOpenOutline } from "react-icons/io5";

import useData from "../hooks/useData";
import NameCard from "./NameCard";
import { useLocation } from "react-router-dom";
import { useState } from "react";
const UserInfo = () => {
  const { getSingleChat, profileInfoOpened, setProfileInfoOpened } = useData();
  const { pathname } = useLocation();
  const [profileTab, setProfileTab] = useState("media");

  const chat = getSingleChat(pathname?.split("/").at(3));

  const contactStyle = "flex items-center gap-8 text-lg  leading-6 w-full";
  return (
    <div className="lg:px-7 px-4 ">
      {/* close userinfo buttons */}
      <div className="flex items-center py-4 ">
        <button onClick={() => setProfileInfoOpened(false)} className="">
          <HiXMark size={25} />
        </button>
        <span className="flex-grow text-xl font-semibold ml-10">User info</span>
        <button>
          <LuPencil size={20} />
        </button>
      </div>

      {/* image name */}
      <div className="mt-8">
        <NameCard chat={chat} placedIn={"rightSidebar"} />
      </div>

      {/* contact info */}
      <div className="space-y-4 mt-12">
        <h3 className={contactStyle}>
          <span>
            <BsTelephone size={20} />
          </span>
          <span>
            {chat?.creator?.phone}{" "}
            <span className="block text-sm opacity-80">Phone</span>
          </span>
        </h3>
        <h3 className={`${contactStyle} text-wrap`}>
          <span>
            <IoMailOpenOutline size={20} />
          </span>
          <span>
            <span>{chat?.creator?.email}</span>
            <span className="block text-sm opacity-80">Email</span>
          </span>
        </h3>
        <h3 className={contactStyle}>
          <span>
            <BsBell size={20} />
          </span>
          <span className="flex justify-between w-full">
            <span>Notification</span>{" "}
            <span className="flex items-end">
              <input
                type="checkbox"
                className="toggle toggle-sm border-blue-500 bg-blue-500  hover:bg-blue-700"
                defaultChecked
              />
            </span>
          </span>
        </h3>
      </div>

      {/* media and link tab */}
      <div className="mt-4 ">
        <h2
          className="flex gap-12 items-center text-center justify-between border-b  text-lg font-semibold border-gray-300 
        "
        >
          {["Media", "Links"].map((tab) => (
            <button
              key={tab}
              onClick={() => setProfileTab(tab.toLowerCase())}
              className={`text-center flex-grow  py-2 ${
                tab.toLowerCase() === profileTab.toLowerCase()
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-black border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </h2>
      </div>
    </div>
  );
};

export default UserInfo;
