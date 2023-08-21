import React, { useState } from "react"
import { getRandomNumber } from "../../helpers/functions"
import { GraphToLimit } from "./GraphToLimit";

const Question = ( { goToNext, checkAnswer, inputChangeHandler, nextQuestion }) => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [rand, setRand] = useState(0)
  const [regenerate, setRegenerate] = useState(false);

  const nextButtonHandler = () => {
    setRand(getRandomNumber(0, 1));
    setRegenerate((regenerate) => !regenerate);
  }

  const checkButtonHandler = () => {
    let res = undefined;
    if (!selectedOption) {
      res = undefined;
    } else if (selectedOption.correct) {
      res = true;
    } else {
      res = false;
    }
    checkAnswer(res);
  }

  return (
    <div className="flex vertical center">
      {rand === 0 ? 
      <GraphToLimit 
        inputChangeHandler={inputChangeHandler} 
        nextQuestion={nextQuestion}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        regenerate={regenerate}></GraphToLimit>
        : <div>Hello</div> }
      {!goToNext && <button onClick={checkButtonHandler}>Check</button>}
      {goToNext && <button onClick={nextButtonHandler}>Next</button>}
      
    </div>
  )
}

export default Question