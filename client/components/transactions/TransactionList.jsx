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


  useEffect(() => {
    // has items
    if(transactions.length){
      getTopTenCategoriesByAmount('debit');
      getTopTenCategoriesByAmount('credit');
      //console.log(JSON.stringify(transactions,null,2))
    }

  }, [transactions]);
  

  const openModal = (id) => { 
    setSelectedId(id);
  };

  const closeModal = () => { 
    setSelectedId(stateDefaults.selectedId);
  };

  
  const getTopTenCategoriesByAmount = ( debitOrCredit ) => {

    // console.log("getTopTenMerchantsByDebitAmount", transactions)
    console.log("getTopTenMerchantsByDebitAmount")

    const merchants = new Map()
    transactions.forEach((transaction) => {
      // console.log(transaction)
      let amount = transaction[debitOrCredit] === null ? 0 : transaction[debitOrCredit]
      if(merchants.has(transaction.category)){
        const val = merchants.get(transaction.category);
        // this is a bit crazy 
        // converting to float for adding, then fixing to 2 decimal numbers, then converting back to number
        amount = parseFloat((parseFloat(val) + parseFloat(amount)).toFixed(2))
        merchants.set(transaction.category, amount);
       // merchants.set(transaction.description, val + 1);
      } else {
       merchants.set(transaction.category, amount);
        //merchants.set(transaction.description, 1);
      }
      // console.log(JSON.stringify(merchants,null,2))
    })

    

    // sort descending
    
    const sortedEntries =[...merchants.entries()].sort((a,b) => b[1] - a[1]);
    // console.log(sortedEntries)
    let topNList = sortedEntries.filter(entry => entry[1] > 0)
    if (topNList.length >= 10) {
      const tenthPlaceValue = topNList[9][1];
      topNList = topNList.filter(entry => entry[1] >= tenthPlaceValue)
    }
    
    console.log(debitOrCredit, topNList)


    // find 10th-place merchant, get value 
    // this is to handle the use case of a tie for 10th place 
    // if so, we will include other merchants with same value

    return merchants;
  }


  // {[...getTop10Merchants().entries()]}

  return (
    <>
      <pre>
        state 
        selectedId: {selectedId}
        showModal: {showModal}
        selectedTransaction: {JSON.stringify(selectedTransaction)}

        ## top 10 merchants
        
      </pre>
      { !transactions.length ? <Loading msg="Loading" margin="20px" color="#61dafb" />
      :
      <div className="transactions">
        <h2>Card Transactions</h2>
        <table >
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

      </div>
        }
    </>
  );
};

export {TransactionList};
