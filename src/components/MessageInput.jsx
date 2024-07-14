import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { GoPaperclip } from "react-icons/go";
import { SlEmotsmile } from "react-icons/sl";

const MessageInput = () => {
  const [messageText, setMessageText] = useState("");
  const textAreaRef = useRef(null);

  useEffect(() => {
    // for giving the message textarea a certain height
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [messageText]);

  return (
    <div className=" mb-4 w-full chat chat-end flex items-end">
      <div className="bg-white flex gap-2 items-end w-full  chat-bubble">
        <div className="opacity-70 mb-1.5">
          <SlEmotsmile size={20} color="black" />
        </div>
        <div className="flex-grow flex items-end ">
          <textarea
            ref={textAreaRef}
            type="text"
            className={`input  p-1  w-full max-h-64 overflow-hidden focus:outline-0 focus:border-0 resize-none text-black `}
            value={messageText}
            rows={1}
            placeholder="Message"
            onChange={(e) => setMessageText(e.target.value)}
          />
        </div>
        <div className="opacity-70 mb-1.5">
          <GoPaperclip size={20} color="black" />
        </div>
      </div>
      <div className="bg-[#2086EA] p-3 rounded-full">
        {messageText ? (
          <span>
            <PiPaperPlaneRightFill color="#fff" size={25} />
          </span>
        ) : (
          <span>
            {" "}
            <FaMicrophone color="#fff" size={25} />
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
