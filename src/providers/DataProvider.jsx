import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);
const pinnedMessagesKey = "pinnedMessages";
const themeKey = "theme";
const DataProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

  // pinnedMessage state
  const [pinnedMessages, setPinnedMessage] = useState(() => {
    const existingMessage = localStorage.getItem(pinnedMessagesKey);

    return existingMessage ? JSON.parse(existingMessage) : [];
  });

  // theme state
  const [theme, setTheme] = useState(
    localStorage.getItem(themeKey) ? localStorage.getItem(themeKey) : "light"
  );

  const [chatsLoading, setChatsLoading] = useState(false);

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

  // useEffect for setting pinned message to localstorage
  useEffect(() => {
    localStorage.setItem(pinnedMessagesKey, JSON.stringify(pinnedMessages));
  }, [pinnedMessages]);

  // update dark/light mode to localStorage
  useEffect(() => {
    localStorage.setItem(themeKey, theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // get pinned message of specific chat
  const getPinnedMessage = ({ chatId, messages }) => {
    const chatsPinnedMessage = pinnedMessages.find(
      (pin) => pin.chatId == chatId
    );

    if (chatsPinnedMessage) {
      const message = messages?.find(
        (message) => message.id == chatsPinnedMessage.messageId
      );
      return message;
    }
  };

  // pin a message
  const pinMessage = ({ chatId, messageId }) => {
    setPinnedMessage((prev) => {
      const existingMessageId = prev.findIndex(
        (pin) => pin.chatId == chatId && pin.messageId == messageId
      );

      if (existingMessageId != 1) {
        const updatedMessages = [...prev];

        updatedMessages.at(existingMessageId).messageId = messageId;
        return updatedMessages;
      } else {
        return [...prev, { messageId, chatId }];
      }
    });
  };

  // unpin message
  const unpinMessage = (chatId) => {
    setPinnedMessage((prev) => prev.filter((pin) => pin.chatId != chatId));
  };

  // get single chat data
  const getSingleChat = (chatId) => {
    const singleChat = chats?.find((chat) => chat.id == chatId);

    return singleChat;
  };

  console.log(theme);

  const value = {
    chats,
    getSingleChat,
    getPinnedMessage,
    pinMessage,
    unpinMessage,
    dark: theme === "dark",
    toggleTheme,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
