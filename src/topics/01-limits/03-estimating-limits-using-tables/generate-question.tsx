import { generateLimitTableData, generateOrderedValues, getRandomNumber, getRandomWithExclusions, getStringFactorFromXval, shuffleArray, sortPolynomialByDegree } from "../../../helpers/functions";
import { FunctionTable } from "../../../components/content-components/tables/FunctionTable";
import Latex from "../../../components/latex/Latex";
import * as math from 'mathjs'
import React from "react";
import { Question } from "../../../@types/Question";

const nerdamer = require("nerdamer/all.min")

const functionToTable = (): Question => {
  const title = <></>

  // generate random function
  const xVal = getRandomWithExclusions(-9, 9, [0]);

  // get 2-3 factors on top
  const factor1 = getStringFactorFromXval(xVal);
  const factor2 = getStringFactorFromXval(getRandomWithExclusions(-9, 9, [0]));
  const factor3 = getRandomNumber(0, 1) === 0 ?
    getStringFactorFromXval(getRandomWithExclusions(-9, 9, [0])) : "";

  // get expanded latex version of equation
  const numerator = sortPolynomialByDegree(nerdamer(`${factor1}${factor2}${factor3}`).expand());
  const equation = `(${numerator})/${factor1}`;
  const latexEq = nerdamer(equation).toTeX().replaceAll(' \\cdot ', "")

  // create question
  const question = <div className="flex vertical center medium-gap">
    <div className="flex vertical center small-gap">
      <h2>Which table is best for estimating the limit of this function?</h2>
      <div>Assume both tables have correct function values.</div>
    </div>
    <Latex expression={`g(x) = ${latexEq}`} classes={'large-font'} display={true} />
  </div>

  const node = math.parse(`${factor2}${factor3}`);
  const f = (x: number) => node.evaluate({ x });

  // create options
  // first option
  const data1 = [];
  for (let i = xVal - 5; i <= xVal + 5; i++) {
    data1.push({ x: i, y: xVal === i ? 'und' : Math.round(f(i)) });
  }

  // second option data
  const data2 = [];
  for (let i = xVal - 2; i <= xVal + 2; i++) {
    if (i !== xVal) {
      data2.push({ x: i, y: Math.round(f(i)) })
    } else {
      data2.push({ x: i - 0.1, y: fixRounding(f(i - 0.1), 10) });
      data2.push({ x: i - 0.01, y: fixRounding(f(i - 0.01), 100) });
      data2.push({ x: i - 0.001, y: fixRounding(f(i - 0.001), 1000) });
      data2.push({ x: i, y: 'und' });
      data2.push({ x: i + 0.001, y: fixRounding(f(i + 0.001), 1000) });
      data2.push({ x: i + 0.01, y: fixRounding(f(i + 0.01), 100) });
      data2.push({ x: i + 0.1, y: fixRounding(f(i + 0.1), 10) });
    }
  }

  const option1 = {
    component: <FunctionTable xTitle={`x`} yTitle={`g(x)`} data={data1} />,
    correct: false
  }

  const option2 = {
    component: <FunctionTable xTitle={`x`} yTitle={`g(x)`} data={data2} />,
    correct: true
  }

  const input = shuffleArray([option1, option2])
  const type = 'mc'

  const hints = [
    <>
      <div>
        Focus on <Latex expression={`x = ${xVal}`} /> in both tables. Recall that a limit is about getting infinitely close to the <Latex expression="x" /> value.
      </div>
      <div>
        This means we really need to "zoom in" on our <Latex expression="x" /> value.
      </div>
    </>,
    <>
      <div>
        Thus, looking at both tables, it is clear that the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        {option2.component}
      </div>
    </>
  ]

  return { title, question, input, type, hints }
}

