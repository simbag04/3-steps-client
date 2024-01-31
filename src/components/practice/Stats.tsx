/**
 * Stats component
 * This is the "Progress" box on the Practice Page
 */
import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "../../App";
import { ApiContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { format_review_date, review_date_passed } from "../../helpers/format-helpers";
import { useRef } from "react";
import React from "react";
import { UserTopicEntry } from "../../@types/UserTopicEntry";

interface StatsProps {
  cname: string, // url name of course
  uname: string, // url name of unit
  name: string, // url name of topic
  correctRef: React.MutableRefObject<boolean>, // whether inputted answer is correct
  goToNext: boolean, // state for if user is ready to move on to next question
  setGoToNext: Function, // state for if user is ready to move on to next question
  setNewQ: Function, // state that renders new question on change
  setShowMastered: Function, // state that shows "Mastered" page when true
  numProblems: number, // streak that user must get for star 1
  setStars: Function, // info about the stars user has earned on this topic
  setShowHints: Function, // state that shows "Hints" page when true
  hintsUsed: boolean, // state for what hint the user is currently on
  setHintsUsed: Function, // state for what hint the user is currently on
  setTitleWord: Function, // state for "Practice" or "Review" in title
  moveStatsDown: string // whether stats is below question, meaning it should be styled horizontally
}

export const Stats: React.FC<StatsProps> = ({ cname, uname, name, correctRef, goToNext, setGoToNext, setNewQ, setShowMastered, numProblems, setStars, setShowHints, hintsUsed, setHintsUsed, setTitleWord, moveStatsDown }) => {
  const [text, setText] = useState(""); // feedback text, such as "Incorrect"
  const [feedback, setFeedback] = useState(""); // added to feedback element classes for styling
  const [dbEntry, setDbEntry] = useState<UserTopicEntry | null>(null); // entry for this user for this topic in DB
  const [reviewDatePassed, setReviewDatePassed] = useState(-1); // How many days ago review date was
  const [showHintsInfo, setShowHintsInfo] = useState(false);
  const hintsButtonRef = useRef(null);
  const [hintsInfoPos, setHintsInfoPos] = useState({ x: 0, y: 0 })

  const { user } = useContext(UserContext);
  const apiLink = useContext(ApiContext);
  const nav = useNavigate();

  const setVariablesAfterAPICall = useCallback((json) => {
    // set variables
    const date = json.entry.next_review_date;
    const rdp = review_date_passed(date ? date.date : null);
    setDbEntry(json.entry);
    setReviewDatePassed(rdp);
    setTitleWord(rdp && rdp >= 0 ? "Review" : "Practice")
    setStars({
      star_goal: json.entry.next_star_goal,
      star_2: json.entry.star_2_review_dates,
      star_3: json.entry.star_3_review_dates,
      streak: numProblems,
      current_streak: json.entry.best_streak,
      next_review_date: date ? date.date : null
    })
  }, [numProblems, setStars, setTitleWord])

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
          setVariablesAfterAPICall(json)

        } catch (err) {
          console.log(err)
        }
      }
    }

    setVariables().catch(console.error)
  }, [apiLink, name, user, numProblems, setStars, setTitleWord, setVariablesAfterAPICall])

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
            const d = new Date();
            const body = { result: correctRef.current, date: d }
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
            const prevMastered = dbEntry.next_star_goal;
            if (json.entry.next_star_goal !== prevMastered) {
              setShowMastered(true)
            }
            setVariablesAfterAPICall(json)
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

  const handleMouseEnter = () => {
    if (hintsButtonRef.current) {
      setShowHintsInfo(true);
      setHintsInfoPos({ x: hintsButtonRef.current.offsetLeft, y: hintsButtonRef.current.offsetTop });
    }
  };

  const handleMouseLeave = () => {
    setShowHintsInfo(false);
  };

  const hintsInfoStyle = {
    display: showHintsInfo ? 'block' : 'none',
    bottom: `${window.innerHeight - hintsInfoPos.y + 10}px`,
  };

  const style = {
    width: moveStatsDown === "horizontal" ? "200px" : `${Math.min(window.outerWidth * 0.8, 350)}px`
  }

  return (
    <div className="stats-section flex vertical center medium-gap text-center">
      <div style={style} className="stats flex vertical center medium-gap">
        <h2>Progress</h2>
        <div className={`stats-content flex center medium-gap vertical`}>
          <div className={`stats-question-info flex ${moveStatsDown === "horizontal" ? "vertical" : "horizontal"} center small-gap`}>
            {user && dbEntry ?
              <>
                {/* General user stats */}
                <div>Streak: <strong>{dbEntry.current_streak}</strong></div>
                <div>Best Streak: <strong>{dbEntry.best_streak}</strong></div>
                <div>Problems correct: <strong>{dbEntry.problems_correct}</strong></div>
                <div>Problems attempted: <strong>{dbEntry.problems_attempted}</strong></div>

                {/* Review text */}
                {dbEntry.next_star_goal > 1 ?
                  reviewDatePassed >= 9 && dbEntry.next_star_goal === 4 ?
                    <div>Review within <strong>{14 - reviewDatePassed}</strong> days! Streak: <strong>{dbEntry.next_review_date.streak}/2</strong></div>
                    : reviewDatePassed >= 0 ?
                      <div>Review Streak: <strong>{dbEntry.next_review_date.streak}/2</strong></div> :
                      reviewDatePassed && <div>Next review: <strong>
                        {dbEntry && dbEntry.next_review_date && format_review_date(dbEntry.next_review_date.date)}
                      </strong>
                      </div> : null}
              </> :
              <>
                {/* No stats shown if user is not logged in */}
                <div>Please sign in to save your progress!</div>
                <button onClick={login}>Login</button>
                <button onClick={register}>Register</button>
              </>
            }
          </div>

          <div className={`stats-buttons flex ${moveStatsDown === "horizontal" ? "vertical" : "horizontal"} small-gap`}>
            {/* Buttons shown based on state variables */}
            {!goToNext && <button onClick={checkAnswer}><strong>Check</strong></button>}
            {goToNext && <button onClick={nextQuestion}><strong>Next</strong></button>}
            {!goToNext && <button onClick={showHints} ref={hintsButtonRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><strong>I Need a Hint!</strong></button>}
            <button onClick={backToTopicsButtonHandler}><strong>Back to Topics</strong></button>
          </div>


        </div>
      </div>
      <div style={hintsInfoStyle} className="hints-info text-center">
        This problem won't count towards your progress if you use a hint.
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