class SocketService {
  constructor(chatId) {
    this.chatId = chatId;
    this.socket = new WebSocket(
      "ws://172.16.6.253:19001?token=383ce66f9cae40bfb7b759b63a636e15"
    );
  }

  sendMessage(message) {
    //TODO attach chatId to message payload if needed. Discuss with Anton
    this.socket.send({
        "chatId": this.chatId,
        "message": message,
    });
  }

  listenToMessage(callback) {
    this.socket.onmessage = (event) => {
      callback(event.data);
    };
  }
}

export default SocketService;
