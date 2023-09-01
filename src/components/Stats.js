import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../App";
import { ApiContext } from "../App";
import { useNavigate } from "react-router-dom";

export const Stats = ({ cname, uname, name, correctRef, goToNext, setGoToNext, setNewQ, setShowMastered, numProblems, setMastered, setShowHints, hintsUsed, setHintsUsed }) => {
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
            console.log()

            if (json.entry.best_streak >= numProblems) {
              setMastered(true);
            }
          }
        } catch (err) {
          console.log(err)
        }
      }
    }

    setVariables().catch(console.error)
  }, [apiLink, name, user, numProblems, setMastered])

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
      return;
    } else {
      if (correctRef.current) {
        setGoToNext(true);
        if (!hintsUsed) {
          if (bestStreak < numProblems && streak + 1 === numProblems) {
            setShowMastered(true)
          }
          if (bestStreak >= numProblems) setMastered(true);
          setStreak(streak => streak + 1);
          setBestStreak(Math.max(streak + 1, bestStreak))
          setTotalCorrect(totalCorrect => totalCorrect + 1);
          setTotalAttempted(totalAttempted => totalAttempted + 1);
        }

        setText("Good job!")
        setFeedback("good")
      } else {
        if (!hintsUsed) {
          setStreak(0);
          setTotalAttempted(totalAttempted => totalAttempted + 1);
        }
        setGoToNext(true)
        setText("Incorrect!")
        setFeedback("bad")
      }

      if (!hintsUsed) {
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
  }

  // this function is called to reset variables for the next question
  const nextQuestion = useCallback(() => {
    setText("none");
    setFeedback("")
    setGoToNext(false);
    correctRef.current = null;
    setNewQ(newQ => !newQ);
  }, [setGoToNext, setText, correctRef, setNewQ]);

  const showHints = () => {
    setShowHints(true);
    setHintsUsed(true);
  }

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
        {!goToNext && <button onClick={showHints}>I Need a Hint!</button>}
      </div>
      <div className={"feedback " +
        (text !== "none" ? "visible" : "invisible") + " " + feedback}>
        {<div>{text}</div>}
      </div>
    </div>

  )
}