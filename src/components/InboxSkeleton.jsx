import React from "react";

const InboxSkeleton = () => {
  return (
    <div className="w-full mt-3">
      <div className="chat chat-end ">
        <span className="chat-bubble bg-gray-100 skeleton w-full"></span>
      </div>
      <div className="chat chat-start ">
        <span className="chat-bubble bg-gray-100 skeleton w-full"></span>
      </div>
      <div className="chat chat-end ">
        <span className="chat-bubble bg-gray-100 skeleton w-full"></span>
      </div>
    </div>
  );
};

export default InboxSkeleton;
