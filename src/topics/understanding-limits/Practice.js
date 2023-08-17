import React from "react"
import { generateRandomPolynomial, getRandomNumber } from "../../helpers/functions"
import LimitExampleGraph from "./LimitExampleGraph";
import './styles.css'

const Practice = () => {
  const scaledNode = generateRandomPolynomial(getRandomNumber(1, 4))
  const f = x => scaledNode.evaluate({x});
  const xval = 2;
  const fColor = 'c3';
  const xColor = 'c2';
  const yColor = 'c4';
  return (
    <div>
      <LimitExampleGraph f={f} xval={xval} y={f(xval)} 
          fColor={fColor} xColor={xColor} yColor={yColor} />
    </div>
  )
}

export default Practice