import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isOwnMessage, isUsersLastMessage } from "../utils/utilFunctions";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { SlMagnifier } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";

const Inbox = () => {
  const { chatCreator, id } = useParams();

  const [messages, setMessages] = useState([]);
  const [openInfo, setOpenInfo] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      const allMessages = await axios.get(
        `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`
      );

      console.log(allMessages?.data?.data);
      setMessages(allMessages?.data?.data);
    };

    loadMessages();
  }, [id]);

  console.log(isOwnMessage(chatCreator, messages.at(1)));

  return (
    <div className="w-full h-full">
      <div className="py-1.5 px-4 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-5 ">
          <div
            onClick={() => setOpenInfo((p) => !p)}
            className="w-11 h-11 rounded-full bg-green-300 cursor-pointer"
          ></div>
          <h1 className="font-semibold text-lg">User name</h1>
        </div>
        <div className="flex items-center gap-8">
          <span className="cursor-pointer">
            <BsTelephone size={20} />
          </span>
          <span className="cursor-pointer">
            <SlMagnifier size={20} />
          </span>
          <span className="cursor-pointer">
            <IoEllipsisVerticalSharp size={20} />
          </span>
        </div>
      </div>
      <div className="flex h-[calc(100%-4rem)] bg-gradient-to-br from-[#8DBA86] via-[#CDD58E] to-[#71A888]">
        <div className="overflow-y-auto h-full px-2 lg:px-0  lg:w-2/3 mx-auto">
          <div className="space-y-1.5 h-max ">
            {messages?.map((message, index, messages) => (
              <div className={` flex w-full `} key={message.id}>
                <div
                  className={` leading-6 p-1  ${
                    isOwnMessage(chatCreator, message)
                      ? isUsersLastMessage(message, index, messages)
                        ? "ml-4  bg-[#E3FEE0] rounded-tl-xl rounded-tr-xl rounded-bl-xl"
                        : "ml-4 bg-[#E3FEE0] rounded-xl "
                      : isUsersLastMessage(message, index, messages)
                      ? "mr-4 bg-white rounded-tl-xl rounded-tr-xl rounded-br-xl"
                      : "mr-4 bg-white rounded-xl "
                  }`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={` transition-all duration-300 overflow-hidden bg-white ${
            openInfo ? "w-64" : "w-0"
          }`}
        >
          info
        </div>
      </div>
      <div>
        <h1>send message</h1>
      </div>
    </div>
  );
};

export default Inbox;
