import React from "react";
import {Spinner} from './Spinner'

export const Loading = ({msg, margin, color}) => {

  return (
    <>
      <h3 style={{color: color}}>{msg}</h3>
      <Spinner color={color} margin={margin} />
    </>
  )
  
}
