import React from "react";
import "../css/chatbot.css";

function Input(props) {
  function changes(event) {
    props.change(event.target.value);
  }

  return (
    <input
      id="btn-input"
      type="text"
      className="form-control chat_input"
      placeholder="Write your message here..."
      onChange={changes}
    />
  );
}
export default Input;
