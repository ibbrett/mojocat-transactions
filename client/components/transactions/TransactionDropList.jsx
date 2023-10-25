import React from "react";

const TransactionDropList = ( {selectedOption, doFetch, views} ) => {

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
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );

};

export {TransactionDropList};
