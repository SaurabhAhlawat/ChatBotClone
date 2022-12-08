import React, { useState, useEffect } from "react";
import Chat from "./ChatWindow";
import "../css/chatbot.css";
import { set } from "js-cookie";
import { HIDE_WELCOME_MESSAGE_TIME, SHOW_WELCOME_MESSAGE_TIME } from "../utils/constants";

function Bot({localKey,cookieKey}) {
	const [item, setitem] = useState({
		isActive: false,
		icon: "/images/Fab64x64.png",
	});
	const [notification, setNotification] = useState(-1);

	useEffect(() => {
		const timer = setTimeout(() => {
			// playAudioClue();
			setNotification((value) => {
				return (value === -1 ? 1 : 0)
			});
		}, SHOW_WELCOME_MESSAGE_TIME);
		return () => clearTimeout(timer);
	}, [setNotification]);

	useEffect(() => {
		if(notification === 1) {
			const timer = setTimeout(() => {
				setNotification(0);
			}, HIDE_WELCOME_MESSAGE_TIME);
			return () => clearTimeout(timer);
		}
	}, [notification, setNotification]);


	function handleClick() {
		// playAudioClue();
		item.isActive
			? setitem({ isActive: false, icon: "/images/Fab64x64.png" })
			: setitem({ isActive: true, icon: "-1" });
	}

	function closeChatbot(){
		setitem({ isActive: false, icon: "/images/Fab64x64.png" })
	}

	function playAudioClue() {	
		const audio = new Audio("https://c3.avaamo.com/assets/disconnected-0b53435b5ff4147085fbd8ebc06e7684358ac41efc28ed182c02544e8b0ec388.mp3");
		audio.volume = 0.1;
		audio.play()
		.catch(() => {
			console.info('User has not interacted with document yet.');
		});
	}

	return (
		<>
			{notification === 1 ? <div className="jcb_fab-icon-a-welcome-notification">Hi! Do you need some help?</div> : null}
			<Chat
				active={item.isActive}
				closeChatbot={closeChatbot}
				url="https://abwm.vitt.ai/"
				cookieKey={cookieKey}
				localKey ={localKey}
			/>
			{item.icon==="-1"?null:
				<a onClick={(m) => { m.preventDefault(); handleClick(); setNotification(0); }} className="jcb_fab-icon-a">
				<img src={item.icon} alt="Chat_facility" className="jcb_fab-img" />
			</a>}
		</>
	);
}

export default Bot;
