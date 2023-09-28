import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useTransactionFields } from "../../hooks/useTransactionFields";
import { Loading } from "../utils/Loading"
import { Modal } from "../utils/Modal";
import { TransactionDetail } from "./TransactionDetail";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const TransactionList = () => {

  // hooks
  const { fetchTransactions } = useFetch();
  const { getFields, getFieldAsLabel, getViews } = useTransactionFields();

  // component state 
  const stateDefaults = {
    selectedId: 0,
    selectedTransaction: {},
    showModal: false,
    transactions: [],
    selectedOption: "all",
    transactionFields: []
  };

  const views = getViews();

  const [selectedId, setSelectedId] = useState(stateDefaults.selectedId);
  const [selectedTransaction, setSelectedTransaction] = useState(stateDefaults.selectedTransaction);
  const [showModal, setShowModal] = useState(stateDefaults.showModal);
  const [transactions, setTransactions] = useState(stateDefaults.transactions);
  const [selectedOption, setSelectedOption] = useState(stateDefaults.selectedOption);
  const [transactionFields, setTransactionFields] = useState(stateDefaults.transactionFields);

  useEffect(() => {
    console.log('useEffect', 'doFetch')
    async function doFetch() {
      await sleep(1000);
      // const transactions = await fetchTransactions("/transactions");
      const transactions = await fetchTransactions(views[selectedOption]);
      setTransactionFields(getFields(selectedOption));
      setTransactions(transactions);
    }
    doFetch();
  }, [selectedOption]);

  /*
  useEffect(() => {
    async function doFetch(url) {
      await sleep(1000);
      const transactions = await fetchTransactions(url);
      setTransactions(transactions);
    }
    doFetch("/transactions");
  }, []);
  */

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
      {/*<pre>
        state 
        selectedId: {selectedId}
        showModal: {showModal}
        selectedTransaction: {JSON.stringify(selectedTransaction)}
        transaction count: {transactions.length}
  </pre>*/}
      <div className="transactions">
      <h2>Card Transactions</h2>
      { !transactions.length ? <Loading />
      :
      <>
        
        <select
          name="view"
          value={selectedOption}
          className="droplist"
          onChange={e => setSelectedOption(e.target.value)}
        >
          {Object.keys(views).map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <table>
          <thead>
            <tr>
              {transactionFields.map((field) => (
                <th key={field + 0}>{getFieldAsLabel(field)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              transactions.map((trans, i) => {
                return <tr title={trans['description']} key={trans['description'] + i} onClick={() => openModal(trans['id'])}>
                  {transactionFields.map((field, j) => (
                    <td key={trans[field] + j}>{trans[field]}</td>
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
        </div>
    </>
  );
};

export {TransactionList};
