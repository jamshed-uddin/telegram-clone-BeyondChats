import React from "react";
import { FaGhost } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center text-xl ">
      <div className="flex flex-col items-center">
        <span>
          <FaGhost size={30} />
        </span>
        <h4>404 | Not found</h4>
      </div>
    </div>
  );
};

export default NotFoundPage;
