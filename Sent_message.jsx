import React from "react";
import "../css/chatbot.css";

function Sent(props) {
  return (
    <div className="row jcb_msg_container jcb_base_sent">
      <div className="aa">
        <div className="jcb_messages_chatbot jcb_msg_sent_chatbot">
          <p>{props.query}</p>
          <time dateTime={props.time}>{props.time}</time>
        </div>
      </div>
    </div>
  );
}
export default Sent;
