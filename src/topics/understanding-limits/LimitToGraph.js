import { useCallback, useEffect, useState, useMemo, useLayoutEffect } from "react";
import { generateRandomPolynomial, generateRandomPolynomialWithPoint, getRandomNumber, getRandomWithExclusions, shuffleArray } from "../../helpers/functions";
import LimitExampleGraph from "./LimitExampleGraph";
import Latex from "../../helpers/Latex";

export const LimitToGraph = ({ inputChangeHandler, nextQuestion, selectedOption, setSelectedOption, regenerate, setShouldChangeColor }) => {

  const [options, setOptions] = useState([]);
  const [text, setText] = useState(null);

  const generateGraphVars = useCallback(() => {
    const g1 = generateRandomPolynomial(getRandomNumber(1, 4));
    const node1 = g1.node;
    const x1 = g1.x;
    const f1 = x => node1.evaluate({ x });
    const realY1 = Math.round(f1(x1));

    let yvalNum = getRandomNumber(0, 2);
    let y1 = null;
    if (yvalNum === 0) {
      y1 = getRandomNumber(-7, 7);
    } else if (yvalNum === 1) {
      y1 = realY1;
    }

    setText(`{\\lim}_{{x \\to ${x1}}}{g(x)} = ${realY1}`)

    const o1 = {
      text: <div>
        <h3>Graph of <Latex expression={`\\( g(x) \\)`} /></h3>
        <LimitExampleGraph f={f1} xval={x1} y={y1} fColor={"f"} xColor={"x"} yColor={"y"} size={300} />
      </div>,
      correct: true
    }

    let x2 = realY1;
    let y2 = x1;

    if (x2 === y2) {
      const n = getRandomNumber(0, 1);
      if (n === 0) {
        x2 = getRandomWithExclusions(-7, 7, [x2, -1, 0, 1]);
      } else {
        y2 = getRandomWithExclusions(-7, 7, [y2, -1, 0, 1]);
      }
    }

    const g2 = generateRandomPolynomialWithPoint(getRandomNumber(1, 4), x2, y2);
    const f2 = x => g2.evaluate({ x });

    const o2 = {
      text: <div>
        <h3>Graph of <Latex expression={`\\( g(x) \\)`} /></h3>
        <LimitExampleGraph f={f2} xval={x2} y={y2} fColor={"f"} xColor={"x"} yColor={"y"} size={300} />
      </div>,
      correct: false
    }

    let newOptions = [o1, o2];
    newOptions = shuffleArray(newOptions)
    
    setOptions(newOptions);
    setShouldChangeColor(true);
    nextQuestion();

  }, [nextQuestion, regenerate])

  useEffect(() => {
    generateGraphVars();
  }, [generateGraphVars])



  return (
    <div>
      <div>
        <h2>Which graph best represents the following limit?</h2>
        <Latex expression={`\\( ${text} \\)`} />
      </div>
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
            {option.text}
          </label>
        ))}
      </div>
    </div>
  )
}