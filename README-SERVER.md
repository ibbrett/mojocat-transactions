# Express Server - Story 2

Modify the express server to add data sources for the following:

- Top 10 merchants
- Top 10 by amount
- Top categories by amount

## server data source: Top 10 merchants

- interpreted this to mean top 10 merchants by number of transactions  

### valid sample endpoints 

if not specified, endpoint will return a default of 10 merchants

```bash
http://localhost:3000/transactions/top-merchants/
```

otherwise, a count can be specified for number of top merchants

```bash
http://localhost:3000/transactions/top-merchants/5
```

## server data source: Top 10 by amount

- interpreted this to mean top merchants by sum of debit or credit amounts 
- defaults to top 10
- defaults to debit

### valid sample endpoints

```bash
http://localhost:3000/transactions/top-by-amount
http://localhost:3000/transactions/top-by-amount/description
http://localhost:3000/transactions/top-by-amount/description/debit
http://localhost:3000/transactions/top-by-amount/description/credit
http://localhost:3000/transactions/top-by-amount/description/debit/5
http://localhost:3000/transactions/top-by-amount/description/credit/5
```

## server data source: Top categories by amount

- interpreted this to mean top categoories by sum of debit or credit amounts 
- defaults to top 10
- defaults to debit

### valid sample endpoints

```bash
http://localhost:3000/transactions/top-by-amount/category
http://localhost:3000/transactions/top-by-amount/category/debit
http://localhost:3000/transactions/top-by-amount/category/credit
http://localhost:3000/transactions/top-by-amount/category/debit/5
http://localhost:3000/transactions/top-by-amount/category/credit/5
```
