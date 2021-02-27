import React, { useEffect, useState } from "react";
import "../css/chatbot.css";
import Linkify from "react-linkify";

function Table_Message(props) {



	var details = props.query;
	var heading = details.entries.headings.map((m, i) => {
		return (<th className="chatbot_table_ui_th">
			{m}
		</th>);
	});

	const componentDecorator = (href, text, key) => (
		<a href={href} key={key} target="_blank" style={{ "color": "#3e593c" }}>
			{text}
		</a>
	);

	var rows = details.entries.values.map((m, i) => {
		return (
			<tr className="chatbot_table_ui_tr">
				{details.entries.values[i].map((p, q) => {
					return (
						<td key={q} className="chatbot_table_ui_th">
							{p.hyperlink != null ?
								(p.hyperlink.indexOf("<") === 0 ?
									<a style={{ cursor: "pointer", color: "#3e593c", textDecoration: "underline" }} href={p.hyperlink.substring(1, p.hyperlink.length)}>
										{p.value}
									</a>
									:
									<a style={{ cursor: "pointer", color: "#3e593c", textDecoration: "underline" }} onClick={() => { props.tableClick(p.hyperlink) }}>
										{p.value}
									</a>
								)
								:
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
					<div >{details.entries.title}</div>
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
