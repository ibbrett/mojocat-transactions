import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useTransactionFields } from "../../hooks/useTransactionFields";
import { Loading } from "../utils/Loading"
import { Modal } from "../utils/Modal";
import { TransactionDetail } from "./TransactionDetail";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const newDate = () => {
  return new Date().toISOString();
}

const TransactionList = () => {

  // hooks
  const { fetchTransactions } = useFetch();
  const { getFields, getFieldAsLabel, getViews, getAmountInDollars, getStateDefaults } = useTransactionFields();

  // views are used by the droplist as labels and API endpoint paths
  const views = getViews();
  const stateDefaults = getStateDefaults();

  // state
  const [selectedId, setSelectedId] = useState(stateDefaults.selectedId);
  const [selectedTransaction, setSelectedTransaction] = useState(stateDefaults.selectedTransaction);
  const [showModal, setShowModal] = useState(stateDefaults.showModal);
  const [transactions, setTransactions] = useState(stateDefaults.transactions);
  const [selectedOption, setSelectedOption] = useState(stateDefaults.selectedOption);
  const [transactionFields, setTransactionFields] = useState(stateDefaults.transactionFields);

  useEffect(() => {
    console.log("component mounted", newDate());
    console.log("*".repeat(80));
    return () => {
      console.log("unmount")
    };
  },[]);

  // effect to manage fetching data on load and when the droplist option is changd
  useEffect(() => {
    console.log('useEffect', 'doFetch', `selectedOption: ${selectedOption}`, newDate());
    
    async function doFetch() {
      if( stateDefaults.transactions[selectedOption].length ){
        console.log("set transactions from cache");
        setTransactions(stateDefaults.transactions[selectedOption]);
      } else {
        console.log("set transactions from API call");
        await sleep(1500);
        const transactions = await fetchTransactions(views[selectedOption]);
        stateDefaults.transactions[selectedOption] = transactions;
        setTransactions(transactions);
      }
      
      setTransactionFields(getFields(selectedOption));
      console.log("#".repeat(80));
    }
    doFetch();
  }, [selectedOption]);

  // effect to manage selected transaction record
  useEffect(() => {
    console.log('useEffect', `selectedId: ${selectedId}` , newDate());
    if(selectedId === 0){
      setSelectedTransaction(stateDefaults.selectedTransaction);
    } else {
      const transaction = transactions.find( item => item.id === selectedId)
      setSelectedTransaction(transaction)
    }

  }, [selectedId]);

  // effect to manage displaying/hiding transaction detail modal
  useEffect(() => {
    // has items
    console.log('useEffect', 'selectedTransaction', selectedTransaction, newDate());
    if(selectedTransaction.id === selectedId){
      setShowModal(true);
    } else {
      setShowModal(false);
    }

  }, [selectedTransaction]);

  // these functions manage opening/closing modal by setting the selected transaction id
  // modal closes when this id is set to 0, otherwise it opens with detail data associated with the selected id
  const openModal = (id) => { setSelectedId(id);};
  const closeModal = () => { setSelectedId(stateDefaults.selectedId);};

  return (
    <>
      <div className="transactions">
      { transactions.length ? <img src="/logo.jpg" className="client-icon" /> : null }
        <h2>Card Transactions</h2>
      { !transactions.length ? <Loading />
      :
      <>
        <select
          name="view"
          value={selectedOption}
          className="droplist"
          onChange={e => { 
            setTransactions(stateDefaults.transactions)
            setSelectedOption(e.target.value)
          }
        }
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
                    <td key={trans[field] + j}>{
                      typeof trans[field] === "number" ? getAmountInDollars(trans[field]) : trans[field]
                    }</td>
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
