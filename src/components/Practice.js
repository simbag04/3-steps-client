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
import { Hints } from "./Hints";
import { Stars } from "./Stars";

export const Practice = ({ cname, uname, name, title, numProblems }) => {
  const [goToNext, setGoToNext] = useState(false); // manages whether it's time to go to the next question
  const [newQ, setNewQ] = useState(false);
  const correctRef = useRef(null);
  const [qFunction, setQFunction] = useState(() => () => { });
  const [currQ, setCurrQ] = useState({});
  const [showMastered, setShowMastered] = useState(false)
  const [stars, setStars] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [hintsIndex, setHintsIndex] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [classes, setClasses] = useState("");

  const [textInput, setTextInput] = useState("");

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
    setTextInput("")
  }, [newQ, qFunction])

  const handleClick = (option) => {
    if (!goToNext) {
      setClasses('selected')
      setSelectedOption(option)
      correctRef.current = option.correct
    }
  }

  const handleInput = (e) => {
    if (!goToNext) {
      setTextInput(e.target.value);
      correctRef.current = String(currQ.ans) === e.target.value;
    }
  }

  useEffect(() => {
    if (goToNext) {
      if (correctRef.current) {
        setClasses('correct')
      } else {
        setClasses('incorrect')
      }
    }
  }, [goToNext])

  return (
    <div className="flex vertical center medium-gap">
      {!showHints ?
        !showMastered ?
          <>
            <h1 className="title flex horizontal center small-gap">
              <span>{title}: Practice</span>
              <Stars star_goal={stars} />
            </h1>
            {currQ && currQ.title}
            <div className="practice-section">
              <div className="question flex vertical center medium-gap">
                {currQ && currQ.question}

                {currQ && currQ.type === 'mc' &&
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
                }
                {currQ && currQ.type === 'frq' &&
                  <span className="flex horizontal center medium-gap">
                    {currQ.nextToInput}
                    <input type="text" onChange={handleInput} value={textInput} className={classes}></input>
                  </span>
                }
              </div>


              <Stats cname={cname} uname={uname} name={name} correctRef={correctRef}
                goToNext={goToNext} setGoToNext={setGoToNext} setNewQ={setNewQ} numProblems={numProblems} setShowMastered={setShowMastered} setStars={setStars}
                setShowHints={setShowHints} hintsUsed={hintsUsed} setHintsUsed={setHintsUsed}></Stats>
            </div>
          </> :
          <Mastered cname={cname} uname={uname} name={name} title={title} setShowMastered={setShowMastered} />

        : currQ && currQ.hints &&
        <Hints currQ={currQ} setShowHints={setShowHints} hintsIndex={hintsIndex} setHintsIndex={setHintsIndex} />
      }

    </div>
  );
}