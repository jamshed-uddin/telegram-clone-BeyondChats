import React from "react";
import ChatsList from "./ChatsList";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import SearchResult from "./SearchResult";
import useData from "../hooks/useData";

const ChatsBar = () => {
  const { chats } = useData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex items-center gap-6 mb-3 sticky top-2 right-0 left-0 bg-white shadow-sm px-5 pb-2">
        <button>
          {isSearchOpen ? (
            <span onClick={() => setIsSearchOpen(false)}>
              <HiOutlineArrowLeft size={20} />
            </span>
          ) : (
            <span>
              <FiMenu size={20} />
            </span>
          )}
        </button>
        <div className="flex-grow">
          <input
            type="text"
            className="input h-10 input-bordered focus:border-2 focus:border-blue-500 focus:outline-0 w-full text-lg rounded-3xl transition-all duration-150 "
            onFocus={() => setIsSearchOpen(true)}
          />
        </div>
      </div>
      <div className="flex-grow px-5 ">
        {isSearchOpen ? <SearchResult /> : <ChatsList chats={chats} />}
      </div>
    </div>
  );
};

export default ChatsBar;
