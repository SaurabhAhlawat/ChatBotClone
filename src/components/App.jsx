import React, { useState } from "react";
import Chat from "./ChatWindow";
import "../css/chatbot.css";

function App() {
  const [item, setitem] = useState({
    isActive: false,
    icon: "/images/Fab64x64.png",
  });
  function handleClick() {
    item.isActive
      ? setitem({ isActive: false, icon: "/images/Fab64x64.png" })
      : setitem({ isActive: true, icon: "/images/hide64x64.png" });
  }
  return (
    <>
      <Chat
        active={item.isActive}
        url="https://ABCL.vitt.ai/"
        cookieKey="sessionid"
        cookieUrl="https://s9ea1dscpk.execute-api.ap-south-1.amazonaws.com/UAT/getUserData/"
      />
      <a onClick={handleClick} class="fab-icon-a">
        <img src={item.icon} alt="Chat_facility" class="fab-img" />
      </a>
    </>
  );
}

export default App;
