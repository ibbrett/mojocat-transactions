import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useTransactionFields } from "../../hooks/useTransactionFields";
import { Loading } from "../utils/Loading"
import { Modal } from "../utils/Modal";
import { TransactionDetail } from "./TransactionDetail";
import { TransactionTable } from "./TransactionTable";
import { TransactionDropList } from "./TransactionDropList";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const newDate = () => {
  return new Date().toISOString();
}

const TransactionList = () => {

  // hooks
  const { fetchTransactions } = useFetch();
  const { getFields, getViews, getStateDefaults } = useTransactionFields();

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
  const [sortedField, setSortedField] = useState(stateDefaults.sorted);

  async function doFetch(option = null) {

    if ( Object.keys(sortedField).length ) {
      console.log("sortedField has key ... re-init");
      setSortedField(stateDefaults.sorted);
    } else {
      console.log("sortedField does not have key ... do nothing");
    }

    if( option === null) {
      option = stateDefaults.selectedOption;
    }
    else {
      setTransactions([]);
      setSelectedOption(option)
    }

    if( stateDefaults.transactions[option].length ){
      console.log("set transactions from cache", option);
      setTransactions(stateDefaults.transactions[option]);
    } else {
      console.log("set transactions from API call", option);
      await sleep(1500);
      const transactions = await fetchTransactions(views[option]);
      stateDefaults.transactions[option] = transactions;
      setTransactions(transactions);
    }
    
    setTransactionFields(getFields(option));
    console.log("#".repeat(80));
  }

  useEffect(() => {
    console.log("component mounted", newDate());
    console.log("*".repeat(80));

    doFetch();

    return () => {
      console.log("unmount")
    };
  },[]);

  // effect to manage selected transaction record
  useEffect(() => {
    console.log('useEffect', `selectedId: ${selectedId}` , newDate());
    if(selectedId === 0){
      setSelectedTransaction(stateDefaults.selectedTransaction);
      setShowModal(false);
    } else {
      const transaction = transactions.find( item => item.id === selectedId)
      setSelectedTransaction(transaction)
      setShowModal(true);
    }

  }, [selectedId]);

  // these functions manage opening/closing modal by setting the selected transaction id
  // modal closes when this id is set to 0, otherwise it opens with detail data associated with the selected id
  const openModal = (id) => { setSelectedId(id);};
  const closeModal = () => { setSelectedId(stateDefaults.selectedId);};
  const logo = <img src="/logo.png" className="client-icon" />;

  const HeaderSortHandler = ( field, dir ) => {

    // remember to reset this on select change
    setSortedField({[field]:dir});

    console.log('HeaderSortHandler', field, dir);
    const greaterThanReturnValue = dir === 'asc' ? 1 : -1;
    const lessThanReturnValue = dir === 'asc' ? -1 : 1;
    setTransactions(transactions.toSorted( (a, b) => {
      if ( a[field] > b[field] ){
        return greaterThanReturnValue;
      } else if ( a[field] < b[field] ){
        return lessThanReturnValue;
      }
      return 0;
    }));

  };

  return (
    <>
      <div className="transactions">
      { transactions.length ? logo : null }
        <h2 title="Mojocat Bank Transactions">Mojocat Transactions</h2>
      { !transactions.length ? <Loading />
      :
        <>
          <TransactionDropList selectedOption={selectedOption} doFetch={doFetch} views={views} />
          <TransactionTable HeaderSortHandler={HeaderSortHandler} sortedField={sortedField} transactions={transactions} transactionFields={transactionFields} openModal={openModal} />
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
