import React from "react";
const Tabs = (props) => {
  const { list = [], active='switch', onChangeTab=()=>{} } = props;
  const style = {
    headerWraper:
      "m-auto ml-[calc(50% - 250px)] p-[25px] bg-[rgba(51,52,56,1)] rounded-[25px] border-solid border-[rgba(211,211,211,0.25)]  flex justify-between items-center  shadow-inner rounded-sm",
    borderBlock:
      "bg-[black]  rounded-[25px]  p-[3px] hover:opacity-[0.7] mr-[30px]",
    borderBlockActive:
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
    borderBlockLast: "mr-0",
    buttonContent:
      "rounded-[25px] w-full h-full ring-offset-2 bg-[rgba(51,52,56,1)] text-white pl-[16px] pr-[16px] pt-[6px] pb-[6px] cursor-pointer",
  };

  return (
    <div className={style.headerWraper}>
      {list.map((item, index) => {
        return (
          <div
            className={`${style.borderBlock} ${
              index === list.length - 1 ? style.borderBlockLast : ""
            } ${active === item.value ? style.borderBlockActive : ""}`}
            key={item?.value}
            onClick={()=>{onChangeTab(item?.value)}}
          >
            <div className={style.buttonContent}>
              {item?.label || "default"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
