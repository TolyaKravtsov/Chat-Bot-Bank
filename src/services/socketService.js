class SocketService {
  constructor(chatId) {
    this.chatId = chatId;
    this.socket = new WebSocket(
      "wss://javascript.info/article/websocket/demo/hello"
    );
  }

  sendMessage(message) {
    //TODO attach chatId to message payload if needed. Discuss with Anton
    this.socket.send(message);
  }

  listenToMessage(callback) {
    this.socket.onmessage = (event) => {
      callback(event.data);
    };
  }
}

export default SocketService;
