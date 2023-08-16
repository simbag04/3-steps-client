import React from "react"
import { generateRandomPolynomial, getRandomNumber } from "../../helpers/functions"

const Practice = () => {
  const {simplified, derivative} = generateRandomPolynomial(getRandomNumber(1, 4))
  // const f = x => node.evaluate({x});
  return (
    <div>Function: {simplified.toString()} derivative: {derivative.toString()}</div>
  )
}

export default Practice