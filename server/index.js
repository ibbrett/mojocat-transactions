const express = require('express')
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express()
app.use(cors());
const port = 3000

const transactions = fs.readFileSync(path.resolve(__dirname, './transactions.json'), 'utf-8');

// API Endpoints
app.get('/transactions', (req, res) => {
  console.log('get transactions')
  res.status(200).contentType('application/json').send(transactions);
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