import { getRandomNumber, shuffleArray } from "../../../helpers/functions";
import { Option } from "../../../types/Option";
import { Question } from "../../../types/Question";
import Latex from '../../../components/latex/Latex'
import React from "react";

const optionsForLimitSteps = (): Question => {
  const trig = `${getRandomNumber(0, 1) === 0 ? `\\sin` : `\\cos`}`
  const trigFunction = `${trig}\\left(\\frac{${getRandomNumber(1, 7)}}{x}\\right)`
  const toAdd = getRandomNumber(0, 7);
  const finalFunction = `${trigFunction}${toAdd === 0 ? `` : `+ ${toAdd}`}`
  const multiplyByNegative = Boolean(getRandomNumber(0, 1))
  

  const o1: Option = {
    component: <div className="flex vertical center medium-gap">
      <div className="flex vertical">
        Known fact:
        <Latex expression={`-1 \\leq ${trigFunction} \\leq 1`} display={true}></Latex>
      </div>
      <div className="flex vertical">
        <div>
          Multiply inequality by <Latex expression={`${multiplyByNegative ? "-" : ""}x^2:`}></Latex>
        </div>

        <Latex expression={`${multiplyByNegative ? `x^2 \\geq -x^2${trigFunction} \\geq -x^2` : `-x^2 \\leq x^2${trigFunction} \\leq x^2`}`} display={true}></Latex>
      </div>
      {toAdd === 0 ? null : 
      <div className="flex vertical">
        <div>
          Add {toAdd} to all 3 sides of the inequality:
        </div>
        <Latex expression={`${multiplyByNegative ? `x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\geq -x^2${finalFunction} \\geq -x^2 ${toAdd === 0 ? `` : `+${toAdd}`}` : `-x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\leq x^2${finalFunction} \\leq x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`}`} display={true}></Latex>
      </div>}
      <div className="flex vertical">
        {multiplyByNegative ? `Flip and t` : `T`}ake limit on all 3 sides:
        <Latex expression={`\\lim_{x \\to 0} -x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} \\leq \\lim_{x \\to 0} x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`} display="display"></Latex>
        <Latex expression={`${toAdd} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} \\leq ${toAdd}`} display="display"></Latex>
      </div>
      <div className="flex vertical">
        Answer: <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} = ${toAdd}`} display="display"></Latex>
      </div>
    </div>,
    correct: true
  }

  const o2: Option = {
    component: <div className="flex vertical center medium-gap">
      <div className="flex vertical">
        Known fact:
        <Latex expression={`-1 \\leq ${trigFunction} \\leq 1`} display={true}></Latex>
      </div>
      <div className="flex vertical">
        <div>
          Multiply inequality by <Latex expression={`${multiplyByNegative ? "-" : ""}x^2:`}></Latex>
        </div>

        <Latex expression={`${!multiplyByNegative ? `-x^2 \\geq -x^2${trigFunction} \\geq x^2` : `x^2 \\leq x^2${trigFunction} \\leq -x^2`}`} display={true}></Latex>
      </div>
      {toAdd === 0 ? null : 
      <div className="flex vertical">
        <div>
          Add {toAdd} to all 3 sides of the inequality:
        </div>
        <Latex expression={`${!multiplyByNegative ? `-x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\geq -x^2${finalFunction} \\geq x^2  ${toAdd === 0 ? `` : `+${toAdd}`}` : `x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\leq x^2${finalFunction} \\leq -x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`}`} display={true}></Latex>
      </div>}
      <div className="flex vertical">
        {!multiplyByNegative ? `Flip and t` : `T`}ake limit on all 3 sides:
        <Latex expression={`\\lim_{x \\to 0} x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} \\leq \\lim_{x \\to 0} -x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`} display="display"></Latex>
        <Latex expression={`${toAdd} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2 ${toAdd === 0 ? `` : `+${toAdd}`}` : `x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`}${finalFunction} \\leq ${toAdd}`} display="display"></Latex>
      </div>
      <div className="flex vertical">
        Answer: <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} = ${toAdd}`} display="display"></Latex>
      </div>
    </div>,
    correct: false
  }
  
  const title = <></>
  const question = <div className="flex vertical center small-gap">
    <h3>Select the option which correctly uses the Squeeze Theorem to evaluate:</h3>
    <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2`: `x^2`}${finalFunction}`}></Latex>.
  </div>
  const hints: JSX.Element[] = []
  return { type: 'mc', title, question, input: shuffleArray([o1, o2]), hints}
}

const evaluateLimit = (): Question => {
  const trig = `${getRandomNumber(0, 1) === 0 ? `\\sin` : `\\cos`}`
  const trigFunction = `${trig}\\left(\\frac{${getRandomNumber(1, 7)}}{x}\\right)`
  const toAdd = getRandomNumber(0, 7);
  const finalFunction = `${trigFunction}${toAdd === 0 ? `` : `+ ${toAdd}`}`
  const multiplyByNegative = Boolean(getRandomNumber(0, 1))

  const title = <></>
  const question = <div className="flex vertical center">
  <h2>Evaluate the limit.</h2>
  <div>Hint: Use the Squeeze Theorem</div>
</div>
  const nextToInput = <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2`: `x^2`}${finalFunction} =`}></Latex>
  const hints: JSX.Element[] = []

  return { type: 'math', title, question, ans: toAdd, hints, nextToInput}
  
}

const generateRandomQuestion = (): Question => {
  return evaluateLimit()
}

export default generateRandomQuestion