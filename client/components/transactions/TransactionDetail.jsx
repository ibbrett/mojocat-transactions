import React from "react";
import { useTransactionFields } from "../../hooks/useTransactionFields";

const TransactionDetail = ({transaction}) => {

  // hooks
  const { getAmountInDollars } = useTransactionFields();

  const {
    category, 
    credit, 
    currency, 
    debit, 
    description, 
    id, 
    merchantCity,
    merchantState,
    merchantStreetAddress, 
    transactionDate 
  } = transaction;

  // expand this with additional currencies
  /*
  const getCurrencyChar = () => {
    if (currency === "USD") return "$";
    else return null;
  }
  */

  const TransactionItem = ({label, value}) => {
    return (
      <div className="item">
        <span className="label">{label}:</span>
        <span className="value">{value}</span>
      </div>
    )
  }

  const TransactionType = () => {
    return (
      <div className="item">
        <span className="label">Type: ({ debit !== null ? "debit" : "credit" })</span>
        <span className="value">{ debit !== null ? getAmountInDollars(debit, currency) : getAmountInDollars(credit, currency) }</span>
      </div>
    )
  }

  const TransactionDate = () => {
    const date = new Date(transactionDate);
    return (
      <div className="item">
        <span className="label">Date:</span>
        <span className="value">{ date.toDateString() }</span>
      </div>
    )
  }

  const TransactionAddress = () => {
    const address = merchantStreetAddress + "\n" + merchantCity + ", " + merchantState;
    return (
      <div className="item">
        <span className="label">Address:</span>
        <span className="value"><pre>{address}</pre></span>
      </div>
    )
  }

  if(!transaction.id) return null;

  return (
    <div className="transaction-detail">
      <hr />
      <div className="body">
        <TransactionItem label="Transaction #" value={id.toString().padStart(3, "0")} />
        <TransactionItem label="Description" value={description} />
        <TransactionItem label="Category" value={category} />
        <TransactionType />
        <TransactionDate />
        <TransactionAddress />
      </div>
    </div>
  )
  
}

export {TransactionDetail}
