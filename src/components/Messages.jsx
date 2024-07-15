import { useEffect, useState } from "react";
import {
  isOwnMessage,
  isUsersLastMessage,
  messageDate,
  messageTime,
} from "../utils/utilFunctions";
import MessageCard from "./MessageCard";

const Messages = ({ messages, chatCreator }) => {
  const [messageGroup, setMessageGroup] = useState({});

  useEffect(() => {
    const messageDate = (messageDate) =>
      new Date(messageDate).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

    const group = messages?.reduce((acc, message) => {
      if (acc[messageDate(message.created_at)]) {
        acc[messageDate(message.created_at)]?.push(message);
      } else {
        acc[messageDate(message.created_at)] = [message];
      }

      return acc;
    }, {});

    setMessageGroup(group);
  }, [messages]);

  return (
    <div className="space-y-1.5 h-max w-full ">
      {Object.keys(messageGroup).map((date) => (
        <div key={date}>
          <div className="flex justify-center sticky top-1 left-0 right-0 z-20">
            <h3
              className={`w-fit  rounded-2xl px-3 py-[0.20rem]  mb-1 bg-black bg-opacity-20 text-white font-semibold`}
            >
              {messageDate(date)}
            </h3>
          </div>

          {messages?.map((message, index, messages) => (
            <div
              className={` flex chat ${
                isOwnMessage(chatCreator, message)
                  ? isUsersLastMessage(message, index, messages)
                    ? "chat-end"
                    : ""
                  : isUsersLastMessage(message, index, messages)
                  ? "chat-start"
                  : ""
              }`}
              key={message.id}
            >
              <div
                className={`text-wrap leading-6 p-1 text-black chat-bubble ${
                  isOwnMessage(chatCreator, message)
                    ? isUsersLastMessage(message, index, messages)
                      ? "ml-auto  bg-[#E3FEE0]"
                      : "ml-auto bg-[#E3FEE0] rounded-xl "
                    : isUsersLastMessage(message, index, messages)
                    ? "mr-auto bg-white"
                    : "mr-auto bg-white rounded-xl "
                }`}
              >
                <MessageCard message={message} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Messages;
