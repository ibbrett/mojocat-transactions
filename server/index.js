const express = require('express')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const {getTopMerchants, getTopByAmount} = require('./utils');

const app = express()
app.use(cors());
const port = 3000

const transactions = fs.readFileSync(path.resolve(__dirname, './transactions.json'), 'utf-8');
const defaultCount = 10;
const defaultDebitOrCredit = "debit";
const defaultType = "description";


// API Endpoints
app.get('/transactions', (req, res) => {
  res.status(200).contentType('application/json').send(transactions);
})

// based on frequence, not debit or credit amount
app.get('/transactions/top-merchants/:count?', (req, res) => {
  const count = req.params.count || defaultCount;
  const topMerchants = getTopMerchants(JSON.parse(transactions), count);
  res.status(200).contentType('application/json').send(topMerchants);
})

/*
  handles merchants and categories for debits and credits with optional quantity 
  valid endpoints:
    http://localhost:3000/transactions/top-by-amount/description/debit/5
    http://localhost:3000/transactions/top-by-amount/description/credit/10
    http://localhost:3000/transactions/top-by-amount/category/debit/2
    http://localhost:3000/transactions/top-by-amount/category/debit/3
    http://localhost:3000/transactions/top-by-amount/category/debit
    http://localhost:3000/transactions/top-by-amount/description
    http://localhost:3000/transactions/top-by-amount
*/
app.get('/transactions/top-by-amount/:type?/:debitOrCredit?/:count?', (req, res) => {
  const debitOrCredit = req.params.debitOrCredit || defaultDebitOrCredit;
  const count = req.params.count || defaultCount;
  const type = req.params.type || defaultType;

  const top = getTopByAmount(JSON.parse(transactions), type, debitOrCredit, count );
  res.status(200).contentType('application/json').send(top);
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
