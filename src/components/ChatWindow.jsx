import React, { useState, useRef, useEffect } from "react";
import Send from "./Sent_message";
import Receive from "./receive_message";
import Input from "./Input_message";
import Button from "./Send_btn";
import Axios from "axios";
import "../css/chatbot.css";
import qs from "qs";
import ButtonMessage from "./btn_message";

function ChatWindow(props) {
  const [value, setValue] = useState([]);
  const [buttonValue, setButtonValue] = useState([]);

  /**will return Current Time */
  const startTime = () => {
    var dt = new Date();
    var h = dt.getHours(),
      m = dt.getMinutes();
    var time;

    if (h === 12) {
      time = h + ":" + (m < 10 ? "0" + m : m) + " PM";
    } else {
      time =
        h > 12
          ? (h - 12 < 10 ? "0" + (h - 12) : h - 12) +
            ":" +
            (m < 10 ? "0" + m : m) +
            " PM"
          : (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + " AM";
    }

    return time;
  };

  /** when user presses any message UI button*/
  function onclick(event) {
    temp = {
      sessionid: "yolo",
      query: event,
      type: "sent",
      time: startTime(),
    };
    // console.log(event);
    setButtonValue([]);
    isClicked(true);
  }

  /*Mapping Text(speech) messages values which are in value array */

  var receives = value.map((m, i) => {
    if (m.query !== "") {
      if (m.type == "receive") {
        return <Receive key={i} query={m.query} time={m.time} />;
      } else if (m.type == "sent") {
        return <Send key={i} query={m.query} time={m.time} />;
      }
    } else {
      return null;
    }
  });

  /*Mapping ButtonUI(replies) messages values which are in buttonValue array */
  var recievesButton = buttonValue.map((m, i) => {
    if (m.type == "button") {
      return (
        <ButtonMessage
          key={i}
          query={m.query}
          click={() => {
            onclick(m.query);
          }}
        />
      );
    }
  });

  /*OnChange in Input  function to get the value from input*/
  var temp = {
    sessionid: "yolo",
    query: "",
    type: "sent",
    time: startTime(),
  };

  /**when we write something on input field, event function will change the value constantly */
  function submitForm(event) {
    temp = {
      sessionid: "yolo",
      query: event,
      type: "sent",
      time: startTime(),
    };

    //console.log(event);
  }

  /*API CALL for first GoodMorning messages when user open the chat! */
  useEffect(() => {
    // console.log(temp);
    temp = {
      sessionid: "yolo",
      query: "hi!",
      type: "sent",
      time: startTime(),
    };
    Axios.post("https://ABCL.vitt.ai/", temp)
      .then((success) => {
        //sp is for text messages array. we are storing it.
        //btn is for button UI messages array. we are storing it.
        var sp = [];
        var btn = [];
        success.data.result.fulfillment.messages.map((m) => {
          // console.log("type: " + m.type + " speec: " + m.speech);
          if (m.type === 0 && m.speech !== "") {
            m.speech.map((mm) => {
              var inital_message = {
                sessionid: "yolo",
                query: mm,
                type: "receive",
                time: startTime(),
              };
              sp.push(inital_message);
            });
          } else if (m.type === 2) {
            m.replies.map((mm) => {
              var inital_message = {
                sessionid: "yolo",
                query: mm,
                type: "button",
                time: startTime(),
              };
              // console.log("replies: " + mm);
              btn.push(inital_message);
            });
          }
        });
        // console.log(btn);
        // console.log(sp);
        setValue([...value].concat(sp));
        setButtonValue([].concat(btn));
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  /*After clicking on send either by pressing enter or by pressing send button*/

  function isClicked(bool) {
    var count = 1;
    // console.log(bool);
    if (
      temp.query.toString().trim() === undefined ||
      temp.query.toString().trim() === null ||
      temp.query.toString().trim() === ""
    ) {
    } else {
      //console.log(temp);

      Axios.post("https://ABCL.vitt.ai/", temp)
        .then((success) => {
          var sp = [];
          var btn = [];
          success.data.result.fulfillment.messages.map((m) => {
            // console.log("type: " + m.type + " speec: " + m.speech);
            if (m.type === 0 && m.speech !== "") {
              m.speech.map((mm) => {
                var inital_message = {
                  sessionid: "yolo",
                  query: mm,
                  type: "receive",
                  time: startTime(),
                };
                sp.push(inital_message);
              });
            } else if (m.type === 2) {
              m.replies.map((mm) => {
                var inital_message = {
                  sessionid: "yolo",
                  query: mm,
                  type: "button",
                  time: startTime(),
                };
                // console.log("replies: " + mm);
                btn.push(inital_message);
              });
            }
          });
          // console.log(btn);
          // console.log(sp);

          setValue([...value, temp].concat(sp));
          setButtonValue([].concat(btn));
        })
        .catch((error) => {
          /**If we get 500 Internal error. then we will show this query. */
          var inital_message = {
            sessionid: "yolo",
            query: "Oops! please Enter something related Finance!",
            type: "receive",
            time: startTime(),
          };
          setValue([...value, temp, inital_message]);

          // console.log(error);
        });

      //console.log(value);
    }
    //console.log(value);
    count++;
    document.getElementById("my_form").reset();
  }

  /*Scroll to Bottom Easy UI*/
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [value, buttonValue]);

  /**Return Type */
  http: return (
    <div
      className="row chat-window "
      id="chatBot-id"
      style={{ marginLeft: "120px;", display: props.active ? "block" : "none" }}
    >
      <div className="col-md">
        <div className="panel panel-default">
          <div className="panel-heading top-bar">
            <div className="col-md">
              <img className="icon-heading-chatBot" src="images/V1.png" />
            </div>
          </div>
          <div className="panel-body msg_container_base">
            {receives}
            <div className="row msg_container ">
              <div class="btn_messs">{recievesButton}</div>
            </div>
            <div ref={messagesEndRef} />
          </div>
          <div className="panel-footer">
            <div className="input-group">
              <form
                autoComplete="off"
                id="my_form"
                onSubmit={(m) => {
                  m.preventDefault();
                  isClicked(true);
                }}
              >
                <Input change={submitForm} />
                <Button
                  click={() => {
                    isClicked(true);
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatWindow;
