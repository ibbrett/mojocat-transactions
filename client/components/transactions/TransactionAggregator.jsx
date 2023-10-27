import React from "react";
import { Checkbox } from "../controls/Checkbox";

const TransactionAggregator = ( {checked, toggleAggregator, count} ) => {

  const countMessage = checked ? "aggregated transaction items" : "total transactions"
  return (
    <div className="aggregator">
      {/*
      <div className="check">
        <Checkbox value={checked} onChange={toggleAggregator} label="aggreate transactions" />
      </div>
      */}
      <div className="count">{countMessage}: {count}</div>
    </div>
  );

};

export {TransactionAggregator};
