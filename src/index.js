import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import Chat from "./components/ChatWindow";
import "./css/chatbot.css";

// ReactDom.render(<App />, document.getElementById("root"));

ReactDom.render(
    <Chat
        active={true}
        closeChatbot={() => {}}
        url="https://abwm.vitt.ai/"
        cookieKey="sessionid"
    />,
    document.getElementById("root")
);
