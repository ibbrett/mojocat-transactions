import React from "react";
import { useCurrencyApi } from "../../hooks/useCurrencyApi";
import { useTransactionFields } from "../../hooks/useTransactionFields";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";

const TransactionTable = ( {sortedField, transactions, transactionFields, openModal, HeaderSortHandler} ) => {

  console.log('RENDER: TransactionTable', transactions);

  const { getAmountInUSDollars } = useCurrencyApi();
  const { getFieldAsLabel } = useTransactionFields();

  const HeaderWithSortControls = ({field}) => {
    console.log('sortedField', sortedField);
    const label = getFieldAsLabel(field);

    const sortClassAsc = field in sortedField && sortedField[field] === 'asc' ? "icon sorted" : "icon";
    const sortClassDesc = field in sortedField && sortedField[field] === 'desc' ? "icon sorted" : "icon";
    //console.log('field in sortedField', field, sortedField, sortClass);

    return (
      <div className="table-header">
        <span className="label">{label}</span>
        <div className="sort">
          <div className="controls">
            <AiFillCaretUp title="sort descending" className={sortClassDesc} onClick={(e) => { e.stopPropagation(); return HeaderSortHandler(field,'desc')}} />
            <AiFillCaretDown title="sort ascending" className={sortClassAsc} onClick={(e) => { e.stopPropagation(); return HeaderSortHandler(field,'asc')}}  />
          </div>
        </div>
      </div>
    )
  };

  // console.log('TransactionsTable', 'transactions',  transactions);

  return (
    <table>
      <thead>
        <tr>
          {transactionFields.map((field) => (
            <th key={'table-header-'+field}>
              <HeaderWithSortControls field={field} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {
          transactions.map((trans, i) => {
            return <tr title={trans['description']} key={'table-row-'+ i} onClick={(e) => { e.stopPropagation(); return openModal(trans['id'])}}>
              {transactionFields.map((field, j) => (
                <td key={'table-row-'+ i + '-' + j}>{
                  typeof trans[field] === "number" ? getAmountInUSDollars(trans[field]) : trans[field]
                }</td>
              ))}
            </tr>
          })
        }
      </tbody>
    </table>
  );

};



/*
function transactionTablePropsAreEqual(prevTransactionTable, nextTransactionTable) {
  const propsToCompare = ['transactions'];
  const prevEqualsNext = checkPrevAndNextPropsAreEqual('topic', prevTopic, nextTopic, propsToCompare);
  return prevEqualsNext;
}
const memoizedTransactionTable = React.memo(Topic, transactionTablePropsAreEqual);
*/

function checkPrevAndNextPropsAreEqual(prevTransactionTable, nextTransactionTable){
  const prevFetchDate = prevTransactionTable.fetchDate;
  const nextFetchDate = nextTransactionTable.fetchDate;
  console.log('prev/next FetchDate', prevFetchDate, nextFetchDate);
  if (prevFetchDate === nextFetchDate){
    console.log('prev/next match - do nothing');
    return true;
  } else {
    console.log('prev/nextdo not match - re-render');
    return false;
  }
}
const memoizedTransactionTable = React.memo(TransactionTable, checkPrevAndNextPropsAreEqual);
export { memoizedTransactionTable as TransactionTable };
