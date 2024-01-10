# Mojocat Bank Transactions

This is a simple React demonstration app of a user interface for bank transactions. 

## What is this?

The point of this is to display a list of transactions retrieved from an API server 

### what's in here?

- async API calls are made to an Express API server
- an intentional delay is added with a loading indicator to highlight the async nature of the data retrieval
  - API fetched data is cached, Subsequent requests should not display the loading indicator as data is retriieved from cache
- a modal is used to display individual transaction details
