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
import ResizeObserver from "resize-observer-polyfill";
import '../../styles/practice.css'
import { Stats } from "./Stats";
import { Mastered } from "./Mastered";
import { Hints } from "./Hints";
import { Stars } from "../Stars";
import { useWindowSize } from "../../helpers/useWindowSize";

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

  const questionRef = useRef(null); // ref that stores question div
  const [width, setWidth] = useState(0); // width of question
  const [wrap, setWrap] = useState(""); // whether options should wrap
  const [moveStatsDown, setMoveStatsDown] = useState("horizontal"); // whether stats should move down
  const windowWidth = useWindowSize()[0]; // width of window
  const originalWidthRef = useRef(null); // width of question without wrapping

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

  // gets width of question
  useEffect(() => {
    const element = questionRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === element) {
          if (wrap === "") {
            originalWidthRef.current = entry.contentRect.width;
          }
          setWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [questionRef, windowWidth, wrap, showHints, showMastered]);

  // sets structure of question based on widths
  useEffect(() => {
    if (windowWidth > 0 && width > 0.8 * windowWidth) {
      setWrap("wrap");
    } else if (windowWidth > 0 && width + 300 > 0.95 * windowWidth) {
      setMoveStatsDown("vertical");
    } else if (wrap === "wrap" && originalWidthRef && originalWidthRef.current < 0.8 * windowWidth) {
      setWrap("")
    } else if (moveStatsDown === "vertical") {
      if (wrap === "" && originalWidthRef.current + 300 < 0.95 * windowWidth) {
        setMoveStatsDown("horizontal")
      } else if (wrap === "wrap" && width + 300 < 0.95 * windowWidth) {
        setMoveStatsDown("horizontal")
      }
    }
  }, [width, windowWidth, moveStatsDown, wrap])

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
    <div className="flex vertical center medium-gap practice text-center">
      {!showHints ?
        !showMastered ?
          <>
            <span className="flex vertical center text-center">
              {/* Title with stars */}
              <h1 className="title flex horizontal center small-gap">
                <span>{title}: {titleWord}</span>
              </h1>
              <Stars star_goal={stars.star_goal} star_2={stars.star_2} star_3={stars.star_3} streak={stars.streak} current_streak={stars.current_streak} />
            </span>
            {/* Beginning of Question */}
            {currQ && currQ.title}
            <div className={"practice-section " + moveStatsDown}>
              <div className="question flex vertical center medium-gap" ref={questionRef}>
                {currQ && currQ.question}
                {/* Multiple choice input */}
                {currQ && currQ.type === 'mc' &&
                  <div className={`options ` + wrap}>
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
                setShowHints={setShowHints} hintsUsed={hintsUsed} setHintsUsed={setHintsUsed} setTitleWord={setTitleWord} moveStatsDown={moveStatsDown}></Stats>
            </div>
          </> :
          <Mastered cname={cname} uname={uname} name={name} title={title} setShowMastered={setShowMastered} stars={stars} />
        : currQ && currQ.hints &&
        <Hints currQ={currQ} setShowHints={setShowHints} hintsIndex={hintsIndex} setHintsIndex={setHintsIndex} />
      }
    </div>
  );
}