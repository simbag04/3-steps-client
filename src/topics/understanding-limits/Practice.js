import React from "react"
import { generateRandomPolynomial, getRandomNumber } from "../../helpers/functions"
import LimitExampleGraph from "./LimitExampleGraph";
import './styles.css'

const Practice = () => {
  const { node, x }= generateRandomPolynomial(getRandomNumber(1, 4))
  const f = x => node.evaluate({x});
  const xval = x;
  
  return (
    <div>
      <LimitExampleGraph f={f} xval={xval} y={f(xval)} 
          fColor={""} xColor={""} yColor={""} />
    </div>
  )
}

export default Practice