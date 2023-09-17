export const Hints = ({ currQ, setShowHints, hintsIndex, setHintsIndex }) => {

  const nextHint = () => {
    setHintsIndex(hintsIndex => hintsIndex + 1);
  }

  const backToProblem = () => {
    setShowHints(false);
  }

  return (
    <div className="flex vertical center medium-gap">
      <h1>Hints</h1>
      {console.log(currQ)}
      {currQ.hints.map((hint, index) => {
        return (index <= hintsIndex) ? <div>{hint}</div> : null;
      })}

      <button onClick={backToProblem}>Back to Problem</button>
      {hintsIndex < currQ.hints.length - 1 ? <button onClick={nextHint}>Next Hint</button> : null}
    </div>
  )
}