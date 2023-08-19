import React, { useEffect, useState, useLayoutEffect } from "react"
import { generateRandomPolynomial, getRandomNumber } from "../../helpers/functions"
import LimitExampleGraph from "./LimitExampleGraph";
import './styles.css'

const Practice = () => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple']
  const [f, setF] = useState();
  const [xval, setXval] = useState(null);
  const [shouldChangeColor, setShouldChangeColor] = useState(false);

  // function to generate random graph
  const generateGraphVars = () => {
    const { node, x } = generateRandomPolynomial(getRandomNumber(1, 4))
    const expression = (x) => node.evaluate({ x });
    setF(() => expression);
    setXval(x);
    setShouldChangeColor(true);
  }

  // generates graph on render
  useEffect(() => {
    generateGraphVars();
  }, []);
  

  // Changes function graph colors
  useLayoutEffect(() => {
    if (shouldChangeColor) {
      requestAnimationFrame(() => {
        const color = colors[getRandomNumber(0, colors.length - 1)];
        const functionStroke = document.querySelectorAll(".stroke.f");
        const functionFill = document.querySelectorAll(".fill.f");

        const allStroke = document.querySelectorAll(".stroke.x, .stroke.y");
        const allFill = document.querySelectorAll(".fill.x, .fill.y")
  
        functionStroke.forEach((el) => {
          el.style.stroke = color;
        });

        functionFill.forEach((el) => {
          el.style.fill = color;
        })

        allStroke.forEach((el) => {
          el.style.stroke = 'black';
        });

        allFill.forEach((el) => {
          el.style.fill = 'black';
        })
  
        setShouldChangeColor(false);
      });
    }
  }, [shouldChangeColor]);

  return (
    <div>
      {f && <LimitExampleGraph f={f} xval={xval} y={f(xval)}
        fColor={"f"} xColor={"x"} yColor={"y"} size={400} />}
      <button onClick={generateGraphVars}>New Question</button>
    </div>
  )
}

export default Practice