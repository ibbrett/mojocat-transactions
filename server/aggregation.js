const transformedNewTransaction = ( transaction ) => {

  return {
    "debit": transaction.debit,
    "credit": transaction.credit,
    "merchantStreetAddress": transaction.merchantStreetAddress,
    "merchantCity": transaction.merchantCity,
    "merchantState": transaction.merchantState,
    "currency": transaction.currency,
  };

};

const transformedExistingTransaction = ( existing, transaction ) => {

  const exDebit = existing.debit !== null ? existing.debit : 0;
  const exCredit = existing.credit !== null ? existing.credit : 0;
  const tDebit = transaction.debit !== null ? transaction.debit : 0;
  const tCredit = transaction.credit !== null ? transaction.credit : 0;

  // console.log('exDebit, exCredit, tDebit, tCredit', exDebit, exCredit, tDebit, tCredit)

  return {
    "debit": exDebit + tDebit,
    "credit": exCredit + tCredit,
    "merchantStreetAddress": transaction.merchantStreetAddress,
    "merchantCity": transaction.merchantCity,
    "merchantState": transaction.merchantState,
    "currency": transaction.currency,
  };

};

const aggregateAll = ( transactions ) => {
  const transactionMap = new Map();
  transactions.forEach(transaction => {
    const key = transaction.description;
    if(transactionMap.has(key)){
      // console.log('has key', key);
      transactionMap.set(key, transformedExistingTransaction(
        transactionMap.get(key),
        transaction) 
      );
    } else {
      // console.log('does not have key', key);
      transactionMap.set(key, transformedNewTransaction(transaction) );
    }
  })

  //console.log(transactionMap);
  return transactions;
};


exports.aggregateAll = aggregateAll;

/*
{
  "description":"She's not for You",
  "category":"Dating Services",
  "debit":null,
  "credit":448.93,
  "id":1,
  "merchantStreetAddress":"1219 SW Park Ave",
  "merchantCity":"Portland",
  "merchantState":"OR",
  "currency":"USD"
}*/
