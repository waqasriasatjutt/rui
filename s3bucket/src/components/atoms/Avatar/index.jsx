import React from "react";

function Avatar({ name }) {
  let text = name
    ? name
        .replaceAll("+", "")
        .split(" ")
        .slice(0, 2)
        .map((string) => (string ? string[0].toUpperCase() : ""))
    : "";
  return (
    <div className="wms-imgcollage">
      <div className="wms-lettercoll">
        <span>{text}</span>
      </div>
    </div>
  );
}

export default Avatar;
