import { useState, useCallback } from "react";
import { useTransactionFields } from "./useTransactionFields";
import { useFetch } from "./useFetch";

const { getViews, getStateDefaults, getFields, getCache } = useTransactionFields();
const views = getViews();
const stateDefaults = getStateDefaults();
const cache = getCache();
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const { fetchTransactions } = useFetch();
const newDate = () => { return new Date().toISOString();}

const useTransactionList = () => {

  const [selectedId, setSelectedId] = useState(stateDefaults.selectedId);
  const [selectedTransaction, setSelectedTransaction] = useState(stateDefaults.selectedTransaction);
  const [showModal, setShowModal] = useState(stateDefaults.showModal);
  const [transactions, setTransactions] = useState(stateDefaults.transactions); // stateDefaults.transactions
  const [selectedOption, setSelectedOption] = useState(stateDefaults.selectedOption);
  const [transactionFields, setTransactionFields] = useState(stateDefaults.transactionFields);
  const [sortedField, setSortedField] = useState(stateDefaults.sorted);
  const [fetchDate, setFetchDate] = useState(stateDefaults.fetchDate);
  const [aggregatorChecked, setAggregatorChecked] = useState(stateDefaults.aggregatorChecked);
  const [aggregatedTransactions, setAggregatedTransactions] = useState(stateDefaults.aggregatedTransactions);

  async function doFetch(option = null) {

    if ( Object.keys(sortedField).length ) {
      setSortedField(stateDefaults.sorted);
    }

    /*
    if ( Object.keys(sortedField).length ) {
      console.log("sortedField has key ... re-init");
      setSortedField(stateDefaults.sorted);
    } else {
      console.log("sortedField does not have key ... do nothing");
    }
    */

    if( option === null) {
      option = stateDefaults.selectedOption;
    }
    else {
      setTransactions([]);
      setSelectedOption(option)
    }

    if( cache[option].length ){
      console.log("set transactions from cache, data already fetched and cached", option);
      setTransactions(cache[option]);
    } else {
      console.log("set transactions from API fetch call", option);
      await sleep(1500);
      const transactions = await fetchTransactions(views[option]);
      cache[option] = transactions;
      setTransactions(transactions);
    }
    
    setTransactionFields(getFields(option));
    // console.log("#".repeat(80));

    const now = new Date();
    setFetchDate(now);
  }

  // these functions manage opening/closing modal by setting the selected transaction id
  // modal closes when this id is set to 0, otherwise it opens with detail data associated with the selected id
  const openModal = useCallback( (id) => { setSelectedId( id )} );
  const closeModal = useCallback( () => { setSelectedId( stateDefaults.selectedId )});

  const toggleAggregator = () => {
    // const aggregatedMap = new Map();
    console.log('aggregator checkbox clicked', selectedOption);
    setAggregatorChecked(!aggregatorChecked);
  };

  const HeaderSortHandler = ( field, dir ) => {

    // remember to reset this on select change
    setSortedField({[field]:dir});

    console.log('HeaderSortHandler', field, dir);
    const greaterThanReturnValue = dir === 'asc' ? 1 : -1;
    const lessThanReturnValue = dir === 'asc' ? -1 : 1;

    // ES2023 toSorted method
    setTransactions(transactions.toSorted( (a, b) => {
      if ( a[field] > b[field] ){
        return greaterThanReturnValue;
      } else if ( a[field] < b[field] ){
        return lessThanReturnValue;
      }
      return 0;
    }));

    const now = new Date();
    setFetchDate(now);

  };

  const changeSelectedTransaction = () => {
    // console.log('useEffect', `selectedId: ${selectedId}` , newDate());
    if ( selectedId ) { console.log(`transaction id: ${selectedId}`) }

    if(selectedId === 0){
      setSelectedTransaction(stateDefaults.selectedTransaction);
      setShowModal(false);
    } else {
      const transaction = transactions.find( item => item.id === selectedId)
      setSelectedTransaction(transaction)
      setShowModal(true);
    }
  };

  const onMount = () => {
    console.log("component mounted, fetch data");
    // console.log("*".repeat(80));
    doFetch();
  };

  return { 
    selectedId, 
    selectedTransaction, 
    showModal, 
    transactions, 
    selectedOption, 
    transactionFields, 
    sortedField, 
    fetchDate, 
    aggregatorChecked,
    aggregatedTransactions,
    doFetch,
    openModal,
    closeModal,
    toggleAggregator,
    HeaderSortHandler,
    changeSelectedTransaction,
    onMount
  };
};

export { useTransactionList };
