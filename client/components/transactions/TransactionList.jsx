import React, { useEffect } from "react";
import { Loading } from "../utils/Loading"
import { Modal } from "../utils/Modal";
import { TransactionDetail } from "./TransactionDetail";
import { TransactionTable } from "./TransactionTable";
import { TransactionDropList } from "./TransactionDropList";
import { TransactionAggregator } from "./TransactionAggregator";
import { useTransactionList } from "../../hooks/useTransactionList";

const logo = <img src="/logo.png" className="client-icon" />;

const TransactionList = () => {

  const {
    selectedId,
    transactions, 
    selectedOption, 
    transactionFields, 
    sortedField, 
    fetchDate, 
    aggregatorChecked,
    doFetch,
    openModal,
    closeModal,
    toggleAggregator,
    HeaderSortHandler,
    onMount
  } = useTransactionList();

  useEffect(() => {
    onMount()
    return () => {
      console.log("unmount")
    };
  },[]);

  return (
    <>
      <div className="transactions">
      { transactions.length ? logo : null }
        <h2 title="Mojocat Bank Transactions">Transactions</h2>
      { !transactions.length ? <Loading />
      :
        <>
          <TransactionDropList selectedOption={selectedOption} doFetch={doFetch} />
          {/*<TransactionAggregator checked={aggregatorChecked} toggleAggregator={toggleAggregator} count={transactions.length}/>*/}
          <TransactionTable 
            fetchDate={fetchDate} 
            HeaderSortHandler={HeaderSortHandler} 
            sortedField={sortedField} 
            transactions={transactions} 
            transactionFields={transactionFields} 
            openModal={openModal} 
          />
          <Modal showModal={selectedId === 0 ? false : true} closeModal={closeModal} label="Transaction Detail">
            <TransactionDetail transaction={
              selectedId === 0 ? {} : transactions.find( item => item.id === selectedId)
            }/>
          </Modal>
        </>
      }
      </div>
    </>
  );
};

export {TransactionList};
