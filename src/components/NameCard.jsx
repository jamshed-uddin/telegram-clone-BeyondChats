import { chatDate, generateAvatarColor } from "../utils/utilFunctions";
import { FaGhost } from "react-icons/fa";
import useData from "../hooks/useData";

const NameCard = ({ placedIn, chat }) => {
  const { profileInfoOpened, setProfileInfoOpened } = useData();
  console.log(chat);
  return (
    <div
      className={`flex items-center py-0.5  ${
        placedIn === "rightSidebar" ? "flex-col" : "flex-row"
      }  ${placedIn === "chatsList" ? "gap-3" : "gap-3 lg:gap-5"}   `}
    >
      {/* avatar */}
      <div>
        <div
          onClick={() =>
            placedIn === "inboxHeader" && setProfileInfoOpened((p) => !p)
          }
          className={`${placedIn === "chatsList" && "w-14 h-14"} ${
            placedIn === "inboxHeader" && "w-11 h-11"
          } ${
            placedIn === "rightSidebar" && "w-24 h-24 text-5xl"
          }  rounded-full cursor-pointer flex items-center justify-center text-2xl font-semibold text-white`}
          style={
            !chat?.creator?.photo_url && {
              backgroundColor: generateAvatarColor(chat?.creator?.id),
            }
          }
        >
          {chat?.creator?.photo_url ? (
            <img src="w-full h-full object-cover rounded-full" alt="" />
          ) : chat?.creator?.name ? (
            chat?.creator?.name?.slice(0, 1)?.toUpperCase()
          ) : (
            <span>
              {" "}
              <FaGhost color="white" />
            </span>
          )}
        </div>
      </div>

      {/* name and last message(placedIn: chatslist) */}
      <div className="flex-grow">
        <h3
          className={`font-semibold flex justify-between items-start w-full ${
            placedIn === "inboxHeader" && profileInfoOpened && "lg:hidden "
          }`}
        >
          <span className={`${placedIn === "rightSidebar" && "text-2xl"}`}>
            {chat
              ? chat?.creator?.name
                ? chat?.creator?.name
                : "Deleted Account"
              : ""}
          </span>
          {placedIn === "chatsList" && (
            <span className="text-xs font-normal">
              {chatDate(chat?.latestMessage?.created_at)}
            </span>
          )}
        </h3>
        {placedIn === "chatsList" && (
          <h4 className="opacity-80">
            {chat?.latestMessage?.message &&
            chat?.latestMessage?.message.length > 40
              ? `${chat?.latestMessage?.message?.slice(0, 40)}...`
              : chat?.latestMessage?.message}
          </h4>
        )}
      </div>
    </div>
  );
};

export default NameCard;
