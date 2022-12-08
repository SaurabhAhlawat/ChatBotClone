import React, { useEffect, useState } from "react";
import "../css/chatbot.css";
import Linkify from "react-linkify";

function Receive(props) {

	//This is to check whether it contains << >> this angle brackets or not!
	const [checkUrlExist, setCheckUrlExist] = useState(false)

	//This value is for Hey, This might interest you! Here are the latest income tax slabs and rates - <<Tax:http://www.ecoti.in/OsciWb>>
	//type text 
	const [values, setValues] = useState({ mainText: "", string: "", link: "" })

	const componentDecorator = (href, text, key) => (
		<a href={href} key={key} target="_blank" style={{ "color": "#3e593c" }}>
			{text}
		</a>
	);

	// var mainText = ""
	// var string = ""
	// var link = ""

	useEffect(() => {
		var i1 = props.query.indexOf('<')
		// console.log(i1)
		var i2 = props.query.indexOf('<', i1 + 1)
		// console.log(i2)
		if (i1 !== -1 && i2 !== -1 && i2 - i1 === 1) {

			var index = props.query.indexOf(":", i2 + 1)
			var index2 = props.query.indexOf(">", index)
			setValues({
				mainText: "" + props.query.substring(0, i1),
				string: "" + props.query.substring(i2 + 1, index),
				link: "" + props.query.substring(index + 1, index2)
			})
			setCheckUrlExist(true)

		}
	}, [checkUrlExist])




	return (
		<div className="row jcb_msg_container base_receive">
			<div className="aa">
				<div className="jcb_messages_chatbot jcb_msg_receive_chatbot">
					<p>
						{checkUrlExist ? <>{values.mainText} <a target="_blank" href={values.link} style={{ "color": "#3e593c" }}>{values.string}</a></>
							: <Linkify componentDecorator={componentDecorator} >{props.query}</Linkify>}
					</p>  
					<time dateTime={props.time}>{props.time}</time>
				</div>
			</div>
		</div>
	);
}
export default Receive;
