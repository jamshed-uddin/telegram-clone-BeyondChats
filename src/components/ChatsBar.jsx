import React from "react";
import ChatsList from "./ChatsList";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import SearchResult from "./SearchResult";
import useData from "../hooks/useData";

const ChatsBar = () => {
  const { chats } = useData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!searchQuery) {
      setSearchResult([]);
      return;
    }
    const result = chats?.filter((chat) =>
      chat.creator?.name
        ?.toLowerCase()
        .trim()
        .includes(searchQuery?.toLowerCase().trim())
    );

    setSearchResult(result);
  }, [chats, searchQuery]);

  const navigateBack = () => {
    setFocused(false);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResult([]);
  };

  console.log(searchResult);
  console.log(searchQuery);

  return (
    <div className="flex flex-col h-full relative border-r border-r-gray-300">
      <div className="flex items-center gap-5 mb-3 sticky top-0 right-0 left-0 bg-white shadow-sm px-6 py-2">
        <button>
          {isSearchOpen ? (
            <span onClick={navigateBack}>
              <HiOutlineArrowLeft size={20} />
            </span>
          ) : (
            <span>
              <FiMenu size={20} />
            </span>
          )}
        </button>
        <div
          onFocus={() => setFocused(true)}
          tabIndex={0}
          className={`flex items-center  flex-grow gap-2 px-4 transition-all duration-150 rounded-3xl overflow-hidden ${
            focused ? "border-2 border-blue-500" : "border border-gray-400 "
          }`}
        >
          <span>
            <HiMiniMagnifyingGlass
              size={20}
              color={focused ? "#3b82f6" : "#9ca3af"}
            />
          </span>
          <input
            type="text"
            className="input h-10 focus:border-0 focus:outline-0 w-full text-lg  px-0"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
          />
        </div>
      </div>
      <div className="flex-grow px-4 ">
        {isSearchOpen ? (
          <SearchResult chats={searchResult} />
        ) : (
          <ChatsList chats={chats} />
        )}
      </div>
    </div>
  );
};

export default ChatsBar;
