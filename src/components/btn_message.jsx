import React from "react";
import "../css/chatbot.css";

function Button(props) {
  return (
    <>
      <div className="btn_mess">
        <a style={{ color: "black", cursor: "pointer" }} onClick={props.click}>{props.query}</a>
      </div>
    </>
  );
}

export default Button;
