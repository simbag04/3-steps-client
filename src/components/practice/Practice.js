/**
 * Practice component
 * This component handles the "practice" content for each topic
 * Parameters: 
 *  - cname: url name of course
 *  - uname: url name of unit
 *  - name: url name of topic
 *  - title: topic name
 *  - numProblems: streak needed to get first star
 */

import React, { useEffect, useRef, useState } from "react";
import '../../styles/practice.css'
import { Stats } from "./Stats";
import { Mastered } from "./Mastered";
import { Hints } from "./Hints";
import { Stars } from "../Stars";

export const Practice = ({ cname, uname, name, title, numProblems }) => {
  const [goToNext, setGoToNext] = useState(false); // manages whether it's time to go to the next question
  const [newQ, setNewQ] = useState(false); // renders new question on change
  const correctRef = useRef(null); // stores whether current answer is correct
  const [qFunction, setQFunction] = useState(() => () => { }); // function to generate question
  const [currQ, setCurrQ] = useState({}); // current question information
  const [showMastered, setShowMastered] = useState(false) // stores whether to show mastered page
  const [stars, setStars] = useState({}); // stores stars info for user for this topic
  const [showHints, setShowHints] = useState(false); // stores whether to show hints page
  const [hintsIndex, setHintsIndex] = useState(0); // stores what hint user is on
  const [hintsUsed, setHintsUsed] = useState(false); // stores whether hints were used
  const [titleWord, setTitleWord] = useState("Practice"); // Practice or Review

  const [selectedOption, setSelectedOption] = useState(null); // current option that was selected
  const [classes, setClasses] = useState(""); // stores classes for styling

  const [textInput, setTextInput] = useState(""); // stores text input

  // dynamically import relevant topic question
  useEffect(() => {
    import(`../../topics/${name}/generate-question.js`)
      .then(module => {
        setQFunction(() => module.default);
      })
      .catch(error => {
        console.error(error);
      })
    setShowHints(false);
  }, [name])

  // generates new question and sets variable appropriately
  useEffect(() => {
    setCurrQ(qFunction());
    setSelectedOption(null);
    setClasses("");
    setHintsIndex(0)
    setHintsUsed(false);
    setTextInput("")
  }, [newQ, qFunction])

  // handler for mc input
  const handleClick = (option) => {
    if (!goToNext) {
      setClasses('selected')
      setSelectedOption(option)
      correctRef.current = option.correct
    }
  }

  // handler for frq input
  const handleInput = (e) => {
    if (!goToNext) {
      setTextInput(e.target.value);
      correctRef.current = String(currQ.ans) === e.target.value;
    }
  }

  // sets classes based on whether answer is correct
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
    <div className="flex vertical center medium-gap practice">
      {!showHints ?
        !showMastered ?
          <>
            <span className="flex horizontal center small-gap">
              {/* Title with stars */}
              <h1 className="title flex horizontal center small-gap">
                <span>{title}: {titleWord}</span>
              </h1>
              <Stars star_goal={stars.star_goal} star_2={stars.star_2} star_3={stars.star_3} streak={stars.streak} current_streak={stars.current_streak} />
            </span>
            {/* Beginning of Question */}
            {currQ && currQ.title}
            <div className="practice-section">
              <div className="question flex vertical center medium-gap">
                {currQ && currQ.question}
                {/* Multiple choice input */}
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
                {/* FRQ Input */}
                {currQ && currQ.type === 'frq' &&
                  <span className="flex horizontal center medium-gap">
                    {currQ.nextToInput}
                    <input type="text" onChange={handleInput} value={textInput} className={classes}></input>
                  </span>
                }
              </div>

              {/* Stats box */}
              <Stats cname={cname} uname={uname} name={name} correctRef={correctRef}
                goToNext={goToNext} setGoToNext={setGoToNext} setNewQ={setNewQ} numProblems={numProblems} setShowMastered={setShowMastered} setStars={setStars}
                setShowHints={setShowHints} hintsUsed={hintsUsed} setHintsUsed={setHintsUsed} setTitleWord={setTitleWord}></Stats>
            </div>
          </> :
          <Mastered cname={cname} uname={uname} name={name} title={title} setShowMastered={setShowMastered} stars={stars}/>
        : currQ && currQ.hints &&
        <Hints currQ={currQ} setShowHints={setShowHints} hintsIndex={hintsIndex} setHintsIndex={setHintsIndex} />
      }
    </div>
  );
}