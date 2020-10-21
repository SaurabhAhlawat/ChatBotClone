import React, { useState, useRef, useEffect } from "react";
import Send from "./Sent_message";
import Receive from "./receive_message";
import Input from "./Input_message";
import Button from "./Send_btn";
import Axios from "axios";
import "../css/chatbot.css";
import ButtonMessage from "./btn_message";
import Cookies from "js-cookie";
import DownButton from "./DownButton";
import ReactBottomsheet from "react-bottomsheet";
import { LoaderDots } from '@thumbtack/thumbprint-react';

function ChatWindow(props) {
  const [cookieData, setCookieData] = useState(-1);

  const [value, setValue] = useState([]);
  const [buttonValue, setButtonValue] = useState([]);
  const [newsValue, setnewsValue] = useState([]);
  const [loader,setLoader]=useState(-1);
  const [down_button_data, set_down_button_data] = useState([]);

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
      session: cookieData,
      query: event,
      type: "sent",
      time: startTime(),
      count: value.length,
    };
    // console.log(event);
    setButtonValue([]);
    set_down_button_data([]);
    isClicked(true);
  }

  /*Mapping Text(speech) messages values which are in value array */

  var receives = value.map((m, i) => {
    // console.log(typeof "kk");
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
    session: cookieData,
    query: "",
    type: "sent",
    time: startTime(),
    count: value.length,
  };

  /**when we write something on input field, event function will change the value constantly */
  function submitForm(event) {
    temp = {
      session: cookieData,
      query: event,
      type: "sent",
      time: startTime(),
      count: value.length,
    };

    // console.log({});
  }

  /*API CALL for first GoodMorning messages when user open the chat! */
  useEffect(() => {
    console.log(temp);

    const user = Cookies.get(props.cookieKey);
    console.log("cookie : ");
    console.log(user);
    console.log(
      "if cookie is undefined means no cookie found, else we found cookie : " +
        user
    );
    if (user) {
      //we have cookie

      // var sessionCookie = {
      //   sessionid: user,
      // };
      console.log("we found cookie");
      // const test = { rest: { ph: 121212, em: "anan@" } };

      // const test2 = {
      //   ll: "Asa",
      //   mc: { ...test.rest },
      // };
      // console.log(test2);
      console.log(temp)
      setCookieData(user);
          temp = {
            session: cookieData,
            query: "hi!",
            type: "sent",
            time: startTime(),
            count: value.length,
          };
          console.log("session of temp: ")
          console.log(temp.session)
          Axios.post(props.url, temp)
            .then((success) => {
              console.log("now: fetching data from abcl.vitt.ai");
              //sp is for text messages array. we are storing it.
              //btn is for button UI messages array. we are storing it.
              var sp = [];
              var btn = [];

              /**UP Arrow */

              var trial = [];
              success.data.result.fulfillment.data.DownButton.GenerativeQuestion.map(
                (m, i) => {
                  // console.log(i);
                  if (trial.length < 10) trial.push(m);
                }
              );
              set_down_button_data([].concat(trial));
              /** */

              success.data.result.fulfillment.messages.map((m) => {
                console.log(m);
                // console.log("type: " + m.type + " speec: " + m.speech);
                if (m.type === 0 && m.speech !== "") {
                  m.speech.map((mm) => {
                    var inital_message = {
                      session: cookieData,
                      query: mm,
                      type: "receive",
                      time: startTime(),
                      count: value.length,
                    };
                    sp.push(inital_message);
                  });
                } else if (m.type === 2) {
                  m.replies.map((mm) => {
                    var inital_message = {
                      session: cookieData,
                      query: mm,
                      type: "button",
                      time: startTime(),
                      count: value.length,
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

              console.log("some error in fetching data from abcl.vitt.ai : ");
              console.log(error);
            });


      // console.log(sessionCookie);
      // Axios.post(props.cookieUrl, sessionCookie)
      //   .then((success) => {
      //     console.log(
      //       "in success of cookie-fetching-api for fetching user info from cookie"
      //     );
      //     //Found cookie
          
      //   })
      //   .catch((error) => {
      //     console.log("if cookie-fetching-api crashes or any error like : ");
      //     console.log(error);
      //   });
    } else {
      console.log("no cookies found");
      temp = {
        session: cookieData,
        query: "hi!",
        type: "sent",
        time: startTime(),
        count: value.length,
      };
      console.log(temp)
      
      console.log("session of temp: ")
      console.log(temp.session)
      Axios.post(props.url, temp)
        .then((success) => {
          console.log("now: fetching data from abcl.vitt.ai");
          //sp is for text messages array. we are storing it.
          //btn is for button UI messages array. we are storing it.
          var sp = [];
          var btn = [];

          /**UP Arrow */

          var trial = [];
          success.data.result.fulfillment.data.DownButton.GenerativeQuestion.map(
            (m, i) => {
              // console.log(i);
              if (trial.length < 10) trial.push(m);
            }
          );
          set_down_button_data([].concat(trial));
          /** */

          success.data.result.fulfillment.messages.map((m) => {
            console.log(m);
            // console.log("type: " + m.type + " speec: " + m.speech);
            if (m.type === 0 && m.speech !== "") {
              m.speech.map((mm) => {
                var inital_message = {
                  session: cookieData,
                  query: mm,
                  type: "receive",
                  time: startTime(),
                  count: value.length,
                };
                sp.push(inital_message);
              });
            } else if (m.type === 2) {
              m.replies.map((mm) => {
                var inital_message = {
                  session: cookieData,
                  query: mm,
                  type: "button",
                  time: startTime(),
                  count: value.length,
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

          console.log("some error in fetching data from abcl.vitt.ai : ");
          console.log(error);
        });
    }

    // console.log(temp);
  }, []);

  /*After clicking on send either by pressing enter or by pressing send button*/

  function isClicked(bool) {
    setLoader(1);
    
    setValue([...value,temp]);
    setBottomSheet({ bottomSheet: false });
    var count = 1;
    console.log("isClicked: request: ");
    console.log(temp);
    if (
      temp.query.toString().trim() === undefined ||
      temp.query.toString().trim() === null ||
      temp.query.toString().trim() === ""
    ) {
      console.log(
        "isClicked: query is blank, please enter something in textarea"
      );
      setLoader(-1);
    } else {
      // console.log(temp);
      console.log("isClicked: query is not blank");
      Axios.post(props.url, temp)
        .then((success) => {
          // console.log("printed");
          //type==0 for text
          var sp = [];
          //type==2 for button message
          var btn = [];
          //type==1 for news
          var news = [];
          console.log(
            "isClicked: inside success of abcl.vitt.ai fetching api "
          );
          /**UP Arrow */
          var trial = [];
          success.data.result.fulfillment.data.DownButton.GenerativeQuestion.map(
            (m, i) => {
              // console.log(i);

              console.log("isClicked: inside Generative Question array");
              if (trial.length < 10) trial.push(m);
            }
          );
          set_down_button_data([].concat(trial));
          /** */

          success.data.result.fulfillment.messages.map((m) => {
            // console.log("type: " + m.type + " speec: " + m.speech);

            console.log("isClicked: inside messages array");
            if (m.type === 0 && m.speech !== "") {
              m.speech.map((mm) => {
                var inital_message = {
                  session: cookieData,
                  query: mm,
                  type: "receive",
                  time: startTime(),
                  count: value.length,
                };
                sp.push(inital_message);
              });
            } else if (m.type === 2) {
              m.replies.map((mm) => {
                var inital_message = {
                  session: cookieData,
                  query: mm,
                  type: "button",
                  time: startTime(),
                  count: value.length,
                };
                // console.log("replies: " + mm);
                btn.push(inital_message);
              });
            } else if (m.type == 1) {
            }
          });
          // console.log(btn);
          // console.log(sp);

          setValue([...value,temp].concat(sp));
          setButtonValue([].concat(btn));
          setLoader(-1);
        })
        .catch((error) => {
          console.log(
            "isClicked: catch of abcl.vitt.ai fetching api and error is: " +
              error
          );
          /**If we get 500 Internal error. then we will show this query. */
          var inital_message = {
            session: cookieData,
            query: "Oops! please Enter something related Finance!",
            type: "receive",
            time: startTime(),
            count: value.length,
          };
          setValue([...value,temp, inital_message]);
          setLoader(-1);
          // console.log(error);
        });

      //console.log(value);
    }
    //console.log(value);
    count++;
    document.getElementById("my_form").reset();
  }

  /**Bottom sheet logic */
  const [sheet, setBottomSheet] = useState({ bottomSheet: false });

  const bottomsheetonClick = () => {
    var obj = sheet.bottomSheet
      ? { bottomSheet: false }
      : { bottomSheet: true };
    setBottomSheet(obj);
  };
  var downbuttons = down_button_data.map((m, i) => {
    return (
      <button
        className="bottom-sheet-item"
        onClick={() => {
          onclick(m);
          bottomsheetonClick();
        }}
      >
        {m}
      </button>
    );
  });

  /*Scroll to Bottom Easy UI*/
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [value, buttonValue]);

  //when user press enter from keyboard the text gets submitted
  const onEnterPressKeyBoard = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      isClicked(true);
    }
  };

  /**Return Type */
  http: return (
    <div
      className="chat-window "
      id="chatBot-id"
      style={{  display: props.active ? "block" : "none" }}
    >
      <div >
        <div className="panel-default">
          <div className="panel-heading top-bar">
            <div >
              
              <div style={{color:"white",fontSize:"15px",float:"left"}}>Aditya Birla Finance Limited</div>
              {/* <img className="icon-heading-chatBot" src="https://c3india.s3.ap-south-1.amazonaws.com/public_assets/data/000/000/344/original/BirlaCapitalLogo_jpeg?1538291690" /> */}
              <div  style={{textAlign: "right"}}>
                <img style={{cursor:"pointer"}} class="close-icon-heading-chatbot" onClick={(m)=>{m.preventDefault();props.closeChatbot()}}  src="/images/remove.png"/>
              </div>
            </div>
          </div>
          <div className="panel-body msg_container_base">
            {receives}
            <div className="row msg_container ">
              <div class="btn_messs">{recievesButton}</div>
              <div style={{padding:"10px" ,float:"right"}}>{loader!=-1?<LoaderDots size="small" theme="muted" />:null}</div>
            </div>
            
            <div ref={messagesEndRef} />
          </div>
          {/**Bottom sheet implementation */}
          <ReactBottomsheet
              className="custom-layout"
              visible={sheet.bottomSheet}
              onClose={bottomsheetonClick}
              appendCancelBtn={false}
            >
              <div>{downbuttons}</div>
            </ReactBottomsheet>
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
                <DownButton onClick={bottomsheetonClick} />
                <Input
                  change={submitForm}
                  onEnterPress={onEnterPressKeyBoard}
                />
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
