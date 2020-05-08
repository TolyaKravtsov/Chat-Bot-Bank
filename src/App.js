import React, {useEffect} from 'react';
import {Widget, addResponseMessage} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from './logo.svg';
import './App.css'


function App() {
    let message = localStorage.getItem('message');

    useEffect(() => {
        addResponseMessage("Привет, Артём!");
        addResponseMessage(message);
    }, []);

    const handleNewUserMessage = (newMessage) => {
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
                localStorage.setItem('message', newMessage);
            });
    };

    return (
        <div className="App">
            <Widget handleNewUserMessage={handleNewUserMessage}
                    title="Русский язык"
                    subtitle="Везде"
                    profileAvatar={logo}
                    senderPlaceHolder='Введите в меня текст'
                    showTimeStamp
                    autofocus
                    launcherOpenLabel
                    launcherCloseLabel

            />
        </div>
    );
}

export default App;
