import React from "react"
import { generateRandomPolynomial, getRandomNumber } from "../../helpers/functions"

const Practice = () => {
  // const {simplified, derivative} = 
  generateRandomPolynomial(getRandomNumber(1, 4))
  // const f = x => node.evaluate({x});
  return (
    <div>Function: {} derivative: {}</div>
  )
}

export default Practice