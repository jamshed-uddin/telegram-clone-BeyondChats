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
  const {
    getSingleChat,
    profileInfoOpened,
    setProfileInfoOpened,
    getPinnedMessage,
  } = useData();
  const [messages, setMessages] = useState([]);
  const [pinnedMessage, setPinnedMessage] = useState({});

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

  useEffect(() => {
    const pinnedMessage = getPinnedMessage({ id, messages });

    setPinnedMessage(pinnedMessage);
  }, [getPinnedMessage, id, messages]);

  console.log(pinnedMessage);
  return (
    <div className="w-full h-full relative flex flex-col ">
      <div className="bg-gradient-to-br from-[#8DBA86] via-[#CDD58E] to-[#71A888] absolute inset-0 -z-20"></div>

      {/* inbox header */}
      <div>
        <InboxHeader setOpenInfo={setProfileInfoOpened} chat={singleChat} />
      </div>

      {/* messages */}
      <div className="flex flex-grow   overflow-y-auto hide-scrollbar h-full w-full px-1">
        <div className="  px-2 lg:px-0 w-full lg:max-w-[30rem]  mx-auto  ">
          <div className="w-full">
            <Messages messages={messages} />
          </div>
        </div>
      </div>

      {/* message input */}
      <div
        className={`    w-full lg:max-w-[30rem]  mx-auto ${
          profileInfoOpened
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
