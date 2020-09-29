/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import ReactBottomsheet from "react-bottomsheet";

function DownButton(props) {
  return (
    <a className="downButton" onClick={props.onClick}>
      <img
        className="down_button"
        src="/images/arrow-up.png"
        alt="down_button"
      />
    </a>
  );
}

export default DownButton;
