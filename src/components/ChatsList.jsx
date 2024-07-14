import { Link } from "react-router-dom";
import { generateAvatarColor } from "../utils/utilFunctions";
import NameCard from "./NameCard";

const ChatsList = ({ chats }) => {
  return (
    <div className="h-max">
      {chats?.map((chat) => (
        <div className=" pb-4 " key={chat?.id}>
          <Link to={`/chat/${chat?.created_by}/${chat?.id}`}>
            <NameCard placedIn={"chatsList"} chat={chat} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
