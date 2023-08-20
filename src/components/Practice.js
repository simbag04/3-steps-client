import React, { lazy, Suspense,useCallback,useState } from "react";

export const Practice = ({ name }) => {
  const [text, setText] = useState(null);
  const [goToNext, setGoToNext] = useState(false);
  const [streak, setStreak] = useState(0);

  const nextQuestion = useCallback(() => {
    setText(null);
    setGoToNext(false);
  }, [setGoToNext, setText]);

  const inputChangeHandler = () => {
    setText(null);
  }

  const checkAnswer = (res) => {
    if (res === undefined) {
      setText("You must select an answer to continue")
    } else if (res) {
      setGoToNext(true);
      setStreak(streak => streak + 1);
      setText("Good job!")
    } else {
      setStreak(0);
      setText("Incorrect!")
    }
  }

  const DynamicComponent = lazy(() => import(`../topics/${name}/Question.js`));

  return (
    <div className="flex vertical center">
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicComponent goToNext={goToNext} checkAnswer={checkAnswer} inputChangeHandler={inputChangeHandler} nextQuestion={nextQuestion}/>
      </Suspense>
      {text && <div>{text}</div>}
      <div>Streak: {streak}</div>
    </div>
  );
}