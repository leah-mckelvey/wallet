import React from 'react';

interface Transaction {
    from: string;
    to: string;
    value: number;
  }

export default function TransactionView({ transaction }: { transaction: Transaction }) {
    return (
        <div>
            <p>From: {transaction.from}</p>
            <p>To: {transaction.to}</p>
            <p>Value: {transaction.value}</p>
        </div>
    );
}