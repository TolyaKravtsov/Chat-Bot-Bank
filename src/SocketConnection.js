import React, {useEffect} from 'react';
import {addResponseMessage, addUserMessage} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import './App.css'
import WidgetUI from "./widjetUI";
import {generateChatID} from "./common/generateChatID";

let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");


const SocketConnection = () => {
    let chatHistory = {
        messages: [],
    };
    useEffect(() => {
        addResponseMessage("Добро пожаловать");
        let MessagesString = localStorage.getItem('message');
        let MessagesObject = JSON.parse(MessagesString);
        if (MessagesString) {
            MessagesObject.messages.map((element) => {
                return element.isBot ? addResponseMessage(element.message) : addUserMessage(element.message);
            })
        }
    }, []);

    const handleNewUserMessage = (newMessage) => {
        chatHistory.messages.push({message: newMessage, isBot: 0});
        localStorage.setItem('message', JSON.stringify(chatHistory));
        console.log(`New message incoming! ${newMessage}`);
        socket.onmessage = event => {
            addResponseMessage(event.data);
        };
    };

    const getCustomLauncher = (handleToggle) =>
        <button onClick={() => {
            handleToggle();
            let chatID = localStorage.getItem('chatID');
            chatID ? socket.send(chatID) : generateChatID().then(socket.send(chatID));
        }}>Custom launcher
        </button>

    return (
        <WidgetUI getCustomLauncher={getCustomLauncher}
                  handleNewUserMessage={handleNewUserMessage}
        />
    );
};

export default SocketConnection;
