import React from "react";

const TransactionDetail = ({transaction}) => {

  const {id, debit, credit, currency, transactionDate, description, category, merchantStreetAddress, merchantCity, merchantState} = transaction; // unused: id, merchantCountry

  // expand this with additional currencies
  const getCurrencyChar = () => {
    if (currency === "USD") return "$";
    else return null;
  }

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
        <span className="value">{getCurrencyChar()}{ debit !== null ? debit : credit }</span>
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
        <TransactionItem label="Transaction #" value={`000${id}`} />
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
