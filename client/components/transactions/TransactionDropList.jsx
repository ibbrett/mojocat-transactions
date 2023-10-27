import React from "react";
import { useTransactionFields } from "../../hooks/useTransactionFields";
const { getViews } = useTransactionFields();
const views = getViews();

const TransactionDropList = ( {selectedOption, doFetch} ) => {

  return (
    <select
      name="view"
      value={selectedOption}
      className="droplist"
      onChange={e => {
        e.stopPropagation();
        doFetch(e.target.value)
      }
    }
    >
      {Object.keys(views).map((item, index) => (
        <option key={'drop-list-item-'+index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );

};

export {TransactionDropList};
