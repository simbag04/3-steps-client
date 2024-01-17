import { Question } from "../../../types/Question";
import React from "react";
import { PiecewiseFunction } from "../../../types/PiecewiseFunction";
import { generateOrderedValues, getRandomNumber, getRandomWithExclusions } from "../../../helpers/functions";
import * as math from 'mathjs'
import { getPolynomialFunctionWithPoint } from "../../../helpers/expression-generators";
import { Piecewise } from "../../../components/latex/Piecewise";
import Latex from "../../../components/latex/Latex";
import { Option } from "../../../types/Option";

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

  // generate functions
  for (let i = 0; i <= xValues.length; i++) {
    // figure out domain of values and functions
    let domain: string; // latex domain
    let f: string; // function for domain
    let xVal: number; // xval to have point at
    let yVal: number; // yval to have point at

    // add number at function
    if (i - 1 === xIndex && separateFunctionVal) {
      functions.push({ f: continuous !== 2 ? String(yValues[xIndex]) : String(getRandomWithExclusions(-7, 7, [yValues[xIndex]])), domain: `x = ${x}` })
      includes = 1 // don't include xval in next function
    }

    if (i === 0) {
      domain = `x ${includes ? "\\leq" : "<"} ${xValues[i]}`
      xVal = xValues[i];
      yVal = yValues[i];
    } else if (i === xValues.length) {
      domain = `x ${includes ? ">" : "\\geq"} ${xValues[i - 1]}`
      xVal = xValues[i - 1];
      yVal = (continuous === 1 && xIndex === i - 1) ? getRandomWithExclusions(-7, 7, [yValues[i - 1]]) : yValues[i - 1] // decide whether yVal will be different or the same for continuity
    } else {
      // 2-sided domain
      domain = `${xValues[i - 1]} ${includes ? "<" : "\\leq"} x`;
      includes = xIndex === i && separateFunctionVal ? 0 : getRandomNumber(0, 1);
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
  }

  const question = <Piecewise functions={functions} title={`f(x)`} />

  // find answer
  const title: React.JSX.Element = <div className="flex vertical center">
    <h2>Is the function continuous at <Latex expression={`x = ${x}`} />?</h2>
  </div>

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
    <div>
      <div className="flex vertical center medium-gap">
        Remember, we have 2 conditions to check for continuity for this function:
        <Piecewise functions={functions} title={`f(x)`} display={true} />
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
    </div>,
    <div>
      How can we determine if <Latex classes="bold" expression={`\\lim_{x \\to ${x}} f(x)`} /> <strong>exists</strong>?
    </div>,
    <div>
      Since <Latex expression="f(x)" /> is a piecewise function, in order for the limit to exist, we can first check that <Latex classes="bold" expression={`\\lim_{x \\to ${x}^{\\footnotesize\\texttt{-}}} f(x) = \\lim_{x \\to ${x}^{\\footnotesize\\texttt{+}}} f(x)`} />. Start by confirming that this is true.
    </div>,

  ]

  if (continuous === 1) {
    hints.push(<div>
      If these limits did not equal each other, then we automatically know the function isn't continuous!
    </div>)
  } else {
    hints.push(<div>
      Once you have confirmed that these limits do equal each other, we can move on to the second condition: does <Latex classes="bold" expression={`\\lim_{x \\to ${x}} f(x) = f(${x})`} />?
    </div>)
    hints.push(<div>
      If yes, we know the function is continuous at <Latex expression={`x = ${x}`} /> as both conditions have been satisfied. If not, the function isn't continuous as the second condition isn't satisfied.
    </div>)
  }

  return { title, question, input: options, type: 'mc', hints }
}

const generateRandomQuestion = (): Question => {
  return piecewiseToLimit()
}

export default generateRandomQuestion