import React, { useState } from "react";
import { messageTime } from "../utils/utilFunctions";
import { BsReply } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { VscPinnedDirty } from "react-icons/vsc";
import { TbPinnedOff } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import ContextMenu from "./ContextMenu";
import useData from "../hooks/useData";

const MessageCard = ({ message }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pinMessage, isPinned, unpinMessage } = useData();

  const handleContextMenu = (e) => {
    e.preventDefault();
    console.log("hello");
    setMenuOpen(true);
  };

  const openMenuByClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setMenuOpen(true);
    }
  };

  const handlePinUnpin = () => {
    if (isPinned(message.id)) {
      setMenuOpen(false);
      return unpinMessage(message.chat_id);
    } else {
      setMenuOpen(false);
      return pinMessage({
        chatId: message?.chat_id,
        messageId: message?.id,
      });
    }
  };

  const buttonStyle =
    "flex items-center gap-6  font-semiboldw-full pr-7 rounded-lg hover:bg-gray-200 transition-all duration-100 px-2 font-medium";
  return (
    <div
      onClick={openMenuByClick}
      onContextMenu={handleContextMenu}
      className=" rounded-xl relative p-0.5"
    >
      <div>
        <ContextMenu
          top={5}
          bottom={0}
          right={6}
          left={5}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        >
          <div className=" px-4 py-3 rounded-xl flex flex-col space-y-2 bg-gray-100">
            <button className={buttonStyle}>
              <span>
                <BsReply size={20} />
              </span>{" "}
              <span>Reply</span>
            </button>
            <button className={buttonStyle}>
              <span>
                <IoCopyOutline size={20} />
              </span>{" "}
              <span>Copy</span>
            </button>
            <button onClick={handlePinUnpin} className={buttonStyle}>
              {isPinned(message.id) ? (
                <>
                  <span>
                    <VscPinnedDirty size={20} />
                  </span>
                  <span>Unpin</span>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <span>
                    <VscPinnedDirty size={20} />
                  </span>
                  <span>Pin</span>
                </>
              )}
            </button>
            <button className={buttonStyle}>
              <span>
                <AiOutlineDelete size={20} />
              </span>
              <span>Delete</span>
            </button>
          </div>
        </ContextMenu>
      </div>

      <h5 className="rounded-xl overflow-hidden text-wrap">
        {message.message}
      </h5>
      <h6 className="text-xs text-end ml-7 mr-1 leading-3">
        {messageTime(message.created_at)}
      </h6>
    </div>
  );
};

export default MessageCard;
