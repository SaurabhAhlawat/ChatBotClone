import React from "react";
import "../css/chatbot.css";
import Linkify from "react-linkify";

function receive(props) {

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target="_blank" style={{ "color": "#3e593c" }}>
      {text}
    </a>
  );

  return (
    <div className="row msg_container base_receive">
      <div className="aa">
        <div className="messages_chatbot msg_receive_chatbot">
          <p>
            <Linkify componentDecorator={componentDecorator} >{props.query}</Linkify>
          </p>  
          <time datetime={props.time}>{props.time}</time>
        </div>
      </div>
    </div>
  );
}
export default receive;
