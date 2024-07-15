import { Link, useLocation } from "react-router-dom";

import NameCard from "./NameCard";
import ChatsListSkeleton from "./ChatsListSkeleton";
import useData from "../hooks/useData";

const ChatsList = ({ chats, chatsLoading, chatsError }) => {
  const { pathname } = useLocation();
  const currentChatInInbox = pathname?.split("/").at(3);
  const { dark } = useData();
  if (chatsLoading) {
    return <ChatsListSkeleton />;
  }

  if (chatsError) {
    return <div className="text-sm text-center">Something went wrong!</div>;
  }

  return (
    <div className="h-max">
      {chats?.map((chat) => (
        <div
          className={`py-1 lg:py-2  lg:px-4 rounded-xl  ${
            currentChatInInbox == chat?.id
              ? dark
                ? "secondary-bg text-white"
                : "primary-bg text-white"
              : dark
              ? " bg-gray-900 text-white"
              : "bg-white text-balck"
          }`}
          key={chat?.id}
        >
          <Link to={`/chat/${chat?.created_by}/${chat?.id}`}>
            <NameCard placedIn={"chatsList"} chat={chat} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
