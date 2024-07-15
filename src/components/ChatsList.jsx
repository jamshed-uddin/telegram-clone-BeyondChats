import { Link } from "react-router-dom";

import NameCard from "./NameCard";
import ChatsListSkeleton from "./ChatsListSkeleton";

const ChatsList = ({ chats, chatsLoading, chatsError }) => {
  if (chatsLoading) {
    return <ChatsListSkeleton />;
  }

  if (chatsError) {
    return <div className="text-sm text-center">Something went wrong!</div>;
  }

  return (
    <div className="h-max">
      {chats?.map((chat) => (
        <div className="pb-3 lg:pb-4 " key={chat?.id}>
          <Link to={`/chat/${chat?.created_by}/${chat?.id}`}>
            <NameCard placedIn={"chatsList"} chat={chat} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
