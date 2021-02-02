/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import ReactBottomsheet from "react-bottomsheet";
import "../css/chatbot.css"

function DownButton(props) {
  const [src, setSrc] = useState("/images/arrowUp.png")
  return (
    <a className="downButton" onClick={props.onClick}>
      <img
        className="down_button"
        src={props.visible ? "/images/arrowDown.png" : "/images/arrowUp.png"}
        alt="down_button"
      />
    </a>
  );
}

export default DownButton;
