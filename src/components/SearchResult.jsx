import React, { useState } from "react";
import { Link } from "react-router-dom";

const allTabs = [
  { id: 1, name: "Chats" },
  { id: 2, name: "Media" },
  { id: 3, name: "Links" },
  { id: 4, name: "Files" },
  { id: 5, name: "Music" },
  { id: 6, name: "Voice" },
];

const SearchResult = ({ chats }) => {
  const [tab, setTab] = useState("chats");

  return (
    <div>
      {/* tabs */}
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-8 flex-nowrap text-lg font-semibold border-b border-b-gray-300">
          {allTabs?.map((singleTab) => (
            <div
              className={`py-2 cursor-pointer  ${
                tab === singleTab.name.toLowerCase()
                  ? "text-blue-600 border-b-2 border-b-blue-600"
                  : "border-b-2 border-b-transparent"
              }`}
              onClick={() => setTab(singleTab.name.toLowerCase())}
              key={singleTab.id}
            >
              {singleTab.name}
            </div>
          ))}
        </div>
      </div>

      {/* search result */}

      <div className="h-max">
        {chats?.map((chat) => (
          <div className="border border-black py-4" key={chat?.id}>
            <Link to={`/chat/${chat?.created_by}/${chat?.id}`}>
              <div>{chat?.creator?.name || "Deleted Account"}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
