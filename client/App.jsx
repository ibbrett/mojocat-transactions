
import React from 'react'
import * as ReactDOM from 'react-dom'
import { TransactionList } from './components/transactions/TransactionList'

const App = () => {
  
  return (
    <TransactionList />
  );
}

ReactDOM.render(
  <div className="App">
    <App />
  </div>,
  document.getElementById('root')
);
