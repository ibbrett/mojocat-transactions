const transactionFields = [
  "transactionDate",
  "description",
  "debit",
  "credit"
];

/*
const transactionFields = [
  "id",
  "transactionDate",
  "description",
  "category",
  "debit",
  "credit",
  "merchantStreetAddress",
  "merchantCity",
  "merchantState",
  "merchantCountry",
  "currency"
];
*/

const useTransactionFields = () => {

  const getFields = () => {
    return transactionFields;
  }

  const getValidTransactions = ( transactions ) => {
    return transactions.filter((transaction) => transaction.hasOwnProperty('transactionDate'))
  }

  return { getFields, getValidTransactions };
};

export { useTransactionFields };
