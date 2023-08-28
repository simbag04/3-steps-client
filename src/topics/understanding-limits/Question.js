/**
 * Question component
 * Generates question for this topic
 * Parameters
 *  - goToNext: parent state that manages if ready to move to next question
 *  - inputChangeHandler: parent function that handles input changes
 *  - setCorrect: parent function that sets whether current answer is correct
 *  - newQ: dummy state variable that makes new question generate
 */
import React, { useState, useMemo, useEffect, useCallback, useRef } from "react"
import { getRandomNumber, shuffleArray } from "../../helpers/functions"
import { graphToLimit, limitToGraph } from "./generate-question";
import './styles.css'

const Question = ({ goToNext, correctRef, newQ }) => {
  const colors = useMemo(() => ['red', 'green', 'blue', 'orange', 'purple'], []);
  const selectedOptionRef = useRef(null);
  const selectedIndexRef = useRef(null);
  const optionRefs = useRef([]);
  // question stuff
  const [title, setTitle] = useState(null);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState(null);

  /**
   * generates a new question
   */
  const nextButtonHandler = useCallback(() => {
    console.log("next")
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
    selectedOptionRef.current = null;
    selectedIndexRef.current = null;
    optionRefs.current.forEach((ref) => {
      ref.current.className = "";
    })

    // set color for graphs
    document.documentElement.style.setProperty('--random-color',
      colors[getRandomNumber(0, colors.length - 1)])

  }, [colors])

  useEffect(() => {
    nextButtonHandler()
  }, [nextButtonHandler, newQ])

  const changeStyling = useCallback(() => {
    if (goToNext) {
      if (selectedOptionRef.current && selectedOptionRef.current.correct) {
        optionRefs.current.forEach((ref, i) => {
          if (i === selectedIndexRef.current) {
            ref.current.classList.add("correct");
          } else {
            ref.current.classList.remove("correct", "incorrect");
          }
        })
      } else {
        optionRefs.current.forEach((ref, i) => {
          if (i === selectedIndexRef.current) {
            ref.current.classList.add("incorrect");
          } else {
            ref.current.classList.remove("correct", "incorrect");
          }
        });
      }
    } else {
      optionRefs.current.forEach((ref, i) => {
        if (i === selectedIndexRef.current) {
          ref.current.classList.add('selected');
        } else {
          ref.current.className = "";
        }
      })
    }
  }, [goToNext])
  
  useEffect(() => {
    console.log("here")
    changeStyling();
  }, [goToNext, changeStyling])

  const handleClick = (option, index) => {
    if (!goToNext) {
      selectedOptionRef.current = option
      correctRef.current = option.correct
      selectedIndexRef.current = index
    }
    changeStyling();
  }

  useEffect(() => {
    console.log("question rerender")
  })

  return (
    <div className="question flex vertical center medium-gap">
      {title}
      {question}
      <div className="flex horizontal center medium-gap">
        {options && options.map((option, index) => {
          optionRefs.current[index] = optionRefs.current[index] || React.createRef();
          return (
            <label key={index}
              ref={optionRefs.current[index]}
              onClick={() => handleClick(option, index)}>
              {option.component}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default Question
