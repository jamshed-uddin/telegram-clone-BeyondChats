import React from "react";
import useData from "../hooks/useData";

const InboxHome = () => {
  const { dark } = useData();

  return (
    <div
      className={`w-full h-full ${
        dark
          ? "bg-gray-900"
          : "bg-gradient-to-br from-[#8DBA86] via-[#CDD58E] to-[#71A888]"
      }`}
    ></div>
  );
};

export default InboxHome;
