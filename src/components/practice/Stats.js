/**
 * Stats component
 * This is the "Progress" box on the Practice Page
 * Parameters: 
 *  - cname: url name of course
 *  - uname: url name of unit
 *  - name: url name of topic
 *  - correctRef: represents if inputted answer is correct
 *  - goToNext/setGoToNext: state to represent if user is ready to move on to next question
 *  - setNewQ: state that renders new question on change
 *  - setShowMastered: state that shows "Mastered" page when true
 *  - numProblems: streak that user must get for star 1
 *  - setStars: info about the stars user has earned on this topic
 *  - setShowHints: state that shows "Hints" page when true
 *  - hintsUsed/setHintsUsed: state that represents what hint the user is currently on
 */
import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../../App";
import { ApiContext } from "../../App";
import { useNavigate } from "react-router-dom";

export const Stats = ({ cname, uname, name, correctRef, goToNext, setGoToNext, setNewQ, setShowMastered, numProblems, setStars, setShowHints, hintsUsed, setHintsUsed }) => {
  const [text, setText] = useState(""); // feedback text, such as "Incorrect"
  const [feedback, setFeedback] = useState(""); // added to feedback element classes for styling
  const [dbEntry, setDbEntry] = useState({}); // entry for this user for this topic in DB

  const { user } = useContext(UserContext); 
  const apiLink = useContext(ApiContext);
  const nav = useNavigate();

  // set variables based on database
  useEffect(() => {
    const setVariables = async () => {
      if (user) {
        try {
          // create http req
          const apiRes = await fetch(`${apiLink}/topic/${name}/question`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'bearer ' + localStorage.getItem("token")
            }
          })
          const json = await apiRes.json();

          // set variables
          setDbEntry(json.entry);
          setStars({
            star_goal: json.entry.next_star_goal,
            star_2: json.entry.star_2_review_dates,
            star_3: json.entry.star_3_review_dates,
            streak: numProblems,
            current_streak: json.entry.best_streak
          })
        } catch (err) {
          console.log(err)
        }
      }
    }

    setVariables().catch(console.error)
  }, [apiLink, name, user, numProblems, setStars])

  const backToTopicsButtonHandler = () => nav(`/${cname}/${uname}`)

  /**
 * this function sets variables appropriately based on whether the provided answer was correct
 * it also makes the api call to store the data in the database
 * @param {boolean or undefined} res correctness of answer
 * 
 */
  const checkAnswer = async () => {
    if (correctRef.current === null) {
      // no answer selected
      setText("You must select an answer to continue")
      return;
    } else {
      if (correctRef.current) {
        // correct answer
        setText("Good job!")
        setFeedback("good")
      } else {
        // incorrect answer
        setText("Incorrect!")
        setFeedback("bad")
      }
      setGoToNext(true); // ready to move to next question

      if (!hintsUsed) {
        // only update stats if no hints were used
        if (user) {
          try {
            // create http req
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

            // check if this question resulted in user getting first star
            const prevMastered = dbEntry.star_1_achieved_on;
            if (json.entry.star_1_achieved_on !== prevMastered) {
              setShowMastered(true)
            }

            // set variables
            setDbEntry(json.entry)
            setStars({
              star_goal: json.entry.next_star_goal,
              star_2: json.entry.star_2_review_dates,
              star_3: json.entry.star_3_review_dates,
              streak: numProblems,
              current_streak: json.entry.best_streak
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
            {/* General user stats */}
            <div>Streak: {dbEntry.current_streak}</div>
            <div>Best Streak: {dbEntry.best_streak}</div>
            <div>Problems correct: {dbEntry.problems_correct}</div>
            <div>Problems attempted: {dbEntry.problems_attempted}</div>
          </> :
          <>
            {/* No stats shown if user is not logged in */}
            <div>Please sign in to save your progress!</div>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
          </>
        }

        {/* Buttons shown based on state variables */}
        <button onClick={backToTopicsButtonHandler}>Back to Topics</button>
        {!goToNext && <button onClick={checkAnswer}>Check</button>}
        {goToNext && <button onClick={nextQuestion}>Next</button>}
        {!goToNext && <button onClick={showHints}>I Need a Hint!</button>}
      </div>
      {/* Feedback text */}
      {text !== "" ?
        <div className={"feedback " + feedback}>
          {<div>{text}</div>}
        </div> : null
      }
    </div>

  )
}