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
import star from '../helpers/star.svg'
import { Hints } from "./Hints";

export const Practice = ({ cname, uname, name, title, numProblems }) => {
  const [goToNext, setGoToNext] = useState(false); // manages whether it's time to go to the next question
  const [newQ, setNewQ] = useState(false);
  const correctRef = useRef(null);
  const [qFunction, setQFunction] = useState(() => () => { });
  const [currQ, setCurrQ] = useState({});
  const [showMastered, setShowMastered] = useState(false)
  const [mastered, setMastered] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintsIndex, setHintsIndex] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(false);

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

    setShowHints(false);
  }, [name])

  useEffect(() => {
    setCurrQ(qFunction());
    setSelectedOption(null);
    setClasses("");
    setHintsIndex(0)
    setHintsUsed(false);
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
    <div className="flex vertical center medium-gap">
      {!showHints ?
        !showMastered ?
          <>
            <h1 className="title flex horizontal center small-gap">
              <span>{title}: Practice</span>
              <span className="flex horizontal center"> {mastered ? <img src={star} alt="star" /> : null}</span>
            </h1>
            <div className="practice-section">
              {currQ && currQ.type === 'mc' &&
                <div className="question flex vertical center medium-gap">
                  {currQ.title}
                  {currQ.question}
                  <div className="flex horizontal center medium-gap">
                    {currQ.input && currQ.input.map((option, index) => {
                      return (
                        <label key={index}
                          className={selectedOption === option ? classes : ""}
                          onClick={() => handleClick(option)}>
                          {option.component}
                        </label>
                      )
                    })}
                  </div>
                </div>
              }

              <Stats cname={cname} uname={uname} name={name} correctRef={correctRef}
                goToNext={goToNext} setGoToNext={setGoToNext} setNewQ={setNewQ} numProblems={numProblems} setShowMastered={setShowMastered} setMastered={setMastered}
                setShowHints={setShowHints} hintsUsed={hintsUsed} setHintsUsed={setHintsUsed}></Stats>
            </div>
          </> :
          <Mastered cname={cname} uname={uname} name={name} title={title} setShowMastered={setShowMastered} />

        : currQ && currQ.hints && 
        <Hints currQ={currQ} setShowHints={setShowHints} hintsIndex={hintsIndex} setHintsIndex={setHintsIndex}/>
      }

    </div>
  );
}

/**
 * 
 */