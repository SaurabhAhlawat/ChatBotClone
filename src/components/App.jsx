import React, { useState, useEffect } from "react";
import Chat from "./ChatWindow";
import "../css/chatbot.css";
import { set } from "js-cookie";

function App() {
	const [item, setitem] = useState({
		isActive: false,
		icon: "/images/Fab64x64.png",
	});
	const [notification, setNotification] = useState(-1);

	useEffect(() => {
		const timer = setTimeout(() => {
			setNotification((value) => (value === -1 ? 1 : 0));
		}, 4000);
		return () => clearTimeout(timer);
	}, [setNotification]);


	function handleClick() {
		item.isActive
			? setitem({ isActive: false, icon: "/images/Fab64x64.png" })
			: setitem({ isActive: true, icon: "-1" });
	}
	function closeChatbot(){
		setitem({ isActive: false, icon: "/images/Fab64x64.png" })
	}
	return (
		<>
			{notification === 1 ? <div class="jcb_fab-icon-a-welcome-notification">Hi! Do you need some help?</div> : null}
			<Chat
				active={item.isActive}
				closeChatbot={closeChatbot}
				url="https://abwm.vitt.ai/"
				cookieKey="sessionid"
			/>
			{item.icon==="-1"?null:
				<a onClick={(m) => { m.preventDefault(); handleClick(); setNotification(0); }} class="jcb_fab-icon-a">
				<img src={item.icon} alt="Chat_facility" class="jcb_fab-img" />
			</a>}
		</>
	);
}

export default App;
