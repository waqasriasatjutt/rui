import React from "react";
const Button = (props) => {
  let variantClass;

  switch (props.variant) {
    case "btn_submit":
      variantClass ="py-1.5 !px-3 align-middle !bg-primary-100 border-primary-100 !text-white font-semibold"
      break;
      case "btn_cancel":
      variantClass ="py-1.5 !px-3 align-middle !bg-menu border-menu !text-white font-semibold"
      break;
      case "btn_danger":
      variantClass ="py-1.5 !px-3 align-middle !bg-danger border-danger !text-white font-semibold"
      break;
    default:
      variantClass = "";
      break;
  }
  return (
    <button
      className={`${props.className} ${variantClass} rounded-none`}
      disabled={props.disabled || props.isLoading}
      onClick={props.onClick}
      type={props.type || "button"}
      style={{backgroundColor:props.backgroundColor,color:props.color,fontWeight:600}}
    >
      {props.text}
    </button>
  );
};

export default Button;