const tableToLimit = (): Question => {
  const xVal = getRandomNumber(-9, 9); // xval at which to evaluate limit

  // 0: left, 1: right, 2: 2-sided
  const sign = getRandomNumber(0, 2);

  // domain for table
  const startX = xVal - (getRandomNumber(0, 1) === 0 ? 3 : 0);
  const endX = xVal + ((getRandomNumber(0, 1) === 0 || xVal === startX) ? 3 : 0);

  const increasing = Boolean(getRandomNumber(0, 1)); // whether table values are increasing or decreasing
  const orderedValues = generateOrderedValues(endX - startX + 1, increasing); // values in table

  // evaluate answer
  let ans = String(orderedValues[xVal === startX ? 0 : 3]); // default answer
  if ((xVal === startX && sign === 0) ||
    (xVal === endX && sign === 1) ||
    ((xVal === endX || xVal === startX) && sign === 2)) {
    ans = "dne";
  }

  const { data } = generateLimitTableData(xVal, orderedValues, startX, endX) // data for table

  // other question components
  const title = <></> // no title as title is included in question

  const signText = sign === 0 ? `^\\textbf{-}` : sign === 1 ? `^\\textbf{+}` : ``;
  const nextToInput = <span>
    <Latex classes="bold" expression={`\\lim_{x \\to ${xVal + signText}}g(x)`} inline={true} /> =
  </span>

  const question = <div className="flex vertical center medium-gap">
    <div className="flex vertical center small-gap">
      <h2>Estimate the limit from the table.</h2>
      <div>Enter "dne" if the limit doesn't exist or cannot be evaluated from the table.</div>
    </div>
    <FunctionTable xTitle={`x`} yTitle={`g(x)`} data={data} />
  </div>

  const type = 'math';

  const hints = [
    <>
      <div>
        We want to evaluate the limit as <Latex expression={`x`} /> approaches {xVal} from {sign === 0 ? <>the <strong>left</strong></> : sign === 1 ? <>the <strong>right</strong></> : <strong>both sides</strong>}. What side(s) do we see in the table?
      </div>
    </>
  ]

  if (ans === "dne") {
    hints.push(
      <>
        <div>
          Looking at the table, we only have data to the <strong>{xVal === startX ? "right" : "left"}</strong> of <Latex expression={`x = ${xVal}`} />, not {xVal === endX ? "the right" : xVal === endX ? "the left" : "both sides"}. We don't have enough information to evaluate the limit.
        </div>
      </>,
      <>
        <div>
          Thus, the correct answer is:
        </div>
        <div className="hint-ans input correct ans">
          dne
        </div>
      </>
    )
  } else {
    hints.push(
      <>
        <div>
          We have data on {xVal === endX ? <>the <strong>left</strong></> : xVal === startX ? <>the <strong>right</strong></> : <strong>both sides</strong>} of <Latex expression={`x = ${xVal}`} />.
        </div>
        <div>
          This means we can estimate the limit!
        </div>
      </>,
      <>
        <div>
          Remember that when finding limits, we want to focus on what the function is <strong>approaching</strong>, not necessarily the function value at that point.
        </div>
        <div>
          Looking at the <Latex expression="y" /> values near <Latex expression={`x = ${xVal}`} />, it looks like the function is approaching <Latex expression={ans} />.
        </div>
      </>,
      <>
        <div>
          Thus, the correct answer is:
        </div>
        <div className="hint-ans input correct ans">
          {ans}
        </div>
      </>
    )
  }

  return { title, question, ans, type, nextToInput, hints }
}

const generateRandomQuestion = (): Question => {
  // determine type of question to generate
  const rand = getRandomNumber(1, 10)
  let q = null;
  if (rand <= 7) {
    q = tableToLimit();
  } else {
    q = functionToTable();
  }

  return q;
}

/**
 * @param {Number} val value to round
 * @param {Number} degree of places to round to: ex. if you want to round to the tenths place, this should be 10
 * @returns rounded value
 */
const fixRounding = (val: number, degree: number): number => {
  return Math.floor(val * degree * 10) / (degree * 10);
}

export default generateRandomQuestion