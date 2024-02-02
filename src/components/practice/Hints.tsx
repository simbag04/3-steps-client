/**
 * Hints page
 * Renders hints for current problem
 */
import React, { useContext, useEffect, useState } from "react";
import { Question } from "../../@types/Question";
import { HeaderHeightContext } from "../../App";

interface HintsProps {
  currQ: Question, // current question
  explain: boolean, // whether this is explain
  scroll: boolean, // whether to scroll or not
  firstExplainRender: boolean
}

export const Hints: React.FC<HintsProps> = ({ currQ, explain, scroll, firstExplainRender }) => {
  const [step, setStep] = useState(0);
  const nextHint = () => setStep(step => step + 1);
  const backToProblem = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const { height } = useContext(HeaderHeightContext)

  useEffect(() => {
    if (!firstExplainRender) {
      let obj = document.getElementById("hints-section")
      window.scrollTo({ top: obj.offsetTop - height, behavior: "smooth" })
    }
  }, [scroll, firstExplainRender])

  return (
    <div id="hints-section" style={{ minHeight: `calc(100vh - ${height}px - 20px)` }}>
      <div className="learn-section hints-section flex vertical center medium-gap medium-font">
        <h3>{explain ? `Explain` : `Hints`}</h3>
        {/* render all hints the user is currently on */}
        {currQ.hints.map((hint: React.JSX.Element, index: number) => {
          return (index <= step || explain) ? <div key={index} className="flex vertical center medium-gap">{hint}</div> : null;
        })}
        <button onClick={backToProblem}>Back to Problem</button>
        {/* Only render Next Hint if another hint is available */}
        {step < currQ.hints.length - 1 && !explain ? <button onClick={nextHint}>Next Hint</button> : null}
      </div>
    </div>
  )
}