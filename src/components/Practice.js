/**
 * Practice component
 * This component handles the "practice" content for each topic
 * Parameters: 
 *  - name: name of the topic that is being practiced. This is used to dynamically import the corresponding Question component
 * 
 */

import React, { lazy, Suspense,useCallback,useEffect,useState } from "react";
import '../styles/practice.css'

export const Practice = ({ name, title }) => {
  const [text, setText] = useState(null); // feedback text, such as "Incorrect"
  const [goToNext, setGoToNext] = useState(false); // manages whether it's time to go to the next question
  const [streak, setStreak] = useState(0); // current streak

  // this function is called to reset variables for the next question
  const nextQuestion = useCallback(() => {
    setText(null);
    setGoToNext(false);
  }, [setGoToNext, setText]);

  // this function removes the feedback text
  // this is intended to be used when there is a change to an answer input
  const inputChangeHandler = () => {
    setText(null);
  }

  /**
   * this function sets variables appropriately based on whether the provided answer was correct
   * @param {boolean or undefined} res correctness of answer
   * 
   */
  const checkAnswer = (res) => {
    if (res === undefined) {
      setText("You must select an answer to continue")
    } else if (res) {
      setGoToNext(true);
      setStreak(streak => streak + 1);
      setText("Good job!")
    } else {
      setGoToNext(true)
      setStreak(0);
      setText("Incorrect!")
    }
  }

  // lazily import component
  const DynamicComponent = lazy(() => import(`../topics/${name}/Question.js`));

  return (
    <div className="flex vertical center medium-gap practice">
      <h1 className="title">{title}: Practice</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent goToNext={goToNext} checkAnswer={checkAnswer} inputChangeHandler={inputChangeHandler} nextQuestion={nextQuestion}/>
      </Suspense>

      {text && <div>{text}</div>}
      <div>Streak: {streak}</div>
    </div>
  );
}