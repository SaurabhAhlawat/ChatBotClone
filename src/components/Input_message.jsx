import React, { useState, useEffect } from "react";
import "../css/chatbot.css";
import axios from "axios";
import { MentionsInput, Mention } from "react-mentions"
import { Height } from "@material-ui/icons";

function Input(props) {
	const [textAreaInput, setTextAreaInput] = useState("");
	// const [value, setValue] = useState({ query: "" });
	// const [lists, setList] = useState([]);
	const [questionList, setQuestionList] = useState([]);
	const [showQuestion, setShowQuestion] = useState(false);
	// const [show, setShow] = useState(false)


	function changes(event) {
		props.change(event.target.value);
		// console.log(event.target.value);
		setTextAreaInput(event.target.value)


		if (event.target.value.trim() === '') {
			setShowQuestion(false);
			// setShow(false); 
		}
		else handle_question_Result(event.target.value)

		// if (event.target.value.indexOf("@") != -1) {
		// 	// console.log(event.target.value.substring(event.target.value.indexOf("@") + 1, event.target.value.length));
		// 	handle_mf_Result(event.target.value.substring(event.target.value.indexOf("@") + 1, event.target.value.length));
		// 	// setShow(true)
		// }
		// else setShow(false)

	}




	// const lists_of_fund = lists.map((e, i) => {
	// 	return <div key={i} class="chatbot_list_funds_item" onClick={() => { onClickOfItemFunds(e) }}>{e}</div>
	// })

	const lists_of_questions_suggestions = questionList.map((e, i) => {
		return <div key={i} class="chatbot_list_questions_item" onClick={() => { onClickOfItemQuestions(e) }}><i class="fa fa-search"></i> {e}</div>
	})

	function onClickOfItemQuestions(e) {
		// console.log(e);
		setTextAreaInput(e);
		setShowQuestion(false);
		// setShow(false);
		props.change(e);

	}

	// function onClickOfItemFunds(e) {
	// 	console.log(e);
	// 	setTextAreaInput(textAreaInput.substring(0, textAreaInput.indexOf("@")) + " " + e);
	// 	// setShow(false);

	// 	props.change(textAreaInput.substring(0, textAreaInput.indexOf("@")) + " " + e);
	// 	handle_question_Result(textAreaInput.substring(0, textAreaInput.indexOf("@")) + " " + e)
	// }

	useEffect(() => {
		setTextAreaInput("");
		setShowQuestion(false)
		// setShow(false)
	}, [props.textBoolean])


	useEffect(() => {
		setShowQuestion(false)
		// setShow(false)
		console.log("Escape in I/p msg")
	}, [props.EscapeButton])

	var CancelToken = axios.CancelToken;
	var cancel;
	var datas;

	var CancelToken2 = axios.CancelToken;
	var cancel2;
	var datas2;

	function handle_question_Result(value) {

		var tempList = []
		if (cancel2 !== undefined) {
			cancel();
		}

		datas2 = {
			size: 50,
			query: {
				"multi_match": {
					"query": value,
					"fields": [
						"question",
						"entityvalue",
						"extra^2"
					],
					"type": "cross_fields",
					"operator": "OR",
					"minimum_should_match": "35%",
					"tie_breaker": "0.3"
				}
			}
		};
		axios({
			method: "post",
			url:
				"https://search-finresearch-nee4bx22xxffjggmbpbr4y27ye.ap-south-1.es.amazonaws.com/questionsearch/_search",
			data: datas2,
			cancelToken2: new CancelToken(function executor(c) {
				// An executor function receives a cancel function as a parameter
				cancel2 = c;
			}),
		})
			.then((response) => {
				// console.log(response.data.hits.hits);
				// setList(response.data.hits.hits);

				// console.log("--------------------------------------------------------")
				response.data.hits.hits.map((e, q) => {
					// console.log(e._source.question);
					tempList.push(e._source.question)
				})
				setQuestionList([].concat(tempList))
				// console.log(lists.length)
				if (questionList.length === 0) setShowQuestion(false)
				else setShowQuestion(true)
			})
			.catch((error) => {
				console.log(error);
			});


	}

	// function handle_mf_Result(value) {
	// 	var tempList = []
	// 	if (cancel !== undefined) {
	// 		cancel();
	// 	}

	// 	datas = {
	// 		size: 500,
	// 		query: {
	// 			"multi_match": {
	// 				"query": value,
	// 				"fields": [
	// 					"name",
	// 					"category"
	// 				],
	// 				"type": "cross_fields",
	// 				"operator": "OR",
	// 				"minimum_should_match": "50%",
	// 				"tie_breaker": "0.3"
	// 			}
	// 		},
	// 	};
	// 	axios({
	// 		method: "post",
	// 		url:
	// 			"https://search-finresearch-nee4bx22xxffjggmbpbr4y27ye.ap-south-1.es.amazonaws.com/mfsearch/_search",
	// 		data: datas,
	// 		cancelToken: new CancelToken(function executor(c) {
	// 			// An executor function receives a cancel function as a parameter
	// 			cancel = c;
	// 		}),
	// 	})
	// 		.then((response) => {
	// 			// console.log(response.data.hits.hits);
	// 			// setList(response.data.hits.hits);

	// 			// console.log("--------------------------------------------------------")
	// 			response.data.hits.hits.map((e, q) => {
	// 				// console.log(e._source.name);
	// 				tempList.push(e._source.name)
	// 			})
	// 			setList([].concat(tempList))
	// 			console.log(lists.length)
	// 			if (lists.length === 0) setShow(false)
	// 			else setShow(true)
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }


	const onEnterPressKeyBoard = (e) => {
		if (e.key === 'Enter') {
			setTimeout(() => {
				// setShow(false)
				setShowQuestion(false)
			setTextAreaInput("");
			}, 250);
			props.onEnterPress(e)
			e.preventDefault();
		}
	};



	return (

		// <MentionsInput
		// 	id="chatbot_btn-input"
		// 	type="text"
		// 	allowSpaceInQuery="true"
		// 	value={textAreaInput}
		// 	className="chatbot_comments-textarea"
		// 	placeholder="Type something... or use @ to search a mutual fund"
		// 	onKeyDown={(e) => { onEnterPressKeyBoard(e); }}
		// 	onChange={changes}>

		// 	<Mention
		// 		markup="__display__."
		// 		trigger="@"
		// 		data={lists}
		// 		/>
		// </MentionsInput>

		<>
			{/* { show ? <div class="chatbot_list_funds" >{lists_of_fund}</div> : null} */}
			{showQuestion ? <div class="chatbot_list_questions_suggestions">{lists_of_questions_suggestions}</div> : null}

			<textarea
				ref={input => input && input.focus()}
				style={{

					// box- sizing: border-box;background-color: transparent;font-family: inherit;font-size: inherit;letter-spacing: inherit;/* 
					//height: 100%; */bottom: 0px;overflow: hidden;resize: none;
				}}
			id="chatbot_btn-input"
				type="text"
				className="chatbot_comments-textarea"
				placeholder="Type a message... "
				value={textAreaInput}
				onChange={changes}
				onKeyDown={(e) => { onEnterPressKeyBoard(e); }}
		/>
		</>
	);
}
export default Input;
