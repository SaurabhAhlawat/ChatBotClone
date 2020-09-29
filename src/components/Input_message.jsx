import React from "react";
import "../css/chatbot.css";

function Input(props) {
  function changes(event) {
    props.change(event.target.value);
  }

  return (
    <textarea
      id="btn-input"
      type="text"
      className="form-control chat_input"
      placeholder="Type something... or use @ for search"
      onChange={changes}
      onKeyDown={props.onEnterPress}
    />
  );
}
export default Input;
