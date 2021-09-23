import React, { useState, useRef, useEffect } from "react";
import Send from "./Sent_message";
import Receive from "./receive_message";
import Table from './Table_Message';
import Input from "./Input_message";
import Button from "./Send_btn";
import Axios from "axios";
import "../css/chatbot.css";
import ButtonMessage from "./btn_message";
import Cookies from "js-cookie";
import DownButton from "./DownButton";
import ReactBottomsheet from "react-bottomsheet";
import { Dot } from 'react-animated-dots';
import Image_message from "./Image_message";

function ChatWindow(props) {
	//"004f1836-15ce-11eb-a4c1-023dd4e3dfca"
	//ToGetCookie
	const [cookieData, setCookieData] = useState(-1);
	//ToGetAllMessages-Recieve,Send,ButtonsUI,Card
	const [value, setValue] = useState([]);
	//ButtonUIArray which will disappear after click
	const [buttonValue, setButtonValue] = useState([]);
	//News UI
	const [newsValue, setnewsValue] = useState([]);
	//ThreeDots loading Animation
	const [loader, setLoader] = useState(-1);
	//DownButtonList which will keep on changing.
	const [jcb_down_button_data, set_jcb_down_button_data] = useState([]);
	//DownButtonList Checker
	const [sheet, setBottomSheet] = useState({ bottomSheet: false });
	//1 Random Id per session
	const [conversation_id, set_conversation_id] = useState(-1);
	//TextArea while we type
	const [textAreaInput, setTextAreaInput] = useState(false);
	//ScrollTo 1st recieved Box after we recieve msg
	const [scrollTo, setScrollTo] = useState(0);
	//Maximize ChatBot using maximize icon state change of class
	const [maximizeChatBot, setMaximizeChatBot] = useState("");
	//change maximize or minimize icon of chatbot
	const [maxOrMinIcon, setMaxOrMinIcon] = useState("/images/maximize.png");
	//Escape Button click
	const [escapeButton, setEscapeButton] = useState(false)


	/**using Escape button to make downbuttonList disappear*/
	useEffect(() => {
		const handleEsc = (event) => {
			if (event.keyCode === 27) {
				setBottomSheet({ bottomSheet: false })
				setEscapeButton(escapeButton => { return !escapeButton })
			}
		};
		window.addEventListener('keydown', handleEsc);

	}, []);
	/** */


	/*Scroll to Bottom Easy UI*/
	const messagesEndRef2 = useRef(null);


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

	/**Generate Random Conversation Id for session */
	function Conversation_id_function() {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < 32; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	/** when user presses any message UI button*/
	function onclick(event) {
		temp = {
			session: cookieData,
			query: event,
			type: "sent",
			time: startTime(),
			count: value.length,
			conversationId: conversation_id
		};
		clickButton()
		// console.log(event);
		setButtonValue([]);
		set_jcb_down_button_data([]);
		isClicked(true);
	}

	/*Mapping Text(speech) messages values which are in value array */

	var receives = value.map((m, i) => {
		// console.log("type:" + m.type + " pos:" + i);
		if (m.query !== "") {
			if (m.type == "receive") {
				return <Receive key={i} query={m.query} time={m.time} />;

			} else if (m.type == "sent") {
				if (i === scrollTo) {
					return <>
						<div ref={messagesEndRef2} />
						<Send key={i} query={m.query} time={m.time} />

						{messagesEndRef2.current ? messagesEndRef2.current.scrollIntoView({ behavior: "smooth" }) : null}
					</>
				}
				return <Send key={i} query={m.query} time={m.time} />;
			}
			else if (m.type === "card") {
				return <Table key={i} query={m.query} time={m.time} tableClick={(m) => { tableHyperLinkClick(m) }} />;
			}
			else if (m.type === "image") {
				return <Image_message link={m.query} />
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
	// console.log(recievesButton.length+"recieve:");
	/*OnChange in Input  function to get the value from input*/
	var temp = {
		session: cookieData,
		query: "",
		type: "sent",
		time: startTime(),
		count: value.length,
		conversationId: conversation_id
	};

	/**when we write something on input field, event function will change the value constantly */
	function submitForm(event) {
		temp = {
			session: cookieData,
			query: event,
			type: "sent",
			time: startTime(),
			count: value.length,
			conversationId: conversation_id
		};

		// console.log({});
	}

	/*API CALL for first GoodMorning messages when user open the chat! */

	useEffect(() => {
		if(window.location.pathname === "/mf-transaction/Category") {
			setTimeout(initializeChat, 10000);
		} else {
			initializeChat();
		}
	}, []);

	function initializeChat() {
		var conversation = Conversation_id_function();
		set_conversation_id(conversation)
		console.log(temp);
		setLoader(1);
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
				session: user,
				query: "hi!",
				type: "sent",
				time: startTime(),
				count: value.length,
				conversationId: conversation
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
					var actionText = [];

					/**UP Arrow */

					var trial = [];
					success.data.result.fulfillment.data.DownButton.GenerativeQuestion.map(
						(m, i) => {
							// console.log(i);
							if (trial.length < 10) trial.push(m);
						}
					);
					set_jcb_down_button_data([].concat(trial));
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
									conversationId: conversation
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
									conversationId: conversation
								};
								// console.log("replies: " + mm);
								btn.push(inital_message);
							});
						}
						else if (m.type === 3) {
							var inital_message = {
								session: cookieData,
								query: m.speech,
								type: "image",
								time: startTime(),
								count: value.length,
								conversationId: conversation
							};
							console.log("ImageLink: " + inital_message.query);
							sp.push(inital_message);
						} else if (m.type === 4 && m.speech !== "") {
							var inital_message = {
								session: cookieData,
								query: m.speech,
								type: "receive",
								time: startTime(),
								count: value.length,
								conversationId: conversation
							};
							actionText.push(inital_message);
						}
					});
					// console.log(btn);
					// console.log(sp);
					setValue([...value].concat(sp).concat(actionText));
					setButtonValue([].concat(btn));
					setLoader(-1)
				})
				.catch((error) => {
					// console.log(error);

					var errors = "";
					// console.log(error.message)
					if (error.message.includes("Network")) errors = "There seems to be an issue with your internet connection. Please check."
					else errors = "Oops! please Please write something..."
					var inital_message = {
						session: cookieData,
						query: errors,
						type: "receive",
						time: startTime(),
						count: value.length,
						conversationId: conversation_id
					};
					setValue([...value, inital_message]);
					setLoader(-1);
					console.log("some error in fetching data from abcl.vitt.ai : ");

					console.log(error);
				});


		} else {
			console.log("no cookies found");
			temp = {
				session: cookieData,
				query: "hi!",
				type: "sent",
				time: startTime(),
				count: value.length,
				conversationId: conversation
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
					var actionText = [];

					/**UP Arrow */

					var trial = [];
					success.data.result.fulfillment.data.DownButton.GenerativeQuestion.map(
						(m, i) => {
							// console.log(i);
							if (trial.length < 10) trial.push(m);
						}
					);
					set_jcb_down_button_data([].concat(trial));
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
									conversationId: conversation
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
									conversationId: conversation
								};
								// console.log("replies: " + mm);
								btn.push(inital_message);
							});
						} else if (m.type === 3) {
							var inital_message = {
								session: cookieData,
								query: m.speech,
								type: "image",
								time: startTime(),
								count: value.length,
								conversationId: conversation
							};
							console.log("ImageLink: " + inital_message.query);
							sp.push(inital_message);
						} else if (m.type === 4 && m.speech !== "") {
							var inital_message = {
								session: cookieData,
								query: m.speech,
								type: "receive",
								time: startTime(),
								count: value.length,
								conversationId: conversation
							};
							actionText.push(inital_message);
						}
					});
					// console.log(btn);
					// console.log(sp);
					setValue([...value].concat(sp).concat(actionText));
					setButtonValue([].concat(btn));
					setLoader(-1)
				})
				.catch((error) => {
					// console.log(error);

					var errors = "";
					// console.log(error.message)
					if (error.message.includes("Network")) errors = "There seems to be an issue with your internet connection. Please check."
					else errors = "Oops! Please write something..."
					var inital_message = {
						session: cookieData,
						query: errors,
						type: "receive",
						time: startTime(),
						count: value.length,
						conversationId: conversation_id
					};
					setValue([...value, inital_message]);
					setLoader(-1);
					console.log("some error in fetching data from abcl.vitt.ai : ");
					console.log(error);
				});
		}

		// console.log(temp);
	}
	/*After clicking on send either by pressing enter or by pressing send button*/

	function clickButton() {
		setTextAreaInput(!textAreaInput)
	}

	function isClicked(bool) {
		setScrollTo(value.length);

		setBottomSheet({ bottomSheet: false });
		setLoader(1);
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

			setValue([...value, temp]);
			// console.log(temp);
			console.log("isClicked: query is not blank");
			Axios.post(props.url, temp)
				.then((success) => {

					// console.log("printed");
					//type==0 for text
					var sp = [];
					//type==2 for button message
					var btn = [];
					var actionText = [];
					//type==1 for news
					var news = [];
					console.log(
						"isClicked: inside success of abcl.vitt.ai fetching api "
					);

					/**Table Data */
					var table_Data = {
						session: cookieData,
						query: {},
						type: "card",
						time: startTime(),
						count: value.length,
						conversationId: conversation_id
					};
					var flag = false;
					var table_pos = false;
					if (success.data.result.fulfillment.data.type === "card") {
						table_Data.query = success.data.result.fulfillment.data.data
						flag = true;
						if (success.data.result.fulfillment.data.table == "up") table_pos = true
					}

					if (flag && table_pos) {
						sp.push(table_Data)
					}

					/**UP Arrow */
					var trial = [];

					success.data.result.fulfillment.data.DownButton.GenerativeQuestion.map(
						(m, i) => {
							// console.log(i);

							console.log("isClicked: inside Generative Question array");
							if (trial.length < 10) trial.push(m);
						}
					);
					set_jcb_down_button_data([].concat(trial));
					/** */

					success.data.result.fulfillment.messages.map((m) => {
						// console.log("type: " + m.type + " speec: " + m.speech);

						console.log("isClicked: inside messages array");
						if (m.type === 0 && m.speech !== "") {
							m.speech.map((mm, qq) => {
								var inital_message = {
									session: cookieData,
									query: mm,
									type: "receive",
									time: startTime(),
									count: value.length,
									conversationId: conversation_id
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
									conversationId: conversation_id
								};
								// console.log("replies: " + mm);
								btn.push(inital_message);
							});
						} else if (m.type === 3) {
							var inital_message = {
								session: cookieData,
								query: m.speech,
								type: "image",
								time: startTime(),
								count: value.length,
								conversationId: conversation_id
							};
							console.log("ImageLink: " + inital_message.query);
							sp.push(inital_message);
						} else if (m.type === 4 && m.speech !== "") {
							var inital_message = {
								session: cookieData,
								query: m.speech,
								type: "receive",
								time: startTime(),
								count: value.length,
								conversationId: conversation_id
							};
							actionText.push(inital_message);
						}
					});
					// console.log(btn);
					// console.log(sp);
					if (flag && !table_pos) {
						sp.push(table_Data)
					}

					setValue([...value, temp].concat(sp).concat(actionText));

					setButtonValue([].concat(btn));
					setLoader(-1);
				})
				.catch((error) => {
					console.log(
						"isClicked: catch of abcl.vitt.ai fetching api and error is: " +
						error
					);
					/**If we get 500 Internal error. then we will show this query. */
					var errors = "";
					// console.log(error.message)
					if (error.message.includes("Network")) errors = "There seems to be an issue with your internet connection. Please check."
					else errors = "Oops! please Enter something related to Finance!"
					var inital_message = {
						session: cookieData,
						query: errors,
						type: "receive",
						time: startTime(),
						count: value.length,
						conversationId: conversation_id
					};
					setValue([...value, temp, inital_message]);
					setLoader(-1);
					// console.log(error);
				});

			//console.log(value);
		}
		//console.log(value);
		count++;
		document.getElementById("jcb_my_form").reset();
	}


	function tableHyperLinkClick(m) {
		temp = {
			session: cookieData,
			query: m,
			type: "sent",
			time: startTime(),
			count: value.length,
			conversationId: conversation_id
		};
		isClicked();
	}


	/**Bottom sheet logic */

	const bottomsheetonClick = () => {
		var obj = sheet.bottomSheet
			? { bottomSheet: false }
			: { bottomSheet: true };
		setBottomSheet(obj);
		setEscapeButton(!escapeButton)
	};
	var downbuttons = jcb_down_button_data.map((m, i) => {
		return (
			<button
				className="jcb_bottom-sheet-item"
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


	function onMaximizeChatBot() {
		if (maximizeChatBot === "") {
			setMaximizeChatBot("jcb_maximize-icon-heading-chatbot-Main");
			setMaxOrMinIcon("/images/minimize.png")
		}
		else {
			setMaximizeChatBot("");
			setMaxOrMinIcon("/images/maximize.png");
		}
	}


	/**Return Type */
	return (
		<div class={"jcb " + maximizeChatBot}>
			<div class="jcb_blackScreenShadow_chatBot"></div>
			<div
				className="jcb_chat-window jcb_chatbotAnimationClassFadeIn"
				id="jcb_chatBot-id"
				style={{ display: props.active ? "block" : "none" }}
			>
				<div className="jcb_panel-default">
					<div className="jcb_panel-logo-wrapper">
						<div style={{ textAlign: "right" }} className="jcb_action-btn">
							<img alt="maximize_icon" class="jcb_maximize-icon-heading-chatbot" onClick={(m) => { m.preventDefault(); onMaximizeChatBot(); }} src={maxOrMinIcon} />
							<img alt="close_icon" style={{ cursor: "pointer" }} class="close-icon-heading-chatbot" onClick={(m) => {
								m.preventDefault();
								setMaximizeChatBot(""); props.closeChatbot(); setBottomSheet({ bottomSheet: false })
							}} src="/images/remove.png" />
						</div>
						<div className="jcb_panel-logo">
							<div className="jcb_logo-text">Wealth Assist</div>
							<div className="jcb_logo-image">
								<img src="https://c3india.s3.ap-south-1.amazonaws.com/public_assets/data/000/000/344/original/BirlaCapitalLogo_jpeg?1538291690" />
							</div>
						</div>
					</div>
					<div className="jcb_panel-heading-text">
						Aditya Birla Finance Limited (AMFI registered Mutual Fund Distributor)
					</div>
					<div className="panel-body jcb_msg_container_base">

						{receives}
						
						{loader !== -1 ? <div className="jcb_loader_animation_chatbot"><Dot>.</Dot><Dot>.</Dot><Dot>.</Dot> </div> : null}
						{recievesButton.length !== 0 ? <div className="row jcb_msg_container ">
							<div class="jcb_btn_messs">{recievesButton}</div>
						</div> : null}
						<div ref={messagesEndRef} />

					</div>
					{/**Bottom sheet implementation */}
					<ReactBottomsheet
						className="jcb_custom-layout"
						visible={sheet.bottomSheet}
						onClose={bottomsheetonClick}
						appendCancelBtn={false}
					>
						<div>{downbuttons}</div>
					</ReactBottomsheet>
					<div className="jcb_panel-footer">
						<div className="jcb_input-group">
							<form
								autoComplete="off"
								id="jcb_my_form"
								onSubmit={(m) => {
									m.preventDefault();
									isClicked(true);
								}}
							>
								<DownButton onClick={bottomsheetonClick} visible={sheet.bottomSheet} />
								<Input
									change={submitForm}
									textBoolean={textAreaInput}
									onEnterPress={(e) => { onclick(temp.query) }}
									EscapeButton={escapeButton}
								/>
								<Button
									click={() => {
										clickButton();
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
