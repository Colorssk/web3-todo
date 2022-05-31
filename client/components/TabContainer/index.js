import React, { useContext } from 'react';
import WInput from '../common/WInput';
import { TransactionContext } from "../../context/Transactions";
const TabContainer = () => {
  const { formData, handleChange, sendTransaction } = useContext(TransactionContext)
  const style = {
    contentStyle: "w-full h-full shrink p-[24px] text-white flex justify-center items-center",
    inputWrapper: "w-[50%] bg-[rgba(51,52,56,1)] rounded-[25px] border-solid border-[rgba(211,211,211,0.25)] p-[48px]",
    inputBlock: "mb-[24px]"
  }
  return (
    <div className={style.contentStyle}>
      <div className={style.inputWrapper}>
        <WInput subFix handleChange={handleChange} value={formData.addressTo} keyword="addressTo">{formData.addressTo}</WInput>
        <WInput style='mt-[48px]' subFix handleChange={handleChange} value={formData.amount} keyword="amount">{formData.amount}</WInput>
        <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mt-[20px] ml-[200px]" onClick={()=>{sendTransaction()}}>
          submit
        </button>
      </div>
    </div>
  );
}

export default TabContainer;
