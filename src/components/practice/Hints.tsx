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

  const { height } = useContext(HeaderHeightContext)

  useEffect(() => {
    if (!firstExplainRender) {
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 0)
    }
  }, [firstExplainRender, step])

  useEffect(() => {
    if (!firstExplainRender) {
      setTimeout(() => {
        let obj = document.getElementById("hints-section")
        window.scrollTo({ top: obj.offsetTop - height, behavior: "smooth" })
      }, 0)
    }
  }, [scroll, firstExplainRender, height])

  // style={{ minHeight: `calc(100vh - ${height}px - 20px)` }}
  return (
    <div id="hints-section">
      <div className="learn-section hints-section flex vertical center medium-gap medium-font">
        <h3>{explain ? `Explain` : `Hints`}</h3>
        {/* render all hints the user is currently on */}
        {currQ.hints.map((hint: React.JSX.Element, index: number) => {
          return (index <= step || explain) ? <div key={index} className="flex vertical center medium-gap">{hint}</div> : null;
        })}

        {/* Only render Next Hint if another hint is available */}
        {step < currQ.hints.length - 1 && !explain ? <button onClick={nextHint}>Next Hint</button> : null}
      </div>
    </div>
  )
}