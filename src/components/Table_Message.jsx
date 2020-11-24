import React, { Component } from "react";
import "../css/chatbot.css";

function Table_Message(props) {

  var details = props.query;
  var heading = details.entries.headings.map((m, i) => {
    return (<th className="chatbot_table_ui_th">
      {m}
    </th>);
  });
  var rows = details.entries.values.map((m, i) => {
    return (
      <tr className="chatbot_table_ui_tr">
        {details.entries.values[i].map((p, q) => {
          return (
            <td className="chatbot_table_ui_th">
              {p.hyperlink != null ?
                <a style={{ cursor: "pointer", color: "black", textDecoration: "underline" }} onClick={() => { props.tableClick(p.hyperlink) }}>
                  {p.value}
                </a> :
                p.value
              }
            </td>);
        })}
      </tr>



    );
  });
  return (
    <div className="row msg_container base_receive">
      <div className="aa">
        <div className="messages_chatbot chatbot_table_ui">
          <div style={{ color: "black" }}>{details.entries.title}</div>
          <table>
            <thead>
              <tr className="chatbot_table_ui_tr">
                {heading}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default Table_Message;
