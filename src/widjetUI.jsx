import React from "react";
import {Widget} from "react-chat-widget";
import logo from "./logo.svg";

const WidgetUI = ({getCustomLauncher, handleNewUserMessage}) => {

    return (
        <div className="App">
            <Widget launcher={handleToggle => getCustomLauncher(handleToggle)}
                    handleNewUserMessage={handleNewUserMessage}
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
}
export default WidgetUI;
