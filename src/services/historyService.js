const key = "_history";
const empty = {
  messages: [],
};

function _saveMessage(message, isBot) {
  const hist = JSON.parse(localStorage.getItem(key));
  hist.messages.push({ message, isBot });
  localStorage.setItem(key, JSON.stringify(hist));
}

class HistoryService {
  constructor() {
    const hist = localStorage.getItem(key);
    if (!hist) {
      localStorage.setItem(key, JSON.stringify(empty));
    }
  }

  restoreHistory() {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return [];
    }
  }

  saveUserMessage(message) {
    _saveMessage(message, false);
  }

  saveBotMessage(message) {
    _saveMessage(message, true);
  }
}

export default HistoryService;
