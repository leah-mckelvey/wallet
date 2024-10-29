import React, { useState } from 'react';


import './App.css';
import TransactionView from './TransactionView.tsx';
import Web3 from 'web3';

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum: any;
  }
}

interface Transaction {
  from: string;
  to: string;
  value: number;
  gas: number;
  gasPrice: string;
  data: string;
}

function App() {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [recipientWallet, setRecipientWallet] = useState('');
  const [amount, setAmount] = useState(0);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const transactionViews = transactions.map((tx, index) => {
    return (
      <TransactionView
        key={index}
        transaction={tx}
      />
    );
});

  const connectWallet = async () => {
    if (window.ethereum.isMetaMask) {
      try {
        const web3Instance = new Web3(window.ethereum);
        const ethereumAccounts = await web3Instance.eth.requestAccounts();
        setAccounts(ethereumAccounts);
        if (accounts.length > 0) {
          // Setting mock data for balance 
          setBalance(2.3)
          const accountBalance = await web3Instance.eth.getBalance(accounts[0]);
          setBalance(Number(accountBalance));
        }
      } catch (error) {
        setError(error.message);
      }
    }
  }
  const sendTransaction = async () => {
    console.log('sendTransaction');
    if (window.ethereum.isMetaMask) {
      const web3Instance = new Web3(window.ethereum);
      try {
        if (accounts.length > 0) {
          // Validate recipient wallet
          if (!recipientWallet || !web3Instance.utils.toChecksumAddress(recipientWallet)) {
            setError('Recipient wallet is required');
            return;
          }
          console.log('logging transaction');
          setIsTransactionLoading(true);
          const tx: Transaction = {
            from: accounts[0].toString(),
            to: recipientWallet,
            value: amount,
            gas: 60000,
            gasPrice: '0x09184e72a000',
            data: ''
          }
          setTimeout(() => {
            // Mock a successful transaction after 5 seconds
            setIsTransactionLoading(false);
            setTransactions([...transactions, tx]);
          }, 5000);
          const txHash = await web3Instance.eth.sendTransaction(tx);

          setTransactions([...transactions, tx]);
        }
      } catch (error) {
        console.log('caught error, ', error);
        setIsTransactionLoading(false);
        setError(error.message);
      }
    }
  }
  return (
    <div className="App">
      {
        !accounts.length && !error &&
      <button onClick={connectWallet}>Connect to Metamask Wallet</button>
      }
      {
        accounts.length > 0 && <div>
          <h2> Connected Account: </h2>
          <div>{accounts[0]}</div>
          <div>Balance: </div>
          <div>{balance}</div>
          {
            isTransactionLoading ? <div>Loading...</div> :
            <div>
          (<input type="text" placeholder="Recipient Wallet" value={recipientWallet} onChange={(e) => setRecipientWallet(e.target.value)} />
          <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button onClick={sendTransaction}>Send Transaction</button>)
          </div>
          }
          <h2>Transactions</h2>
          {transactionViews}
          </div>
      }
      {
        error && <div>Error: {error}</div>
      }
    </div>
  );
}

export default App;
