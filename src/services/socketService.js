import {addResponseMessage} from "react-chat-widget";

class SocketService {
  constructor(chatId) {
    this.chatId = chatId;
    this.socket = new WebSocket(
      "ws://172.16.6.253:19001?token=383ce66f9cae40bfb7b759b63a636e15"
    );

    this.socket.onopen = () =>{
      addResponseMessage('соединение установлено');
    }
  }

  sendMessage(message) {
      let objectMessage = {
          "chatId": this.chatId,
          "message": message,
      }
    //TODO attach chatId to message payload if needed. Discuss with Anton
    this.socket.send(JSON.stringify(objectMessage));
  }

  listenToMessage(callback) {
    this.socket.onmessage = (event) => {
      callback(event.data);
    };
  }
}

export default SocketService;
