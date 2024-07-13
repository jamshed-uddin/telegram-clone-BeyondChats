import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ChatsList = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = async () => {
      const allChats = await axios.get(
        "https://devapi.beyondchats.com/api/get_all_chats?page=1"
      );

      console.log(allChats?.data?.data.data);
      setChats(allChats?.data?.data.data);
    };

    loadChats();
  }, []);

  return (
    <div>
      {chats?.map((chat) => (
        <div className="border border-black py-4" key={chat.id}>
          <Link to={`/chat/${chat.created_by}/${chat.id}`}>
            <div>{chat.creator.name || "Deleted Account"}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChatsList;
