import React from "react";
import "../css/chatbot.css";

function Sent(props) {
  return (
    <div className="row msg_container base_sent">
      <div className="col-lg">
        <div className="messages_chatbot msg_sent_chatbot">
          <p>{props.query}</p>
          <time datetime={props.time}>{props.time}</time>
        </div>
      </div>
    </div>
  );
}
export default Sent;
