import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../App";
import { ApiContext } from "../App";
import { useNavigate } from "react-router-dom";

export const Stats = ({ cname, uname, name, correctRef, goToNext, setGoToNext, setNewQ, setShowMastered, numProblems }) => {
  const [text, setText] = useState("none"); // feedback text, such as "Incorrect"
  const [feedback, setFeedback] = useState("");
  const [streak, setStreak] = useState(0); // current streak
  const [bestStreak, setBestStreak] = useState(0); // all time best streak
  const [totalCorrect, setTotalCorrect] = useState(0); // total problems correct
  const [totalAttempted, setTotalAttempted] = useState(0); // total problems attempted

  const { user } = useContext(UserContext);
  const apiLink = useContext(ApiContext);
  const nav = useNavigate();

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

  const backToTopicsButtonHandler = () => {
    nav(`/${cname}/${uname}`)
  }

  /**
 * this function sets variables appropriately based on whether the provided answer was correct
 * it also makes the api call to store the data in the database
 * @param {boolean or undefined} res correctness of answer
 * 
 */
  const checkAnswer = async () => {
    if (correctRef.current === null) {
      setText("You must select an answer to continue")
    } else {
      if (correctRef.current) {
        setGoToNext(true);
        if (bestStreak < numProblems && streak + 1 === numProblems) {
          setShowMastered(true)
        }
        setStreak(streak => streak + 1);
        setBestStreak(Math.max(streak + 1, bestStreak))
        setTotalCorrect(totalCorrect => totalCorrect + 1);
        setText("Good job!")
        setFeedback("good")
      } else {
        setGoToNext(true)
        setStreak(0);
        setText("Incorrect!")
        setFeedback("bad")
      }
      setTotalAttempted(totalAttempted => totalAttempted + 1);

      if (user) {
        try {
          const body = { result: correctRef.current }
          await fetch(`${apiLink}/topic/${name}/question`, {
            method: 'put',
            body: JSON.stringify(body),
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

  // this function is called to reset variables for the next question
  const nextQuestion = useCallback(() => {
    setText("none");
    setGoToNext(false);
    correctRef.current = null;
    setNewQ(newQ => !newQ);
  }, [setGoToNext, setText, correctRef, setNewQ]);

  return (
    <div className="flex vertical center large-gap">
      <div className="stats flex vertical center medium-gap">
        <h2>Progress</h2>
        <div>Streak: {streak}</div>
        <div>Best Streak: {bestStreak}</div>
        <div>Problems correct: {totalCorrect}</div>
        <div>Problems attempted: {totalAttempted}</div>
        <button onClick={backToTopicsButtonHandler}>Back to Topics</button>
        {!goToNext && <button onClick={checkAnswer}>Check</button>}
        {goToNext && <button onClick={nextQuestion}>Next</button>}
      </div>
      <div className={"feedback " + 
      (text !== "none" ? "visible" : "invisible") + " " + feedback}>
        {<div>{text}</div>}
      </div>
    </div>

  )
}