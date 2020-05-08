import React, {useEffect} from 'react';
import {Widget, addResponseMessage, addUserMessage} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from './logo.svg';
import './App.css'


const App = () => {
    let chatHistory = {
        messages: [],
    };
    useEffect(() => {
        addResponseMessage("Добро пожаловать");
        let MessagesString = localStorage.getItem('message');
        let MessagesObject = JSON.parse(MessagesString);
        MessagesObject.messages.map((element) => {
            return element.isBot ? addResponseMessage(element.message) : addUserMessage(element.message);
        })
    }, []);

    const handleNewUserMessage = (newMessage) => {
        chatHistory.messages.push({message: newMessage, isBot: 0});
        localStorage.setItem('message', JSON.stringify(chatHistory));
        console.log(`New message incoming! ${newMessage}`);
        fetch("https://172.16.6.253:1000/api/text/messages/full", {
            method: "POST",
            headers: {
                Authorization: 'Bearer c4ca4238a0b923820dcc509a6f75849b',
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                chatId: '1',
                message: newMessage
            })
        })
            .then(async response => {
                const respJson = await response.json();
                addResponseMessage(respJson.response.text);
                chatHistory.messages.push({message: respJson.response.text, isBot: 1});
            });
    };

    return (
        <div className="App">
            <Widget handleNewUserMessage={handleNewUserMessage}
                    title="Банковский чат-бот"
                    subtitle="Здесь вы можете узнать любую информацию"
                    profileAvatar={logo}
                    senderPlaceHolder='Введите текст'
                    showTimeStamp
                    autofocus
                    launcherOpenLabel
                    launcherCloseLabel

            />
        </div>
    );
};

export default App;
