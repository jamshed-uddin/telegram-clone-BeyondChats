import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isOwnMessage } from "../utils/utilFunctions";

import Messages from "./Messages";
import MessageInput from "./MessageInput";
import InboxHeader from "./InboxHeader";
import useData from "../hooks/useData";

const Inbox = () => {
  const { chatCreator, id } = useParams();
  const { getSingleChat } = useData();
  const [messages, setMessages] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      const allMessages = await axios.get(
        `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`
      );

      setMessages(allMessages?.data?.data);
    };

    loadMessages();
  }, [id]);

  const singleChat = getSingleChat(id);

  console.log(singleChat);

  return (
    <div className="w-full h-full relative flex flex-col ">
      <div className="bg-gradient-to-br from-[#8DBA86] via-[#CDD58E] to-[#71A888] absolute inset-0 -z-20"></div>

      {/* inbox header */}
      <div>
        <InboxHeader setOpenInfo={setOpenInfo} creator={singleChat?.creator} />
      </div>

      {/* messages */}
      <div className="flex flex-grow   overflow-y-auto hide-scrollbar h-full">
        <div className="  px-2 lg:px-0  lg:w-[60%] mx-auto ">
          <div className="">
            <Messages messages={messages} />
          </div>
        </div>

        <div
          className={`sticky top-0 right-0 transition-all duration-300 overflow-hidden bg-white ${
            openInfo ? "w-64" : "w-0"
          }`}
        >
          info
        </div>
      </div>

      {/* message input */}
      <div
        className={`    w-full lg:w-[60%] ${
          openInfo
            ? "ml-8  transition-all duration-300"
            : "mx-auto  transition-all duration-300"
        }`}
      >
        <MessageInput />
      </div>
    </div>
  );
};

export default Inbox;
