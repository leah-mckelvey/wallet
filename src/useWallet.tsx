import {useState} from 'react'
import Web3 from 'web3';

interface Transaction {
    from: string;
    to: string;
    value: number;
    data: string;
  }

export default function useWallet() {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [connectionLoading, setConnectionLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const [recipientWallet, setRecipientWallet] = useState('');
  const [amount, setAmount] = useState(0);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const connectWallet = async () => {
    if (window.ethereum.isMetaMask) {
      try {
        setConnectionLoading(true);
        const web3Instance = new Web3(window.ethereum);
        const ethereumAccounts = await web3Instance.eth.requestAccounts();
        setAccounts(ethereumAccounts);
        setConnectionLoading(false);
        if (accounts.length > 0) {
          // Setting mock data for balance 
          setBalance(2.3)
          const accountBalance = await web3Instance.eth.getBalance(accounts[0]);
          setBalance(Number(accountBalance));
        }
      } catch (error) {
        setError(error.message);
        setConnectionLoading(false);
      }
    }
  }
  const sendTransaction = async () => {
    if (window.ethereum.isMetaMask) {
      const web3Instance = new Web3(window.ethereum);
      try {
        if (accounts.length > 0) {
          // Validate recipient wallet
          if (!recipientWallet || !web3Instance.utils.toChecksumAddress(recipientWallet)) {
            setError('Recipient wallet is required');
            return;
          }
          setIsTransactionLoading(true);
          const tx: Transaction = {
            from: accounts[0].toString(),
            to: recipientWallet,
            value: amount,
            data: ''
          }
          setTimeout(() => {
            // Mock a successful transaction after 5 seconds
            setIsTransactionLoading(false);
            setTransactions([...transactions, tx]);
          }, 5000);
            await web3Instance.eth.sendTransaction(tx);

          setTransactions([...transactions, tx]);
        }
      } catch (error) {
        console.error('caught error, ', error);
        setIsTransactionLoading(false);
        setError(error.message);
      }
    }
  }
  return {
    accounts,
    balance,
    error,
    recipientWallet,
    amount,
    transactions,
    setAmount,
    setRecipientWallet,
    isTransactionLoading,
    connectWallet,
    sendTransaction
  }
}