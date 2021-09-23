import React from "react";
import "../css/chatbot.css";

function Button(props) {
  return (
    <a className="jcb_myButton" onClick={props.click} type="Submit">
      <img
        className="jcb_send_image"
        src="/images/arrow-right.png"
        alt="send_buton"
      />
    </a>
  );
}

export default Button;
