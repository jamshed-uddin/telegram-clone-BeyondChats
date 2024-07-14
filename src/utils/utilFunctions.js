export const isOwnMessage = (chatCreator, message) => {
  return message?.sender_id === 1;
};

export const isUsersLastMessage = (message, index, messages) => {
  return message?.sender_id != messages?.at(index + 1)?.sender_id;
};

export const messageTime = (messageDate) => {
  const time = new Date(messageDate);

  const clockTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return clockTime.startsWith("0") ? clockTime.slice(1) : clockTime;
};

const isToday = (messageDate) => {
  const currentDate = new Date();

  return (
    currentDate.getFullYear() === messageDate.getFullYear() &&
    currentDate.getMonth() === messageDate.getMonth() &&
    currentDate.getDate() === messageDate.getDate()
  );
};
const isYesterday = (messageDate) => {
  const currentDate = new Date();

  const yesterday =
    currentDate.getFullYear() === messageDate.getFullYear() &&
    currentDate.getMonth() === messageDate.getMonth() &&
    currentDate.getDate() - 1 === messageDate.getDate();

  return yesterday;
};

const isCurrentYear = (messageDate) => {
  const currentDate = new Date();

  return currentDate.getFullYear() === messageDate.getFullYear();
};

export const chatDate = (messageDateRaw) => {
  const messageDate = new Date(messageDateRaw);

  const clockTime = messageDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  if (isToday(messageDate)) {
    return clockTime.startsWith("0") ? clockTime.slice(1) : clockTime;
  } else if (isYesterday(messageDate)) {
    return "YesterDay";
  } else if (isCurrentYear(messageDate)) {
    const day = messageDate.getDate();
    const month = messageDate.toLocaleString("default", { month: "long" });
    return `${month} ${day}`;
  } else {
    const day = messageDate.getDate();
    const month = messageDate.toLocaleString("default", { month: "long" });
    const year = messageDate.getFullYear();

    return `${month} ${day}, ${year}`;
  }
};

export const messageDate = (rawDate) => {
  const date = new Date(rawDate);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return chatDate(date);
};

export const generateAvatarColor = (userId) => {
  const colors = [
    "#66CCCC",
    "#669933",
    "#FFCC00",
    "#339966",
    "#9966CC",
    "#FF9900",
    "#336699",
    "#FF6666",
    "#CCCC66",
  ];

  const index = userId % colors.length;
  return colors[index];
};
