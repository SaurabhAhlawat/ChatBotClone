/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import ReactBottomsheet from "react-bottomsheet";
import "../css/chatbot.css"

function DownButton(props) {
  const [src, setSrc] = useState("/images/arrowUp.png")
  return (
    <a className="jcb_downButton" onClick={props.onClick}>
      <img
        className="jcb_down_button"
        src={props.visible ? "/images/arrowDown.png" : "/images/arrowUp.png"}
        alt="jcb_down_button"
      />
    </a>
  );
}

export default DownButton;
