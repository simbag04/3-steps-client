/**
 * Practice component
 * This component handles the "practice" content for each topic
 * Parameters: 
 *  - name: name of the topic that is being practiced. This is used to dynamically import the corresponding Question component
 * 
 */

import React, { useEffect, useRef, useState } from "react";
import '../styles/practice.css'
import { Stats } from "./Stats";
import { Mastered } from "./Mastered";

export const Practice = ({ cname, uname, name, title, numProblems }) => {
  const [goToNext, setGoToNext] = useState(false); // manages whether it's time to go to the next question
  const [newQ, setNewQ] = useState(false);
  const correctRef = useRef(null);
  const [qFunction, setQFunction] = useState(() => () => { });
  const [currQ, setCurrQ] = useState({});
  const [showMastered, setShowMastered] = useState(false)


  const [selectedOption, setSelectedOption] = useState(null);
  const [classes, setClasses] = useState("");

  useEffect(() => {
    import(`../topics/${name}/generate-question.js`)
      .then(module => {
        setQFunction(() => module.default);
      })
      .catch(error => {
        console.error(error);
      })
  }, [name])

  useEffect(() => {
    setCurrQ(qFunction());
    setSelectedOption(null);
    setClasses("");
  }, [newQ, qFunction])

  const handleClick = (option) => {
    if (!goToNext) {
      setClasses('selected')
      setSelectedOption(option)
      correctRef.current = option.correct
    }
  }

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
    <div className="flex vertical center medium-gap practice">
      {!showMastered ? 
      <>
      <h1 className="title">{title}: Practice</h1>
      <div className="practice-section">
        {currQ && currQ.type === 'mc' &&
          <div className="question flex vertical center medium-gap">
            {currQ.title}
            {currQ.question}
            <div className="flex horizontal center medium-gap">
              {currQ.input && currQ.input.map((option, index) => {
                return (
                  <label key={index}
                    className= {selectedOption === option ? classes : ""}
                    onClick={() => handleClick(option)}>
                    {option.component}
                  </label>
                )
              })}
            </div>
          </div>
        }

        <Stats cname={cname} uname={uname} name={name} correctRef={correctRef}
          goToNext={goToNext} setGoToNext={setGoToNext} setNewQ={setNewQ} numProblems={numProblems} setShowMastered={setShowMastered}></Stats>
      </div>
      </> : 
      <Mastered cname={cname} uname={uname} name={name} title={title} setShowMastered={setShowMastered}/>
}
    </div>
  );
}