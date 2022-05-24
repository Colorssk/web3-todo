import React from "react";
import Dropdown from "./dropdown";
const WInput = (props) => {
  const { style: setStyle, disabled, subFix, handleChange, value, keyword } = props;
  const style = {
    inputWapper:
      "block w-full px-4 py-2 mt-2 text-white bg-[rgba(51,52,56,1)] border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:text-white focus:text-white focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring",
    disabledHeight: "h-[50px]",
    subFixStyle: "flex flex-row justify-end",
  };
  const onChangeInput = (e) => {
    handleChange(e, keyword)
  }
  return (
    <>
      {disabled ? (
        <div
          className={`${style.inputWapper} ${setStyle} ${
            style.disabledHeight
          } ${subFix ? style.subFixStyle : ""}`}
        >
          {subFix ? <Dropdown></Dropdown> : <></>}
        </div>
      ) : (
        <input
          id="username"
          type="text"
          value={value}
          className={`${style.inputWapper} ${setStyle}`}
          onChange={onChangeInput}
        />
      )}
    </>
  );
};

export default WInput;
