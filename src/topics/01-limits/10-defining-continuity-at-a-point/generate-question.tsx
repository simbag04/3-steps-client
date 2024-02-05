import { Question } from "../../../@types/Question";
import React from "react";
import { PiecewiseFunction } from "../../../@types/PiecewiseFunction";
import { generateOrderedValues, getRandomNumber, getRandomWithExclusions } from "../../../helpers/functions";
import * as math from 'mathjs'
import { getPolynomialFunctionWithPoint } from "../../../helpers/expression-generators";
import { Piecewise } from "../../../components/latex/Piecewise";
import Latex from "../../../components/latex/Latex";
import { Option } from "../../../@types/Option";
import { LEFT_LIMIT, RIGHT_LIMIT } from "../../../helpers/constants";

const piecewiseToLimit = (): Question => {
  const functions: PiecewiseFunction[] = []; // array for piecewise
  const mathFs = []; // array of mathjs functions
  const numFunctions = getRandomNumber(0, 10) <= 6 ? 1 : 2
  const xValues = generateOrderedValues(numFunctions, true, -3, 2); // random xvalues

  let yValues = []; // array for random y values

  const xIndex = getRandomNumber(0, xValues.length - 1); // index of x val to ask about 
  const x = xValues[xIndex] // actual x val to ask about

  // generate y values
  for (let i = 0; i < numFunctions; i++) {
    yValues.push(getRandomNumber(-7, 7))
  }

  // whether there is a separate value at the function
  const separateFunctionVal = (numFunctions === 1) ? getRandomNumber(0, 10) <= 6 : false
  // 0: continuous at x, 1: limits not equal, 2: limits equal but f value diff
  const continuous = separateFunctionVal ? getRandomNumber(0, 2) : getRandomNumber(0, 1)
  let includes = xIndex === 0 && separateFunctionVal ? 0 : getRandomNumber(0, 1); // whether current xval is included in domain - don't include if there is a separate function value

  const fsToUse = []
  // generate functions
  for (let i = 0; i <= xValues.length; i++) {
    // figure out domain of values and functions
    let domain: string; // latex domain
    let f: string; // function for domain
    let xVal: number; // xval to have point at
    let yVal: number; // yval to have point at
    let addF = false
    // add number at function
    if (i - 1 === xIndex && separateFunctionVal) {
      const y = continuous !== 2 ? String(yValues[xIndex]) : String(getRandomWithExclusions(-7, 7, [yValues[xIndex]]))
      functions.push({ f: y, domain: `x = ${x}` })
      includes = 1 // don't include xval in next function
      fsToUse.push({ type: 1, f: y, value: y, replaced: false })
    }

    if (i === 0) {
      domain = `x ${includes ? "\\leq" : "<"} ${xValues[i]}`
      xVal = xValues[i];
      yVal = yValues[i];
      addF = includes && i === xIndex

    } else if (i === xValues.length) {
      domain = `x ${includes ? ">" : "\\geq"} ${xValues[i - 1]}`
      xVal = xValues[i - 1];
      yVal = (continuous === 1 && xIndex === i - 1) ? getRandomWithExclusions(-7, 7, [yValues[i - 1]]) : yValues[i - 1] // decide whether yVal will be different or the same for continuity
      addF = !includes && i - 1 === xIndex
    } else {
      // 2-sided domain
      domain = `${xValues[i - 1]} ${includes ? "<" : "\\leq"} x`;
      addF = i - 1 === xIndex && !includes
      includes = xIndex === i && separateFunctionVal ? 0 : getRandomNumber(0, 1);
      addF = addF || (includes && xIndex === i)
      domain = domain + ` ${includes ? "\\leq" : "<"} ${xValues[i]}`

      xVal = xValues[xIndex];

      // decide whether yVal will be different or the same for continuity
      yVal = continuous === 1 ? getRandomWithExclusions(-7, 7, [yValues[xIndex]]) : yValues[xIndex];
    }

    // generate function
    let degree = Math.abs(xVal) > 2 ? 1 : getRandomNumber(1, 2); // only do degree 2 for small x
    f = getPolynomialFunctionWithPoint(degree, xVal, yVal);

    // store function to evaluate f
    const node = math.parse(f);
    mathFs.push((x: number) => node.evaluate({ x }));

    // format f
    f = math.simplifyCore(f).toTex({ parenthesis: 'auto' }).replaceAll('\\cdot', "");
    functions.push({ f, domain });

    if (addF) {
      const replaced = f.includes('x')
      let newf = f.replaceAll('x', `(${xVal})`)
      fsToUse.push({ type: 1, f: newf, value: yVal, replaced })
    }

    if (i === xIndex || i - 1 === xIndex) {
      fsToUse.push({ type: i === xIndex ? 0 : 2, f, value: yVal })
    }
  }

  fsToUse.sort((a, b) => a.type - b.type)
  console.log(fsToUse)
  const question = <div className="flex vertical center medium-gap">
    <h3>Is the function continuous at <Latex expression={`x = ${x}`} />?</h3>
    <Piecewise functions={functions} title={`f(x)`} />
  </div>

  // find answer
  const title: React.JSX.Element = <></>

  const options: Option[] = [
    {
      component: <div>
        Yes, because <Latex expression={`\\lim_{x \\to ${x}^{\\footnotesize\\texttt{+}}} f(x) = \\lim_{x \\to ${x}^{\\footnotesize\\texttt{-}}} f(x)`} /> and <Latex expression={`\\lim_{x \\to ${x}} f(x) = f(${x})`} />
      </div>,
      correct: continuous === 0
    },
    {
      component: <div>
        Yes, because <Latex expression={`\\lim_{x \\to ${x}} f(x)`} /> exists.
      </div>,
      correct: false
    },
    {
      component: <div>
        No, because <Latex expression={`\\lim_{x \\to ${x}} f(x) `} /> does not exist.
      </div>,
      correct: continuous === 1
    },
    {
      component: <div>
        No, because <Latex expression={`\\lim_{x \\to ${x}} f(x) `} /> exists, but <Latex expression={`\\lim_{x \\to ${x}} f(x) \\neq f(${x})`} />.
      </div>,
      correct: continuous === 2
    },
  ]

  const hints = [
    <>
      <div>
        Remember, we have 2 conditions to check for continuity for this function:
      </div>
      <div>
        <ul className="text-start">
          <li>
            <Latex classes="bold" expression={`\\lim_{x \\to a} f(x)`} /> must <strong>exist</strong>
          </li>
          <li>
            <Latex classes="bold" expression={`\\lim_{x \\to a} f(x) = f(a)`} display={true} />
          </li>
        </ul>
      </div>
    </>,
    <>
      <div>
        In order to determine if <Latex classes="bold" expression={`\\lim_{x \\to ${x}} f(x)`} /> <strong>exists</strong>, confirm that <Latex classes="bold" expression={`\\lim_{x \\to ${x}${LEFT_LIMIT}} f(x) = \\lim_{x \\to ${x}${RIGHT_LIMIT}} f(x)`} />.
      </div>
    </>,
    <>
      <div>
        We can evaluate:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${x}${LEFT_LIMIT}} f(x) = \\lim_{x \\to ${x}} \\left(${fsToUse[0].f}\\right) = ${fsToUse[0].value}`} display={true} />
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${x}${RIGHT_LIMIT}} f(x) = \\lim_{x \\to ${x}} \\left(${fsToUse[2].f}\\right) = ${fsToUse[2].value}`} display={true} />
      </div>
    </>
  ]

  if (continuous === 1) {
    hints.push(
      <>
        <div>
          Since these limits don't equal each other, the first condition is not satisfied.
        </div>
      </>,
      <>
        <div>
          Thus, the correct answer is:
        </div>
        <div className="hint-ans input correct ans">
          {options[2].component}
        </div>
      </>
    )
  } else {
    hints.push(
      <>
        <div>
          These limits equal each other, meaning the first condition is satisfied. Now, we can move on to the second condition: does <Latex classes="bold" expression={`\\lim_{x \\to ${x}} f(x) = f(${x})`} />?
        </div>
      </>,
      <>
        <div>
          We can evaluate <Latex expression={`f(${x})`} />:
        </div>
        <div>
          <Latex expression={`f(${x}) = ${fsToUse[1].f}
          ${fsToUse[1].replaced ? `= ${fsToUse[1].value}` : ''} `} display={true} />
        </div>
      </>,
      <>
        <div>
          Since <Latex expression={`\\lim_{x \\to ${x}} f(x) ${continuous === 0 ? '=' : `\\neq`} f(${x})`} />, the second condition {continuous === 0 ? 'holds' : 'does not hold'}.
        </div>
      </>,
      <>
        <div>
          Thus, the correct answer is:
        </div>
        <div className="hint-ans input correct ans">
          {continuous === 0 ? options[0].component : options[3].component}
        </div>
      </>
    )
  }

  return { title, question, input: options, type: 'mc', hints }
}

const generateRandomQuestion = (): Question => {
  return piecewiseToLimit()
}

export default generateRandomQuestion