/**
 * Practice component
 * This component handles the "practice" content for each topic
 * Parameters: 
 *  - name: name of the topic that is being practiced. This is used to dynamically import the corresponding Question component
 * 
 */

import React, { lazy, Suspense, useCallback, useContext, useEffect, useState } from "react";
import '../styles/practice.css'
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";
import { ApiContext } from "../App";

export const Practice = ({ cname, uname, name, title }) => {
  const [text, setText] = useState(null); // feedback text, such as "Incorrect"
  const [goToNext, setGoToNext] = useState(false); // manages whether it's time to go to the next question
  const [newQ, setNewQ] = useState(false);
  const [streak, setStreak] = useState(0); // current streak
  const [bestStreak, setBestStreak] = useState(0); // all time best streak
  const [totalCorrect, setTotalCorrect] = useState(0); // total problems correct
  const [totalAttempted, setTotalAttempted] = useState(0); // total problems attempted
  const [correct, setCorrect] = useState(null);

  const nav = useNavigate();
  const { user } = useContext(UserContext);
  const apiLink = useContext(ApiContext);

  // set variables based on database
  useEffect(() => {
    const setVariables = async () => {
      if (user) {
        try {
          const apiRes = await fetch(`${apiLink}/topic/${name}/question`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + localStorage.getItem("token")
            }
          })

          const json = await apiRes.json();

          if (!json.new_topic) {
            setStreak(json.entry.current_streak);
            setTotalAttempted(json.entry.problems_attempted)
            setTotalCorrect(json.entry.problems_correct)
            setBestStreak(json.entry.best_streak)
          }
        } catch (err) {
          console.log(err)
        }
      }
    }

    setVariables().catch(console.error)
  }, [apiLink, name, user])

  // this function is called to reset variables for the next question
  const nextQuestion = useCallback(() => {
    setText(null);
    setGoToNext(false);
    setCorrect(null);
    setNewQ(newQ => !newQ);
  }, [setGoToNext, setText]);

  // this function removes the feedback text
  // this is intended to be used when there is a change to an answer input
  const inputChangeHandler = () => {
    setText(null);
  }

  const backToTopicsButtonHandler = () => {
    nav(`/${cname}/${uname}`)
  }

  /**
   * this function sets variables appropriately based on whether the provided answer was correct
   * it also makes the api call to store the data in the database
   * @param {boolean or undefined} res correctness of answer
   * 
   */
  const checkAnswer = async (res) => {
    if (correct === null) {
      setText("You must select an answer to continue")
    } else {
      if (correct) {
        setGoToNext(true);
        setStreak(streak => streak + 1);
        setBestStreak(Math.max(streak + 1, bestStreak))
        setTotalCorrect(totalCorrect => totalCorrect + 1);
        setText("Good job!")
      } else {
        setGoToNext(true)
        setStreak(0);
        setText("Incorrect!")
      }
      setTotalAttempted(totalAttempted => totalAttempted + 1);

      if (user) {
        try {
          await fetch(`${apiLink}/topic/${name}/question`, {
            method: 'put',
            body: JSON.stringify({ result: res }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + localStorage.getItem("token")
            }
          })

        } catch (err) {
          console.log(err)
        }
      }
    }
  }

  // lazily import component
  const Question = lazy(() => import(`../topics/${name}/Question.js`));

  return (
    <div className="flex vertical center medium-gap practice">
      <h1 className="title">{title}: Practice</h1>
      <div className="practice-section">
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Question goToNext={goToNext} inputChangeHandler={inputChangeHandler} setCorrect={setCorrect} newQ={newQ}/>
          </Suspense>
        </div>
        <div className="stats flex vertical center medium-gap">
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
      </div>

    </div>
  );
}