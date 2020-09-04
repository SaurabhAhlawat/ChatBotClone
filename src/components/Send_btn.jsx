import React from "react";
import "../css/chatbot.css";

function Button(props) {
  return (
    <a className="myButton" onClick={props.click} type="Submit">
      <img
        className="send_image"
        src="/images/send16x16.png"
        alt="send_buton"
      />
    </a>
  );
}

export default Button;
