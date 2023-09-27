import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useTransactionFields } from "../../hooks/useTransactionFields";
import { Loading } from "../utils/Loading"
import { Modal } from "../utils/Modal";
import { TransactionDetail } from "./TransactionDetail";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const TransactionList = () => {

  // component state 
  const stateDefaults = {
    selectedId: 0,
    selectedTransaction: {},
    showModal: false,
    transactions: []
  };
  const [selectedId, setSelectedId] = useState(stateDefaults.selectedId);
  const [selectedTransaction, setSelectedTransaction] = useState(stateDefaults.selectedTransaction);
  const [showModal, setShowModal] = useState(stateDefaults.showModal);
  const [transactions, setTransactions] = useState(stateDefaults.transactions);

  // hooks
  const { fetchTransactions } = useFetch();
  const { getFields, getValidTransactions } = useTransactionFields();

  const transactionFields = getFields();

  useEffect(() => {
    async function doFetch() {
      await sleep(1000);
      const fetchResults = await fetchTransactions("/transactions");
      const validTransactions = getValidTransactions(fetchResults);
      setTransactions(validTransactions);
    }
    doFetch();
  }, []);

  useEffect(() => {
    if(selectedId === 0){
      setSelectedTransaction(stateDefaults.selectedTransaction);
    } else {
      const transaction = transactions.find( item => item.id === selectedId)
      setSelectedTransaction(transaction)
    }

  }, [selectedId]);

  useEffect(() => {
    // has items
    if(selectedTransaction.id === selectedId){
      setShowModal(true);
    } else {
      setShowModal(false);
    }

  }, [selectedTransaction]);

  const openModal = (id) => { 
    setSelectedId(id);
  };

  const closeModal = () => { 
    setSelectedId(stateDefaults.selectedId);
  };

  return (
    <>
      <h1>TRANSACTIONS</h1>
      <pre>
        state 
        selectedId: {selectedId}
        showModal: {showModal}
        selectedTransaction: {JSON.stringify(selectedTransaction)}
      </pre>
      { !transactions.length ? <Loading msg="Loading" margin="20px" color="#61dafb" />
      :
      <>
        <table className="transactions-table">
          <thead>
            <tr>
              {transactionFields.map((field) => (
                <th key={field + 0}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              transactions.map(trans => {
                return <tr title={trans['description']} key={trans['id']} onClick={() => openModal(trans['id'])}>
                  {transactionFields.map((field) => (
                    <td key={field + trans['id']}>{trans[field]}</td>
                  ))}
                </tr>
              })
            }
          </tbody>
        </table>
        <Modal showModal={showModal} closeModal={closeModal} label="Transaction Detail">
          <TransactionDetail transaction={selectedTransaction} />
        </Modal>
      </>
        }
    </>
  );
};

export {TransactionList};
