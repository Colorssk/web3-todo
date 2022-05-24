import React, { useState, useEffect } from "react";
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../lib/constants'

export const TransactionContext = React.createContext();

let eth;
if (typeof window !== "undefined") {
  eth = window?.ethereum;
}


const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )

  return transactionContract
}

export const TransactionProvider = (props) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    addressTo: 'OX123asdasdasdasd',
    amount: '12323',
  })
  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install metamask ");

      const accounts = await metamask.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };
  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert("please install metamask!");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (e) {
      throw new Error(e);
    }
  };

  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount,
  ) => {
    try {
      if (!metamask) return alert('Please install metamask ')
      const { addressTo, amount } = formData
      const transactionContract = getEthereumContract()

      const parsedAmount = ethers.utils.parseEther(amount)

      await metamask.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: '0x7EF40', // 520000 Gwei
            value: parsedAmount._hex,
          },
        ],
      })

      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        'TRANSFER',
      )

      setIsLoading(true)

      await transactionHash.wait()

      // await saveTransaction(
      //   transactionHash.hash,
      //   amount,
      //   connectedAccount,
      //   addressTo,
      // )

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e, name) => {
    console.log(e.target.value, name)
    setFormData(prevState => ({ ...prevState, [name]: e.target.value }))
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};
