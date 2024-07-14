import { Link } from "react-router-dom";

const ChatsList = ({ chats }) => {
  return (
    <div className="h-max">
      {chats?.map((chat) => (
        <div className="border border-black py-4" key={chat?.id}>
          <Link to={`/chat/${chat?.created_by}/${chat?.id}`}>
            <div>{chat?.creator?.name || "Deleted Account"}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
