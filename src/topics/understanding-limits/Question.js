/**
 * Question component
 * Generates question for this topic
 * Parameters
 *  - goToNext: parent state that manages if ready to move to next question
 *  - inputChangeHandler: parent function that handles input changes
 *  - setCorrect: parent function that sets whether current answer is correct
 *  - newQ: dummy state variable that makes new question generate
 */
import React, { useState, useMemo, useEffect, useCallback } from "react"
import { getRandomNumber, shuffleArray } from "../../helpers/functions"
import { graphToLimit, limitToGraph } from "./generate-question";
import './styles.css'

const Question = ({ goToNext, inputChangeHandler, setCorrect, newQ }) => {
  const colors = useMemo(() => ['red', 'green', 'blue', 'orange', 'purple'], []);
  const [selectedOption, setSelectedOption] = useState(null);
  const [classes, setClasses] = useState("");

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

  }, [colors])

  useEffect(() => {
    nextButtonHandler()
  }, [nextButtonHandler, newQ])

  useEffect(() => {
    if (goToNext) {
      if (selectedOption.correct) {
        setClasses('correct')
      } else {
        setClasses('incorrect')
      }
    }
  }, [goToNext, selectedOption])

  return (
    <div className="question flex vertical center medium-gap">
      {title}
      {question}
      <div className="flex horizontal center medium-gap">
        {options && options.map((option, index) => (
          <label key={index} className={selectedOption === option ? classes : ""}
            onClick={() => {
              if (!goToNext) {
                setSelectedOption(option)
                setClasses("selected")
                setCorrect(option.correct)
                inputChangeHandler();
              }
            }}>
            {option.component}
          </label>
        ))}
      </div>  
    </div>
  )
}

export default Question
