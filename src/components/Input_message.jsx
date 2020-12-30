import React, { useState, useEffect } from "react";
import "../css/chatbot.css";
import axios from "axios";
import { MentionsInput, Mention } from "react-mentions"

function Input(props) {
  const [textAreaInput, setTextAreaInput] = useState("");
  // const [value, setValue] = useState({ query: "" });
  const [lists, setList] = useState([]);


  function changes(event) {
    props.change(event.target.value);
    // console.log(event.target.value);
    setTextAreaInput(event.target.value)
    if (event.target.value.indexOf("@") != -1) {
      // console.log(event.target.value.substring(event.target.value.indexOf("@") + 1, event.target.value.length));
      handleResult(event.target.value.substring(event.target.value.indexOf("@") + 1, event.target.value.length));
    }

  }

  useEffect(() => {
    setTextAreaInput("")
  }, [props.textBoolean])

  var CancelToken = axios.CancelToken;
  var cancel;
  var datas;

  function handleResult(value) {
    var tempList = []
    if (cancel !== undefined) {
      cancel();
    }

    datas = {
      size: 200,
      query: {
        multi_match: {
          query: value,
          fields: ["name", "category"],
          type: "phrase_prefix"
        },
      },
    };
    axios({
      method: "post",
      url:
        "https://search-finresearch-nee4bx22xxffjggmbpbr4y27ye.ap-south-1.es.amazonaws.com/mfsearch/_search",
      data: datas,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
    })
      .then((response) => {
        // console.log(response.data.hits.hits);
        // setList(response.data.hits.hits);
        response.data.hits.hits.map((e, q) => {
          console.log(e);
          tempList.push({ id: q, display: e._source.name })
        })
        setList([].concat(tempList))
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const onEnterPressKeyBoard = (e) => {
    if (e.key === 'Enter') {
			setTimeout(() => {

			setTextAreaInput("");
			}, 250);
			props.onEnterPress(e)
			e.preventDefault();
    }
  };

  // var users = [
  //   {
  //     id: "user_id",
  //     display: "A"
  //   }, {
  //     id: "user_id",
  //     display: "A"
  //   }, {
  //     id: "user_id",
  //     display: "A"
  //   }, {
  //     id: "user_id",
  //     display: "A"
  //   }, {
  //     id: "user_id",
  //     display: "A"
  //   }, {
  //     id: "user_id",
  //     display: "A"
  //   }, {
  //     id: "user_id",
  //     display: "A"
  //   }, {
  //     id: "user_id",
  //     display: "A B C"
  //   }, {
  //     id: "user_id",
  //     display: "A"
  //   },

  // ]

  return (
    <MentionsInput
      id="chatbot_btn-input"
      type="text"
      allowSpaceInQuery="true"
      value={textAreaInput}
      className="chatbot_comments-textarea"
      placeholder="Type something... or use @ to search a mutual fund"
      onKeyDown={(e) => { onEnterPressKeyBoard(e); }}
      onChange={changes}>

      <Mention
        markup="__display__."
        trigger="@"
        data={lists}
        />
    </MentionsInput>
    // <textarea
    //   id="btn-input"
    //   type="text"
    //   className="form-control chat_input"
    //   placeholder="Type a message..."
    //   onChange={changes}
    //   onKeyDown={props.onEnterPress}
    // />
  );
}
export default Input;
