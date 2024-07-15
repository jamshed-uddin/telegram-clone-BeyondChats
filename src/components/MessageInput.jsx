import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { GoPaperclip } from "react-icons/go";
import { SlEmotsmile } from "react-icons/sl";
import useData from "../hooks/useData";
import { useLocation } from "react-router-dom";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const textAreaRef = useRef(null);
  const { dark } = useData();
  const { pathname } = useLocation();

  useEffect(() => {
    // for giving the message textarea a certain height
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [messageText]);

  const sendMessageHandler = () => {
    if (!messageText) return;
    const message = {
      id: Math.random() * 1000,
      chat_id: pathname?.split("/").at(3),
      creator: {
        id: 1,
        name: "BeyondChat",
      },
      sender_id: 1,
      message: messageText,
      created_at: Date.now(),
    };

    setMessages((prev) => [...prev, message]);
    setMessageText("");
  };

  return (
    <div className="px-1 lg:mb-4 w-full chat chat-end flex items-end">
      <div
        className={` flex gap-2 items-end w-full  chat-bubble ${
          dark ? "bg-gray-900 text-white" : "bg-white"
        }`}
      >
        <div className="opacity-70 mb-1.5">
          <SlEmotsmile size={20} color={dark ? "white" : "black"} />
        </div>
        <div className="flex-grow flex items-end ">
          <textarea
            ref={textAreaRef}
            type="text"
            className={`input  p-1  w-full max-h-64 overflow-hidden focus:outline-0 focus:border-0 resize-none ${
              dark ? "text-white" : "text-black"
            } `}
            value={messageText}
            rows={1}
            placeholder="Message"
            onChange={(e) => setMessageText(e.target.value)}
          />
        </div>
        <div className="opacity-70 mb-1.5">
          <GoPaperclip size={20} color={dark ? "white" : "black"} />
        </div>
      </div>
      <div
        className={`${dark ? "secondary-bg" : "primary-bg"} p-3 rounded-full`}
      >
        {messageText ? (
          <span className="cursor-pointer" onClick={sendMessageHandler}>
            <PiPaperPlaneRightFill color="#fff" size={25} />
          </span>
        ) : (
          <span className="cursor-pointer">
            {" "}
            <FaMicrophone color="#fff" size={25} />
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
