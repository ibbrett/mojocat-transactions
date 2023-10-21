const express = require('express')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const {getTopMerchants, getTopByAmount, getTransactionsFromRankings} = require('./utils');

const app = express()
app.use(cors());
const port = process.env.PORT || 3000; // 3000

// filter out transactions without transactionDates
const getValidTransactions = ( transactions ) => {
  return transactions.filter((transaction) => transaction.hasOwnProperty('transactionDate'));
}

const transactions = fs.readFileSync(path.resolve(__dirname, './transactions.json'), 'utf-8');
const validTransactions = getValidTransactions(JSON.parse(transactions));

const defaultCount = 10;
const defaultDebitOrCredit = "debit";
const defaultType = "description";

// API Endpoints
app.get('/transactions', (req, res) => {
  res.status(200).contentType('application/json').send(validTransactions);
})

// based on frequence, not debit or credit amount
app.get('/transactions/top-merchants/:count?', (req, res) => {
  const count = req.params.count || defaultCount;
  const topItems = getTopMerchants(validTransactions, count);
  const transactionsFromRankings = getTransactionsFromRankings(validTransactions, topItems, 'description');
  //console.log('transactionsFromRankings[0]', transactionsFromRankings[0])
  res.status(200).contentType('application/json').send(transactionsFromRankings);
})

// based on frequence, not debit or credit amount
app.get('/rankings/top-merchants/:count?', (req, res) => {
  const count = req.params.count || defaultCount;
  const topItems = getTopMerchants(validTransactions, count);
  res.status(200).contentType('application/json').send(topItems);
})

// handles merchants and categories for debits and credits with optional quantity 
app.get('/transactions/top-by-amount/:type?/:debitOrCredit?/:count?', (req, res) => {
  const debitOrCredit = req.params.debitOrCredit || defaultDebitOrCredit;
  const count = req.params.count || defaultCount;
  const type = req.params.type || defaultType;
  const topItems = getTopByAmount(validTransactions, type, debitOrCredit, count );
  const transactionsFromRankings = getTransactionsFromRankings(validTransactions, topItems, type, debitOrCredit);
  res.status(200).contentType('application/json').send(transactionsFromRankings);
})

// handles merchants and categories for debits and credits with optional quantity 
app.get('/rankings/top-by-amount/:type?/:debitOrCredit?/:count?', (req, res) => {
  const debitOrCredit = req.params.debitOrCredit || defaultDebitOrCredit;
  const count = req.params.count || defaultCount;
  const type = req.params.type || defaultType;
  const topItems = getTopByAmount(validTransactions, type, debitOrCredit, count );
  res.status(200).contentType('application/json').send(topItems);
})

// Serve static files
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));
app.get('/', function (req, res) {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Express listening at http://localhost:${port}`)
})
