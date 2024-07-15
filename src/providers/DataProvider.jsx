import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);
const pinnedMessagesKey = "pinnedMessages";
const themeKey = "theme";
const DataProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [profileInfoOpened, setProfileInfoOpened] = useState(false);
  const [openInbox, setOpenInbox] = useState(false);
  // pinnedMessage state
  const [pinnedMessages, setPinnedMessages] = useState(() => {
    const existingMessage = localStorage.getItem(pinnedMessagesKey);

    return existingMessage ? JSON.parse(existingMessage) : [];
  });

  // theme state
  const [theme, setTheme] = useState(
    localStorage.getItem(themeKey) ? localStorage.getItem(themeKey) : "light"
  );

  const [chatsLoading, setChatsLoading] = useState(false);
  const [chatsError, setChatsError] = useState("");

  useEffect(() => {
    const loadChats = async () => {
      try {
        setChatsLoading(true);
        const result = await axios.get(
          "https://devapi.beyondchats.com/api/get_all_chats?page=1"
        );

        const allChats = result?.data?.data.data;
        //There is no latestMessage field in the chat object. fetched messages of each chat and set the last message to the created latestMessage field.It's neccessary to sort chats based on latestMessage and last message time.
        const updatedChats = await Promise.all(
          allChats?.map(async (chat) => {
            const { data } = await axios.get(
              `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chat?.id}`
            );
            const messagesResult = data?.data;
            console.log(messagesResult);
            const latestMessage =
              messagesResult?.length > 0 ? messagesResult?.at(-1) : null;

            return {
              ...chat,
              latestMessage,
            };
          })
        );

        setChats(updatedChats);
        setChatsLoading(false);
        // setChats(allChats);
      } catch (error) {
        setChatsLoading(false);
        setChatsError("Something went wrong!");
      }
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

  const pinMessage = ({ chatId, messageId }) => {
    setPinnedMessages((prevMessages) => {
      const existingMessageIndex = prevMessages.findIndex(
        (message) => message.chatId === chatId
      );
      if (existingMessageIndex !== -1) {
        const updatedMessages = [...prevMessages];
        updatedMessages[existingMessageIndex].messageId = messageId;
        return updatedMessages;
      } else {
        return [...prevMessages, { chatId, messageId }];
      }
    });
  };

  const unpinMessage = (chatId) => {
    setPinnedMessages((prevMessages) =>
      prevMessages.filter((message) => message.chatId !== chatId)
    );
  };

  const isPinned = (messageId) => {
    const pinned = pinnedMessages?.find((pin) => pin.messageId === messageId);

    return pinned ? true : false;
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
    chatsError,
    chatsLoading,
    pinnedMessages,
    pinMessage,
    unpinMessage,
    isPinned,
    dark: theme === "dark",
    toggleTheme,
    profileInfoOpened,
    setProfileInfoOpened,
    openInbox,
    setOpenInbox,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
