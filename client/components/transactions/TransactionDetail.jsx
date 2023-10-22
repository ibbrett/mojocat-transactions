import React from "react";
import { useCurrencyApi } from "../../hooks/useCurrencyApi";

const TransactionDetail = ({transaction}) => {

  const { getCurrencyAmount, getCurrencyName, getCurrencyRate, getAmountInUSDollars } = useCurrencyApi();

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

  const TransactionItem = ({label, value}) => {
    return (
      <div className="item">
        <span className="label">{label}:</span>
        <span className="value">{value}</span>
      </div>
    )
  }

  const TransactionType = () => {
    const amount = debit !== null ? debit : credit;
    const amountInUSDollars = getAmountInUSDollars(amount);
    return (
      <div className="item">
        <span className="label">Type: ({ debit !== null ? "debit" : "credit" })</span>
        <span className="value">{ amountInUSDollars }</span>
      </div>
    )
  }

  const TransactionCurrency = () => {
    const amount = debit !== null ? debit : credit;
    const convertedAmount = getCurrencyRate(currency)  * amount;
    const currencyAmount = getCurrencyAmount( convertedAmount, currency) ;
    return (
      <div className="item">
        <span title={`Transaction curreny used: ${getCurrencyName(currency)} (${currency})`} className="label">{getCurrencyName(currency)}</span>
        <span title={`Conversion rate: ${getCurrencyRate(currency)} ${currency}/USD`} className="value">{ currencyAmount }</span>
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
        <TransactionCurrency />
        <TransactionDate />
        <TransactionAddress />
      </div>
    </div>
  )
  
}

export {TransactionDetail}
