const getTopList = ( merchants, count ) => {

  // sort descending
  const sortedEntries =[...merchants.entries()].sort((a,b) => b[1] - a[1]);

  // find Nth-place merchant, get value 
  // this is to handle the use case of a tie for Nth place 
  // if so, we will include other merchants with same value
  let topList = sortedEntries.filter(entry => entry[1] > 0)
  if (topList.length >= count) {
    const nthPlaceValue = topList[count-1][1];
    topList = topList.filter(entry => entry[1] >= nthPlaceValue)
  }

  return topList;

};

const getTopMerchants = ( transactions, count ) => {

  const merchants = new Map();
  transactions.forEach((transaction) => {
    if(merchants.has(transaction.description)){
      const val = merchants.get(transaction.description);
      merchants.set(transaction.description, val + 1);
    } else {
      merchants.set(transaction.description, 1);
    }
  })

  return getTopList(merchants, count);

}

const getTopByAmount = ( transactions, type, debitOrCredit, count ) => {

  const merchants = new Map()
  transactions.forEach((transaction) => {
    let amount = transaction[debitOrCredit] === null ? 0 : transaction[debitOrCredit]
    if(merchants.has(transaction[type])){
      const val = merchants.get(transaction[type]);
      // converting to float for adding, then fixing to 2 decimal numbers, then converting back to number
      amount = parseFloat((parseFloat(val) + parseFloat(amount)).toFixed(2))
      merchants.set(transaction[type], amount);
    } else {
     merchants.set(transaction[type], amount);
    }
  })

  console.log('merchants Map', merchants, type);

  return getTopList(merchants, count);
}

const getTransactionsFromRankings = ( transactions, rankings, type, debitOrCredit ) => {
  const topList = rankings.map(item => item[0])
  let filteredTransactions;
  const forkFilterOutNullRecords = true;
  if(forkFilterOutNullRecords){
    if( debitOrCredit === "debit" || debitOrCredit === "credit"){
      filteredTransactions = transactions.filter(transaction => {
        return topList.indexOf(transaction[type]) >= 0 && transaction[debitOrCredit] !== null; 
      })
    } else {
      
      filteredTransactions = transactions.filter(transaction => {
        return topList.indexOf(transaction[type]) >= 0; 
      })
    }
  } else {
    filteredTransactions = transactions.filter(transaction => {
      return topList.indexOf(transaction[type]) >= 0; 
    })
  }
  
  
  return filteredTransactions;
}

exports.getTopMerchants = getTopMerchants;
exports.getTopByAmount = getTopByAmount;
exports.getTransactionsFromRankings = getTransactionsFromRankings;
