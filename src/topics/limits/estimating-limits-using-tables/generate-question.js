import { generateOrderedValues, getRandomNumber, getRandomWithExclusions, getStringFactorFromXval, shuffleArray, sortPolynomialByDegree } from "../../../helpers/functions";
import { FunctionTable } from "../../../components/content-components/tables/FunctionTable";
import Latex from "../../../helpers/Latex";
import * as math from 'mathjs'

const nerdamer = require("nerdamer/all.min")

function functionToTable() {
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
  const f = (x) => node.evaluate({ x });

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
    <div className="flex vertical center small-gap">
      <div>Focus on <Latex expression={`x = ${xVal}`} />. Recall that a limit is about getting infinitely close to the xvalue.</div>
      <div className="flex vertical center small-gap">
        {option1.component}
        {option2.component}
      </div>
    </div>,
    <>
      <div>When using a table, we really need to "zoom in" near the x-value. Which table does that?</div>
    </>
  ]

  return { title, question, input, type, hints }
}

function tableToLimit() {
  const data = []; // data for table
  const xVal = getRandomNumber(-9, 9); // xval at which to evaluate limit

  // 0: left, 1: right, 2: 2-sided
  const sign = getRandomNumber(0, 2);

  // domain for table
  const startX = xVal - (getRandomNumber(0, 1) === 0 ? 3 : 0);
  const endX = xVal + ((getRandomNumber(0, 1) === 0 || xVal === startX) ? 3 : 0);

  const increasing = getRandomNumber(0, 1); // whether table values are increasing or decreasing
  const orderedValues = generateOrderedValues(endX - startX + 1, increasing); // values in table
  let ans = String(orderedValues[xVal === startX ? 0 : 3]); // default answer

  // build table data
  for (let i = startX; i <= endX; i++) {
    const val = orderedValues[i - startX];

    // evaluate answer
    if (i === xVal && (i === startX || i === endX)) {
      if ((i === startX && sign === 0) || (i === endX && sign === 1) || sign === 2) {
        ans = "dne";
      }
    }

    // zooming in to the left of xVal
    if (i === xVal && xVal !== startX) {
      data.push({ x: i - 0.1, y: val - (increasing ? 0.1 : -0.1) })
      data.push({ x: i - 0.01, y: val - (increasing ? 0.01 : -0.01) })
      data.push({ x: i - 0.001, y: val - (increasing ? 0.001 : -0.001) })
    }

    data.push({ x: i, y: val });  // other xvalues

    // zooming in to the right of xval
    if (i === xVal && xVal !== endX) {
      data.push({ x: i + 0.001, y: val + (increasing ? 0.001 : -0.001) })
      data.push({ x: i + 0.01, y: val + (increasing ? 0.01 : -0.01) })
      data.push({ x: i + 0.1, y: val + (increasing ? 0.1 : -0.1) })
    }
  }

  // other question components
  const title = <></> // no title as title is included in question

  const signText = sign === 0 ? `^\\textbf{-}` : sign === 1 ? `^\\textbf{+}` : ``;
  const nextToInput = <span>
    <Latex expression={`\\lim_{x \\to ${xVal + signText}}g(x)`} inline={true} /> =
  </span>

  const question = <div className="flex vertical center medium-gap">
    <div className="flex vertical center small-gap">
      <h2>Estimate the limit from the table.</h2>
      <div>Enter "dne" if the limit doesn't exist or cannot be evaluated from the table</div>
    </div>
    <FunctionTable xTitle={`x`} yTitle={`g(x)`} data={data} />
  </div>

  const type = 'frq';

  const hints = [
    <div className="flex vertical center small-gap">
      <div>We are focused on evaluating the limit as <Latex expression={`x`} /> approaches {xVal} from {sign === 0 ? "the left" : sign === 1 ? "the right" : "both sides"}. What side(s) do we see in the table?</div>
      <FunctionTable xTitle={`x`} yTitle={`g(x)`} data={data} />
    </div>,
    <>
      {ans === "dne" ?
        <div>
          Does the table show the sides that we need?
        </div> :
        <div>
          Look closely at the values in the table near <Latex expression={`x = ${xVal}`} />. What do they seem to be approaching?
        </div>}
    </>
  ]

  return { title, question, ans, type, nextToInput, hints }
}

function generateRandomQuestion() {
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
function fixRounding(val, degree) {
  console.log(val)
  return Math.floor(val * degree * 10) / (degree * 10);
}

export default generateRandomQuestion