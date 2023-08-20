import React, { useEffect, useState, useLayoutEffect } from "react"
import { generateRandomPolynomial, getRandomNumber, getRandomWithExclusions, shuffleArray } from "../../helpers/functions"
import LimitExampleGraph from "./LimitExampleGraph";
import './styles.css'
import Latex from "../../helpers/Latex";

const Practice = () => {
  const colors = ['red', 'green', 'blue', 'orange', 'purple']
  const [f, setF] = useState();
  const [xval, setXval] = useState(null);
  const [yval, setYval] = useState(null);
  const [shouldChangeColor, setShouldChangeColor] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // function to generate random graph
  const generateGraphVars = () => {
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

        const holeFill = document.querySelector(".hole.fill");

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
        });

        if (holeFill !== null) {
          holeFill.style.fill = 'white';
        }

        setShouldChangeColor(false);
      });
    }
  }, [shouldChangeColor]);

  return (
    <div className="flex vertical center">
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
              onChange={() => setSelectedOption(option)}
              checked={selectedOption === option}
            />
            <Latex expression={`\\( ${option.text} \\)`}></Latex>
          </label>
        ))}
      </div>
      <button onClick={generateGraphVars}>New Question</button>
    </div>
  )
}

export default Practice