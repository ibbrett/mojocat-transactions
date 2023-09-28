import React from "react";
import {Spinner} from './Spinner'

export const Loading = () => {

  return (
    <>
      <h3 className="loading">Loading Transactions</h3>
      <Spinner />
    </>
  )
  
}
