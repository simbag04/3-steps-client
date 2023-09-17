/**
 * Hints page
 * Renders hints for current problem
 * Parameters: 
 *  - currQ: current question
 *  - setShowHints: state for whether this page should be shown
 *  - hintsIndex/setHintsIndex: state for the hint the user is currently on
 */
export const Hints = ({ currQ, setShowHints, hintsIndex, setHintsIndex }) => {
  const nextHint = () => setHintsIndex(hintsIndex => hintsIndex + 1);
  const backToProblem = () => setShowHints(false);

  return (
    <div className="flex vertical center medium-gap">
      <h1>Hints</h1>
      {/* render all hints the user is currently on */}
      {currQ.hints.map((hint, index) => {
        return (index <= hintsIndex) ? <div>{hint}</div> : null;
      })}
      <button onClick={backToProblem}>Back to Problem</button>
      {/* Only render Next Hint if another hint is available */}
      {hintsIndex < currQ.hints.length - 1 ? <button onClick={nextHint}>Next Hint</button> : null}
    </div>
  )
}