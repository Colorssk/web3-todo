import React from 'react';
import WInput from '../common/WInput';
const TabContainer = () => {
  const style = {
      contentStyle: "w-full h-full shrink p-[24px] text-white flex justify-center items-center",
      inputWrapper: "w-[50%] bg-[rgba(51,52,56,1)] rounded-[25px] border-solid border-[rgba(211,211,211,0.25)] p-[48px]",
      inputBlock: "mb-[24px]"
    }
  return (
    <div className={style.contentStyle}>
      <div className={style.inputWrapper}>
        <WInput disabled subFix></WInput>
        <WInput style='mt-[48px]' disabled subFix></WInput>
      </div>
    </div>
  );
}

export default TabContainer;
