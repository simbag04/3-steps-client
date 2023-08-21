import React, { useEffect, useState, useLayoutEffect, useMemo, useCallback } from "react"
import { generateRandomPolynomial, getRandomNumber, getRandomWithExclusions, shuffleArray } from "../../helpers/functions"
import LimitExampleGraph from "./LimitExampleGraph";
import './styles.css'
import Latex from "../../helpers/Latex";

export const GraphToLimit = ({ inputChangeHandler, nextQuestion, selectedOption, setSelectedOption, regenerate, setShouldChangeColor }) => {
  const [f, setF] = useState();
  const [xval, setXval] = useState(null);
  const [yval, setYval] = useState(null);
  const [options, setOptions] = useState([]);

  // function to generate random graph variables
  const generateGraphVars = useCallback(() => {
    const { node, x } = generateRandomPolynomial(getRandomNumber(1, 4))
    const expression = (x) => node.evaluate({ x });
    const realY = Math.round(expression(x));
    setF(() => expression);
    setXval(x);

    // find yval to be used
    const yvalNum = getRandomNumber(0, 2);
    let y = null;
    if (yvalNum === 0) {
      y = getRandomNumber(-7, 7);
    } else if (yvalNum === 1) {
      y = realY;
    }

    setYval(y);

    // get options
    let newOptions = [];
    const o1 = {
      text: `{\\lim}_{{x \\to ${x}}}{g(x)} = ${realY}`,
      correct: true
    }

    let o2 = {
      text: '',
      correct: false
    }
    const o2Num = getRandomNumber(0, 1);
    if (o2Num === 0 && yvalNum === 0 && y !== realY) {
      o2.text = `{\\lim}_{{x \\to ${x}}}{g(x)} = ${y}`;
    } else if (x !== realY) {
      o2.text = `{\\lim}_{{x \\to ${realY}}}{g(x)} = ${x}`;
    } else {
      const rand = getRandomWithExclusions(-7, 7, [realY])
      o2.text = `{\\lim}_{{x \\to ${x}}}{g(x)} = ${rand}`;
    }

    // set options
    newOptions.push(o1);
    newOptions.push(o2);

    // shuffle options
    newOptions = shuffleArray(newOptions);

    setOptions(newOptions);
    setShouldChangeColor(true);
    nextQuestion();

    /* regenerate is included as a dependency to ensure function runs when parent rand value changes */
    // eslint-disable-next-line 
  }, [nextQuestion, regenerate]);

  // generates graph on render
  useEffect(() => {
    generateGraphVars();
  }, [generateGraphVars]);


  return (
    <div className="flex vertical center">
      <h2>Which limit best represents the following graph?</h2>
      {f &&
        <div className="flex vertical center">
          <h3>Graph of <Latex expression={`\\( g(x) \\)`}></Latex></h3>
          <LimitExampleGraph f={f} xval={xval} y={yval}
            fColor={"f"} xColor={"x"} yColor={"y"} size={400} />
        </div>}
      <div>
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              name="selectedOption"
              value={option}
              onChange={() => {
                setSelectedOption(option)
                inputChangeHandler();
              }}
              checked={selectedOption === option}
            />
            <Latex expression={`\\( ${option.text} \\)`}></Latex>
          </label>
        ))}
      </div>
    </div>
  )
}