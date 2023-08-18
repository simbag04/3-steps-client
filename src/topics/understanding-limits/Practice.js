import React, { useEffect, useState } from "react"
import { generateRandomPolynomial, getRandomNumber } from "../../helpers/functions"
import LimitExampleGraph from "./LimitExampleGraph";
import './styles.css'

const Practice = () => {
  const [f, setF] = useState();
  const [xval, setXval] = useState(null);
  
  const generateGraphVars = () => {
    const { node, x } = generateRandomPolynomial(getRandomNumber(1, 4))
    const expression = (x) => node.evaluate({x});
    setF(() => expression);
    setXval(x);
  }

  useEffect(() => {
    generateGraphVars();
  }, []);

  return (
    <div>
      {f && <LimitExampleGraph f={f} xval={xval} y={f(xval)}
        fColor={""} xColor={""} yColor={""} size={400}/>}
      <button onClick={generateGraphVars}>New Question</button>
    </div>
  )
}

export default Practice