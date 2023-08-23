/**
 * Question component
 * Generates question for this topic
 * Parameters
 *  - goToNext: parent state that manages if ready to move to next question
 *  - checkAnswer: parent function that handles logic of wat to do upon response
 *  - inputChangeHandler: parent function that handles input changes
 *  - nextQuestion: parent function that handles moving on to nextQuestion
 */
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

  /**
   * generates a new question
   */
  const nextButtonHandler = useCallback(() => {
    // determine type of question to generate
    const rand = getRandomNumber(0, 1);
    let q = null;
    if (rand === 0) {
      q = graphToLimit();
    } else {
      q = limitToGraph();
    }

    // shuffle options and set state appropriately
    q.options = shuffleArray(q.options);
    setTitle(q.title)
    setQuestion(q.question);
    setOptions(q.options);
    setSelectedOption(null);

    // set color for graphs
    document.documentElement.style.setProperty('--random-color',
      colors[getRandomNumber(0, colors.length - 1)])

    // setup for next question
    nextQuestion();
  }, [nextQuestion, colors])

  /**
   * checks the answer option selected and uses parent checkAnswer to appropriately display content
   */
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
    <div className="question flex vertical center medium-gap">
      {title}
      {question}
      <div className="flex horizontal center medium-gap">
        {options && options.map((option, index) => (
          <label key={index} className={selectedOption === option ? 'selected' : ""}>
            <input
              type="radio"
              name="selectedOption"
              value={option}
              onChange={() => {
                if (!goToNext) {
                  setSelectedOption(option)
                  inputChangeHandler();
                }
              }}
            />
            {option.component}
          </label>
        ))}
      </div>
      {!goToNext && <button onClick={checkButtonHandler}>Check</button>}
      {goToNext && <button onClick={nextButtonHandler}>Next</button>}
    </div>
  )
}

export default Question