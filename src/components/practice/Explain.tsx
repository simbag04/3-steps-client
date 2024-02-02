import React, {useState, useEffect} from "react";
import { Question } from "../../@types/Question";

interface ExplainProps {
  setShowExplain: Function,
  currQ: Question
}

export const Explain: React.FC<ExplainProps> = ({ setShowExplain, currQ }) => {
  const [step, setStep] = useState(0);
  const [remaining, setRemaining] = useState(true);
  const [items, setItems] = useState([]);

  const addItem = () => {
    items.push(currQ.explain[step]);
    setStep(step => step + 1);
    if (step + 1 >= currQ.explain.length) {
      setRemaining(false);
    }
  }

  const addAllItems = () => {
    let currStep = step;
    while (currStep < currQ.explain.length) {
      items.push(currQ.explain[currStep]);
      currStep += 1;
    }
    setRemaining(false)
    setStep(currStep)
  }

  const backToQuestionButtonHandler = () => {
    setShowExplain(false)
  }

  useEffect(() => {
    if (currQ.explain) {
      setItems(i => [...i, currQ.explain[0]])
      setStep(1);
    }
  }, [currQ])

  return (
    <div className='learn-section flex vertical center medium-gap medium-font'>
      <h2 className="title">Explain</h2>
      {items.map((content, index) => {
        return <div key={index} className="flex vertical center medium-gap">{content}</div>
      })}
      {remaining ? <button onClick={addItem}>Next</button> : null}
      {!remaining ? null : <button onClick={addAllItems}>Show All</button>}
      <button onClick={backToQuestionButtonHandler}>Back to Question</button>
    </div>
  );
}