import React, { useState, useEffect } from "react";
import { ethers } from 'ethers'
import { client } from '../lib/sanityClient'
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
  useEffect(() => {
    if (!currentAccount) return
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: currentAccount,
        userName: 'Unnamed',
        address: currentAccount,
      }
  
      await client.createIfNotExists(userDoc)
    })()
  }, [currentAccount])
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
  const saveTransaction = async (
    txHash,
    amount,
    fromAddress = currentAccount,
    toAddress,
  ) => {
    const txDoc = {
      _type: 'transactions',
      _id: txHash,
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamp: new Date(Date.now()).toISOString(),
      txHash: txHash,
      amount: parseFloat(amount),
    }

    await client.createIfNotExists(txDoc)

    await client
      .patch(currentAccount)
      .setIfMissing({ transactions: [] })
      .insert('after', 'transactions[-1]', [
        {
          _key: txHash,
          _ref: txHash,
          _type: 'reference',
        },
      ])
      .commit()

    return
  }

  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount,
  ) => {
    try {
      if (!metamask) return alert('Please install metamask ')
      const { addressTo, amount } = formData
      const transactionContract = getEthereumContract()

      const parsedAmount = ethers.utils.parseEther(amount)


      console.log(metamask)
      console.log(connectedAccount, connectedAccount)
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

      await saveTransaction(
        transactionHash.hash,
        amount,
        connectedAccount,
        addressTo,
      )

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
