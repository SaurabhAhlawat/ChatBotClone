import React from 'react'

export default function Image_message(props) {
    return (
        <div className="row msg_container ">
            <img className="image_message_chatbot" src={props.link} />
        </div>
    )
}
