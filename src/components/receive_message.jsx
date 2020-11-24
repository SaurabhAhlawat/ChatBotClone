import React from "react";
import "../css/chatbot.css";
import Linkify from "react-linkify";

function receive(props) {
  return (
    <div className="row msg_container base_receive">
      <div className="aa">
        <div className="messages_chatbot msg_receive_chatbot">
          <p>
            <Linkify>{props.query}</Linkify>
          </p>
          <time datetime="2009-11-13T20:00">{props.time}</time>
        </div>
      </div>
    </div>
  );
}
export default receive;
