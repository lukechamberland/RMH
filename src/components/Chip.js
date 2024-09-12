import React from "react";

export default function Chip(props) {

  const { background, hover } = props;

  return (
    <div className={hover ? "chip" : "chip-two"} style={{ backgroundImage: `url(${background})`}}></div>
  )
}