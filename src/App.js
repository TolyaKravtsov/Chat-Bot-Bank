import React, { useEffect } from "react";
import { Widget, addResponseMessage, addUserMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from "./logo.svg";

import SocketService from "./services/socketService";
import initChatId from "./services/chatId";
import HistoryService from "./services/historyService";

const socketService = new SocketService(initChatId());
const historyService = new HistoryService();

socketService.listenToMessage((message) => {
  historyService.saveBotMessage(message);
  addResponseMessage(message);
});

function handleNewUserMessage(message) {
  historyService.saveUserMessage(message);
  socketService.sendMessage(message);
}

const App = () => {
  useEffect(() => {
    const { messages } = historyService.restoreHistory();
    messages.forEach((message) => {
      return message.isBot
        ? addResponseMessage(message.message)
        : addUserMessage(message.message);
    });
  }, []);

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Банковский чат-бот"
      subtitle="Здесь вы можете узнать любую информацию"
      profileAvatar={logo}
      senderPlaceHolder="Введите текст"
      showTimeStamp
      autofocus
    />
  );
};
export default App;
