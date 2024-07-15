import React from "react";
import ChatsList from "./ChatsList";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FiMenu } from "react-icons/fi";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { LuPencil } from "react-icons/lu";

import SearchResult from "./SearchResult";
import useData from "../hooks/useData";
import LeftSideMenu from "./LeftSideMenu";

const ChatsBar = () => {
  const {
    chats,
    chatsLoading,
    chatsError,
    dark,
    leftMenuOpened,
    setLeftMenuOpened,
  } = useData();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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
    setMobileSearchOpen(false);
    setSearchQuery("");
    setSearchResult([]);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* left side menu 3/4 width in mobile / floating menu in desktom */}

      {/* menu button and searchbar */}
      <div
        className={`flex items-center gap-5 lg:mb-3 sticky top-0 right-0 left-0  shadow-sm px-4 lg:px-6 py-2 z-20  ${
          dark ? "bg-gray-900" : "bg-white"
        }`}
      >
        <span className="flex items-center gap-3">
          {isSearchOpen || mobileSearchOpen ? (
            <button onClick={navigateBack}>
              <HiOutlineArrowLeft size={20} />
            </button>
          ) : (
            <button onClick={() => setLeftMenuOpened((p) => !p)}>
              <FiMenu size={20} />
            </button>
          )}
          <span
            className={`${
              mobileSearchOpen && "hidden"
            } lg:hidden text-lg font-semibold`}
          >
            Telegram
          </span>
        </span>
        <div
          onFocus={() => setFocused(true)}
          tabIndex={0}
          className={`flex items-center  flex-grow gap-2 px-4 lg:transition-all lg:duration-150 rounded-3xl overflow-hidden ${
            mobileSearchOpen ? "visible lg:invisible" : "invisible lg:visible"
          } ${focused ? "border border-blue-500" : "border border-gray-400 "}`}
        >
          <button>
            <HiMiniMagnifyingGlass
              size={20}
              color={focused ? "#3b82f6" : "#9ca3af"}
            />
          </button>
          <input
            type="text"
            className="input h-10 focus:border-0 focus:outline-0 w-full text-lg  px-0"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
          />
        </div>

        {/* mobile search opener */}
        <button
          onClick={() => setMobileSearchOpen(true)}
          className=" opacity-90 lg:hidden  block"
        >
          <HiMiniMagnifyingGlass size={25} />
        </button>
      </div>

      <div className="flex-grow px-2">
        {isSearchOpen || mobileSearchOpen ? (
          <SearchResult chats={searchResult} />
        ) : (
          <ChatsList
            chats={chats}
            chatsLoading={chatsLoading}
            chatsError={chatsError}
          />
        )}
      </div>
    </div>
  );
};

export default ChatsBar;
