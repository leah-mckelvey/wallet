import React from 'react';


import './App.css';
import TransactionView from './TransactionView.tsx';
import useWallet from './useWallet.tsx';


// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum: any;
  }
}



function App() {
  const { accounts, connectionLoading, balance, error, recipientWallet, amount, transactions, isTransactionLoading, connectWallet, setRecipientWallet, setAmount, sendTransaction } = useWallet();
  const transactionViews = transactions.map((tx, index) => {
    return (
      <TransactionView
        key={index}
        transaction={tx}
      />
    );
  });
  return (
    <div className="App">
      {
        !accounts.length && !error &&
      <button onClick={connectWallet}>Connect to Metamask Wallet</button>
      }
      {
        !accounts.length && connectionLoading &&
        <div>Connecting...</div>
      }
      {
        accounts.length > 0 && 
        <div>
          <div className="WalletStatus">
            <h2> Connected Account: </h2>
            <div className="WalletInfo">
              <div className='WalletAddress'>
                <h3>Wallet Address: </h3>
                <div>{accounts[0]}</div>
              </div>
              <div className="WalletBalance">
                <h3>Balance: </h3>
                <div>{balance}</div>
              </div>
            </div>
          </div>
          {
            isTransactionLoading ? <div>Loading...</div> :
            <div className="SendMoney">
              <h2>Send Money</h2>
              <div className="InputRow">
                <input className="InputRowElement" type="text" placeholder="Recipient Wallet" value={recipientWallet} onChange={(e) => setRecipientWallet(e.target.value)} />
                <input className="InputRowElement" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                <button className="InputRowElement" onClick={sendTransaction}>Send Transaction</button>
              </div>
            </div>
          }
          <div className="TransactionList">
            <h2>Transactions</h2>
            {transactionViews}
          </div>
        </div>
      }
      {
        error && <div className="Error">Error: {error}</div>
      }
    </div>
  );
}

export default App;
