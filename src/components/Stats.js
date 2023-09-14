import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../App";
import { ApiContext } from "../App";
import { useNavigate } from "react-router-dom";

export const Stats = ({ cname, uname, name, correctRef, goToNext, setGoToNext, setNewQ, setShowMastered, numProblems, setMastered, setShowHints, hintsUsed, setHintsUsed }) => {
  const [text, setText] = useState(""); // feedback text, such as "Incorrect"
  const [feedback, setFeedback] = useState("");
  const [dbEntry, setDbEntry] = useState({});

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
          setDbEntry(json.entry);
          setMastered(json.entry.star_1_achieved_on)

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
        setText("Good job!")
        setFeedback("good")
      } else {
        setText("Incorrect!")
        setFeedback("bad")
      }
      setGoToNext(true);

      if (!hintsUsed) {
        if (user) {
          try {
            const body = { result: correctRef.current }
            const apiRes = await fetch(`${apiLink}/topic/${name}/question`, {
              method: 'put',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + localStorage.getItem("token")
              }
            })

            const json = await apiRes.json();
            const prevMastered = dbEntry.star_1_achieved_on;
            setDbEntry(json.entry)
            if (json.entry.star_1_achieved_on !== prevMastered) {
              setShowMastered(true)
            }
            setMastered(json.entry.star_1_achieved_on);

          } catch (err) {
            console.log(err)
          }
        }
      }

    }
  }

  // this function is called to reset variables for the next question
  const nextQuestion = useCallback(() => {
    setText("");
    setFeedback("")
    setGoToNext(false);
    correctRef.current = null;
    setNewQ(newQ => !newQ);
  }, [setGoToNext, setText, correctRef, setNewQ]);

  const showHints = () => {
    setShowHints(true);
    setHintsUsed(true);
  }

  const login = () => nav('/login');
  const register = () => nav('/register');

  return (
    <div className="flex vertical center large-gap">
      <div className="stats flex vertical center medium-gap">
        <h2>Progress</h2>
        {user ?
          <>
            <div>Streak: {dbEntry.current_streak}</div>
            <div>Best Streak: {dbEntry.best_streak}</div>
            <div>Problems correct: {dbEntry.problems_correct}</div>
            <div>Problems attempted: {dbEntry.problems_attempted}</div>
          </> :
          <>
            <div>Please sign in to save your progress!</div>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
          </>
        }

        <button onClick={backToTopicsButtonHandler}>Back to Topics</button>
        {!goToNext && <button onClick={checkAnswer}>Check</button>}
        {goToNext && <button onClick={nextQuestion}>Next</button>}
        {!goToNext && <button onClick={showHints}>I Need a Hint!</button>}
      </div>
      {text !== "" ?
        <div className={"feedback " + feedback}>
          {<div>{text}</div>}
        </div> : null
      }
    </div>

  )
}