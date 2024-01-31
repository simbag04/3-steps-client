/**
 * Hints page
 * Renders hints for current problem
 */
import React from "react";
import { Question } from "../../@types/Question";

interface HintsProps {
  currQ: Question, // current question
  setShowHints: Function, // state for whether this page should be shown
  hintsIndex: number, // state for the hint the user is currently on
  setHintsIndex: Function, // state for the hint the user is currently on
}

export const Hints: React.FC<HintsProps> = ({ currQ, setShowHints, hintsIndex, setHintsIndex }) => {
  const nextHint = () => setHintsIndex(hintsIndex => hintsIndex + 1);
  const backToProblem = () => setShowHints(false);

  return (
    <div className="learn-section flex vertical center medium-gap medium-font">
      <h1>Hints</h1>
      {/* render all hints the user is currently on */}
      {currQ.hints.map((hint: React.JSX.Element, index: number) => {
        return (index <= hintsIndex) ? <div key={index} className="flex vertical center medium-gap">{hint}</div> : null;
      })}
      <button onClick={backToProblem}>Back to Problem</button>
      {/* Only render Next Hint if another hint is available */}
      {hintsIndex < currQ.hints.length - 1 ? <button onClick={nextHint}>Next Hint</button> : null}
    </div>
  )
}