/* all transaction fields
const allTransactionFields = [
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

// used by droplist - object of droplist labels and API endpoint paths
const views = {
  "all": "/transactions", 
  "top merchants by transactions": "/transactions/top-merchants", 
  "top merchants by amount (debit)": "/transactions/top-by-amount/description", 
  "top categories by amount (debit)": "/transactions/top-by-amount/category",
  "top merchants by amount (credit)": "/transactions/top-by-amount/description/credit", 
  "top categories by amount (credit)": "/transactions/top-by-amount/category/credit"
};

/* cache API-fetched data: this object will look like:
{
  "all": [], 
  "top merchants by transactions": [], 
  "top merchants by amount (debit)": [], 
  "top categories by amount (debit)": [], 
  "top merchants by amount (credit)": [],  
  "top categories by amount (credit)": [], 
};
*/
const cachedTransactions = {};
Object.keys(views).forEach(key => {
  cachedTransactions[key] = [];
});

const stateDefaults = {
  selectedId: 0,
  selectedTransaction: {},
  showModal: false,
  transactions: cachedTransactions, // [],
  selectedOption: "all",
  transactionFields: []
};

// used to control transaction field display
const transactionFields = {
  "all": [
    "transactionDate",
    "description",
    "category",
    "debit",
    "credit"
  ],
  "top merchants by transactions": [
    "transactionDate",
    "description",
    "debit",
    "credit"
  ],
  "top merchants by amount (debit)": [
    "transactionDate",
    "description",
    "debit",
  ],
  "top categories by amount (debit)": [
    "transactionDate",
    "category",
    "debit",
  ],
  "top merchants by amount (credit)": [
    "transactionDate",
    "description",
    "credit"
  ],
  "top categories by amount (credit)": [
    "transactionDate",
    "category",
    "credit"
  ],
};

const useTransactionFields = () => {

  const getAmountInDollars = ( num ) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(num);
  }
  

  const getFields = (view) => {
    return transactionFields[view];
  }

  const getViews = () => {
    return views;
  }

  const getStateDefaults = () => {
    return stateDefaults
  }

  const getFieldAsLabel = (fieldName) => { 
    if(fieldName === "transactionDate") return "Date"
    else if(fieldName === "description") return "Merchant"
    else return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  }

  return { getFields, getViews, getFieldAsLabel, getAmountInDollars, getStateDefaults };
};

export { useTransactionFields };
