import { PiShareFat } from "react-icons/pi";
import { LuBellOff } from "react-icons/lu";
import { BsTelephone } from "react-icons/bs";
import { PiVideoCamera } from "react-icons/pi";
import { IoGiftOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import useData from "../hooks/useData";

const menuItems = [
  { item: "Mute", icon: LuBellOff },
  { item: "Call", icon: BsTelephone },
  { item: "Video call", icon: PiVideoCamera },
  { item: "Share contect", icon: PiShareFat },
  { item: "Gift premium", icon: IoGiftOutline },
  { item: "Block user", icon: FiLock },
  { item: "Delete chat", icon: AiOutlineDelete },
];

const RightSideChatOptions = () => {
  const { dark } = useData();

  const buttonStyle = `flex items-center gap-6  font-semiboldw-full pr-7 rounded-lg  transition-all duration-100 px-2 font-medium  ${
    dark ? "hover:bg-gray-800" : "hover:bg-gray-50"
  }`;
  return (
    <div
      className={`px-4 py-3 rounded-xl flex flex-col space-y-2 ${
        dark ? "bg-gray-900 text-white " : " bg-gray-100"
      }`}
    >
      {menuItems.map((item) => (
        <button key={item.item} className={buttonStyle}>
          <span>
            <item.icon
              size={20}
              color={`${item.item === "Delete chat" && "red"}`}
            />
          </span>
          <span className={`${item.item === "Delete chat" && "text-red-500"}`}>
            {item.item}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RightSideChatOptions;
