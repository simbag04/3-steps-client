import React, { useState, useMemo, useLayoutEffect } from "react"
import { getRandomNumber } from "../../helpers/functions"
import { GraphToLimit } from "./GraphToLimit";
import { LimitToGraph } from "./LimitToGraph";

const Question = ({ goToNext, checkAnswer, inputChangeHandler, nextQuestion }) => {
  const colors = useMemo(() => ['red', 'green', 'blue', 'orange', 'purple'], []);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rand, setRand] = useState(0)
  const [regenerate, setRegenerate] = useState(false);
  const [shouldChangeColor, setShouldChangeColor] = useState(false);

  const nextButtonHandler = () => {
    setRand(getRandomNumber(0, 1));
    setRegenerate((regenerate) => !regenerate);
  }

  const checkButtonHandler = () => {
    let res = undefined;
    if (!selectedOption) {
      res = undefined;
    } else if (selectedOption.correct) {
      res = true;
    } else {
      res = false;
    }
    checkAnswer(res);
  }

  // Changes function graph colors after it has rendered
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
  }, [shouldChangeColor, colors]);

  return (
    <div className="flex vertical center">
      {rand === 0 ?
        <GraphToLimit
          inputChangeHandler={inputChangeHandler}
          nextQuestion={nextQuestion}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          regenerate={regenerate}
          setShouldChangeColor={setShouldChangeColor}></GraphToLimit>
        :
        <LimitToGraph inputChangeHandler={inputChangeHandler}
          nextQuestion={nextQuestion}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          regenerate={regenerate}
          setShouldChangeColor={setShouldChangeColor}></LimitToGraph>
      }
      {!goToNext && <button onClick={checkButtonHandler}>Check</button>}
      {goToNext && <button onClick={nextButtonHandler}>Next</button>}

    </div>
  )
}

export default Question