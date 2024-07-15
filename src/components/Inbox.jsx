import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Messages from "./Messages";
import MessageInput from "./MessageInput";
import InboxHeader from "./InboxHeader";
import useData from "../hooks/useData";
import InboxSkeleton from "./InboxSkeleton";

const Inbox = () => {
  const { chatCreator, id } = useParams();
  const {
    getSingleChat,
    profileInfoOpened,
    setProfileInfoOpened,
    pinnedMessages,
    dark,
  } = useData();
  const [messages, setMessages] = useState([]);
  const [pinnedMessage, setPinnedMessage] = useState({});
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessageError] = useState("");
  const messageRef = useRef({});
  const messageContainerRef = useRef(null);
  const singleChat = getSingleChat(id);

  // fetch messages
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setMessagesLoading(true);
        setMessageError("");
        const allMessages = await axios.get(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`
        );

        setMessages(allMessages?.data?.data);
        setMessagesLoading(false);
      } catch (error) {
        setMessageError("Something went wrong!");
        setMessagesLoading(false);
      }
    };

    loadMessages();
  }, [id]);

  useEffect(() => {
    const chatsPinnedMessage = pinnedMessages?.find((pin) => pin.chatId == id);

    const pinned = messages?.find(
      (message) => message?.id == chatsPinnedMessage?.messageId
    );

    setPinnedMessage(pinned);
  }, [id, messages, pinnedMessages]);

  useEffect(() => {
    const containerRef = messageContainerRef.current;

    if (containerRef) {
      containerRef.scrollTop = containerRef.scrollHeight;
    }
  });

  return (
    <div className="w-full h-full relative flex flex-col ">
      <div
        className={`${
          dark
            ? "bg-gray-900"
            : "bg-gradient-to-br from-[#8DBA86] via-[#CDD58E] to-[#71A888]"
        } absolute inset-0 -z-20`}
      ></div>

      {/* inbox header */}
      <div>
        <InboxHeader
          setOpenInfo={setProfileInfoOpened}
          chat={singleChat}
          pinnedMessage={pinnedMessage}
          pinnedMessageRef={messageRef}
        />
      </div>

      {/* messages */}
      <div
        ref={messageContainerRef}
        className="flex flex-grow   overflow-y-auto hide-scrollbar h-full w-full px-1"
      >
        <div className="  px-2 lg:px-0 w-full lg:max-w-[30rem]  mx-auto  ">
          <div className="w-full">
            {messagesLoading ? (
              <InboxSkeleton />
            ) : messagesError ? (
              <div>
                <h4 className="text-center">{messagesError}</h4>
              </div>
            ) : (
              <Messages messages={messages} messagesRef={messageRef} />
            )}
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
        <MessageInput setMessages={setMessages} />
      </div>
    </div>
  );
};

export default Inbox;
