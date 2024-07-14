import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [chats, setChats] = useState([]);

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
  console.log(chats);
  const getSingleChat = (chatId) => {
    const singleChat = chats?.find((chat) => chat.id == chatId);

    return singleChat;
  };

  const value = { chats, getSingleChat };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataProvider;
