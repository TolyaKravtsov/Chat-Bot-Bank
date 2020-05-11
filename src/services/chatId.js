module.exports = () => {
  let chatId = localStorage.getItem("chatId");
  if (!chatId) {
    chatId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    localStorage.setItem("chatId", chatId);
  }
  return chatId;
};
