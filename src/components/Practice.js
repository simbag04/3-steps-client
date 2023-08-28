/**
 * Practice component
 * This component handles the "practice" content for each topic
 * Parameters: 
 *  - name: name of the topic that is being practiced. This is used to dynamically import the corresponding Question component
 * 
 */

import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import '../styles/practice.css'
import { Stats } from "./Stats";

export const Practice = ({ cname, uname, name, title }) => {
  const [goToNext, setGoToNext] = useState(false); // manages whether it's time to go to the next question
  const [newQ, setNewQ] = useState(false);
  const correctRef = useRef(null);

  // lazily import component
  const Question = lazy(() => import(`../topics/${name}/Question.js`));

  useEffect(() => {
    console.log("rerender")
  })

  return (
    <div className="flex vertical center medium-gap practice">
      <h1 className="title">{title}: Practice</h1>
      <div className="practice-section">
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Question goToNext={goToNext} correctRef={correctRef} newQ={newQ}/>
          </Suspense>
        </div>

        <Stats cname={cname} uname={uname} name={name} correctRef={correctRef}
        goToNext={goToNext} setGoToNext={setGoToNext} setNewQ={setNewQ}></Stats>
      </div>

    </div>
  );
}

/**
 *         <div className="stats flex vertical center medium-gap">
          <h2>Progress</h2>
          {text && <div>{text}</div>}
          <div>Streak: {streak}</div>
          <div>Best Streak: {bestStreak}</div>
          <div>Problems correct: {totalCorrect}</div>
          <div>Problems attempted: {totalAttempted}</div>
          <button onClick={backToTopicsButtonHandler}>Back to Topics</button>
          {!goToNext && <button onClick={checkAnswer}>Check</button>}
          {goToNext && <button onClick={nextQuestion}>Next</button>}
        </div>
 */