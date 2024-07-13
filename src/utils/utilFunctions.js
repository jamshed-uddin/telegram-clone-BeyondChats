export const isOwnMessage = (chatCreator, message) => {
  return chatCreator != message?.sender_id;
};

export const isUsersLastMessage = (message, index, messages) => {
  return message?.sender_id !== messages?.at(index + 1)?.sender_id;
};
