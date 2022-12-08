import React from "react";
import "../css/chatbot.css";

function Button(props) {
  return (
    <>
      <div className="jcb_btn_mess">
        {props.newTabUrl ? 
          <a style={{ color: "black", cursor: "pointer" }} href={props.newTabUrl} target="_blank" rel="noopener noreferrer">{props.query}</a>
          :
          <a style={{ color: "black", cursor: "pointer" }} onClick={props.click}>{props.query}</a>
        }
      </div>
    </>
  );
}

export default Button;
