import React, { useState, useMemo, useEffect, useCallback } from "react"
import { getRandomNumber, shuffleArray } from "../../helpers/functions"
import { graphToLimit, limitToGraph } from "./generate-question";
import './styles.css'

const Question = ({ goToNext, checkAnswer, inputChangeHandler, nextQuestion }) => {
  const colors = useMemo(() => ['red', 'green', 'blue', 'orange', 'purple'], []);
  const [selectedOption, setSelectedOption] = useState(null);

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
    
    // set color for graphs
    document.documentElement.style.setProperty('--random-color',
      colors[getRandomNumber(0, colors.length - 1)])
      
    nextQuestion();
  }, [nextQuestion, colors])

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