import React, { useContext } from "react";
import Dropdown from "../common/dropdown";
import { TransactionContext } from "../../context/Transactions";
const Header = () => {
  const { currentAccount, connectWallet } = useContext(TransactionContext);
  const style = {
    headerWrapper: "fixed right-[100px] max-h-[50px] top-[24px] flex flex-row",
    currency:
      "flex text-white bg-[rgba(51,52,56,1)] mr-[36px] p-[12px] rounded-[25px] ",
    address:
      "flex-row text-white bg-[rgba(51,52,56,1)] ] p-[12px] rounded-[25px] max-w-[120px] truncate",
  };
  return (
    <div className={`${style.headerWrapper}`}>
      <div className={style.currency}>
        Ethereum<Dropdown></Dropdown>
      </div>
      <div className={style.address} title={currentAccount ? currentAccount : "Connect Wallet"} onClick={()=>{connectWallet()}}>
        {currentAccount ? currentAccount : "Connect Wallet"}
      </div>
    </div>
  );
};

export default Header;
