import React, { useState, useEffect } from "react";
import Chat from "./ChatWindow";
import "../css/chatbot.css";

function App() {
  const [item, setitem] = useState({
    isActive: false,
    icon: "/images/Fab64x64.png",
  });
  const [notification, setNotification] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log('This will run after 4 second!')
      setNotification(true)
    }, 4000);
    return () => clearTimeout(timer);
  }, [])

  function handleClick() {
    item.isActive
      ? setitem({ isActive: false, icon: "/images/Fab64x64.png" })
      : setitem({ isActive: true, icon: "-1" });
  }
  function closeChatbot(){
    setitem({ isActive: false, icon: "/images/Fab64x64.png" })
  }
  return (
    <>
      {notification ? <div class="fab-icon-a-welcome-notification">Hi! Do you need some help?</div> : null}
      <Chat
        active={item.isActive}
        closeChatbot={closeChatbot}
        url="https://ABWM.vitt.ai/"
        cookieKey="sessionid"
      />
      {item.icon==="-1"?null:
        <a onClick={(m) => { m.preventDefault(); handleClick(); setNotification(false) }} class="fab-icon-a">
        <img src={item.icon} alt="Chat_facility" class="fab-img" />
      </a>}
    </>
  );
}

export default App;
