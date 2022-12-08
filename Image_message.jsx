import React from 'react'

export default function Image_message(props) {
    return (
        <div className="row jcb_msg_container ">
            <img className="jcb_image_message_chatbot" src={props.link} />
        </div>
    )
}
