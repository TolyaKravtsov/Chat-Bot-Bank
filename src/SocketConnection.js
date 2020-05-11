import React, {useEffect} from 'react';
import {addResponseMessage, addUserMessage} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import './App.css'
import WidgetUI from "./widjetUI";

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
    };

    const generateChatID = () => {
        const id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
        localStorage.setItem('chatID', id);
        socket.send(id);
    }

    const getCustomLauncher = (handleToggle) =>
        <button onClick={() => {
            handleToggle();
            let chatID = localStorage.getItem('chatID');
            chatID ? socket.send(chatID) : generateChatID()
        }}>This is my launcher component!
        </button>

    return (
        <WidgetUI getCustomLauncher={getCustomLauncher}
                  handleNewUserMessage={handleNewUserMessage}
        />
    );
};

export default SocketConnection;
