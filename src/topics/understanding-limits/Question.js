import React, { useState, useMemo, useLayoutEffect, useEffect, useCallback } from "react"
import { getRandomNumber, shuffleArray } from "../../helpers/functions"
import { graphToLimit, limitToGraph } from "./generate-question";

const Question = ({ goToNext, checkAnswer, inputChangeHandler, nextQuestion }) => {
  const colors = useMemo(() => ['red', 'green', 'blue', 'orange', 'purple'], []);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shouldChangeColor, setShouldChangeColor] = useState(false);

  // question stuff
  const [title, setTitle] = useState(null);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState(null);

  const nextButtonHandler = useCallback(() => {
    const rand = getRandomNumber(0, 1);
    let q = null;
    if (rand === 0) {
      q = graphToLimit();
    } else {
      q = limitToGraph();
    }

    q.options = shuffleArray(q.options);
    setTitle(q.title)
    setQuestion(q.question);
    setOptions(q.options);
    setShouldChangeColor(true);
    nextQuestion();
  }, [nextQuestion])

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

  useEffect(() => {
    nextButtonHandler()
  }, [nextButtonHandler])

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
      {title}
      {question}
      {options && options.map((option, index) => (
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
          {option.component}
        </label>
      ))}
      {!goToNext && <button onClick={checkButtonHandler}>Check</button>}
      {goToNext && <button onClick={nextButtonHandler}>Next</button>}
    </div>
  )
}

export default Question