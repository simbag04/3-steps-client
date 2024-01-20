import { formatPolynomialToLatex, getCoeffsOfPolynomial, getRandomNumber, getRandomWithExclusions, getRootsOfPolynomial, getStringFactorFromXval, sortPolynomialByDegree } from "../../../helpers/functions"
import { getPolynomialFunctionWithPoint, fitPointsToQuadraticFractions } from "../../../helpers/expression-generators"
import * as math from "mathjs"
import { PiecewiseFunction } from "../../../types/PiecewiseFunction"
import { Piecewise } from "../../../components/latex/Piecewise"
import React from "react"
import Latex from "../../../components/latex/Latex"
import { Option } from "../../../types/Option"

const nerdamer = require("nerdamer/all.min")

const piecewiseQuestion = () => {
  // need 1 point where function may or may not be continuous but will be included in the interval
  // need endpoints (can be on the boundaries or not) that will be included in the interval
  const continuousX = getRandomNumber(-3, 3);
  const endpoint1 = getRandomNumber(-7, continuousX - 1);
  const endpoint2 = getRandomNumber(continuousX + 1, 7);
  const b4EP1 = endpoint1 - getRandomNumber(1, 3)
  const bYEP2 = endpoint2 + getRandomNumber(1, 3)

  // decide if domains will be 
  // 1. [(before ep1, ep1)], [(ep1, contX)], [(contX, beyond ep2)]
  // 2. [(before ep1, contX)], [(contX, ep2)], [(ep2, beyond ep2)]
  const firstOrSecond = getRandomNumber(0, 1)

  // first generate quadratic with all 3 points
  let srF = math.string(fitPointsToQuadraticFractions([
    { x: endpoint1, y: getRandomNumber(1, 6) ** 2 },
    { x: continuousX, y: getRandomNumber(1, 6) ** 2 },
    { x: endpoint2, y: getRandomNumber(1, 6) ** 2 }
  ]))

  // get coeffs and roots of function
  const coeffs = getCoeffsOfPolynomial(srF)
  let sqRtFunction = coeffs[2] < 0 ? 1 : getRandomWithExclusions(0, 2, [1])
  const roots = getRootsOfPolynomial(srF)
  srF = `sqrt(${srF})`

  // if 2 real roots, modify root function position (0-2) based on continuousX
  if (!roots[0].includes("i") && !roots[1].includes("i") && Number(roots[0]) !== Number(roots[1])) {
    const rootNumbers = [Number(roots[0]), Number(roots[1])]
    rootNumbers.sort((a, b) => a - b) // sort in ascending order
    sqRtFunction = continuousX < rootNumbers[0] ? 0 : continuousX > rootNumbers[1] ? 2 : 1
  }

  // generate other function positions
  const ratFunction = getRandomWithExclusions(0, 2, [1, sqRtFunction])
  const lnFunction = getRandomWithExclusions(0, 2, [sqRtFunction, ratFunction])
  const functionTypes = ["", "", ""] // array keeping track of type of 3 functions
  functionTypes[sqRtFunction] = "root"
  functionTypes[lnFunction] = "ln"
  functionTypes[ratFunction] = "rat"

  let ans = getRandomNumber(0, 2) // correct answer option

  const firstYAtContX = Math.round(math.evaluate(srF, { x: continuousX })); //srF's yVal
  const secondYAtContX = (ans === 1) ? getRandomWithExclusions(-7, 7, [firstYAtContX]) : firstYAtContX // based on answer determineif f should be continuous at contX
  let defaultEpY: number; // default and other endpoint vals
  let otherEpY: number;

  const piecewiseFunctions: PiecewiseFunction[] = [] // array to keep track of functions

  // generate domaing strings and left and right Xs based on firstOrSecond
  const leftXs = [b4EP1]
  const rightXs = []
  const domains = []
  if (firstOrSecond === 0) {
    leftXs.push(endpoint1, continuousX)
    rightXs.push(endpoint1, continuousX)
    domains.push(`${leftXs[0]} < x \\leq ${rightXs[0]}`)
    domains.push(`${leftXs[1]} < x \\leq ${rightXs[1]}`)
    domains.push(`${leftXs[2]} < x \\leq ${bYEP2}`)
  } else {
    leftXs.push(continuousX, endpoint2)
    rightXs.push(continuousX, endpoint2)
    domains.push(`${leftXs[0]} < x \\leq ${rightXs[0]}`)
    domains.push(`${leftXs[1]} < x < ${rightXs[1]}`)
    domains.push(`${leftXs[2]} \\leq x \\leq ${bYEP2}`)
  }
  rightXs.push(bYEP2)

  // generate xypairs of points that functions should have
  const xYPairs = [[], [], []]
  xYPairs[1][0] = continuousX
  xYPairs[1][1] = secondYAtContX

  // generate middle function first
  piecewiseFunctions[1] = getFunctionHelper(srF, functionTypes, xYPairs, leftXs, rightXs, domains, 1)

  // based on answer decide if endoint should be included
  defaultEpY = Math.round(math.evaluate(piecewiseFunctions[1].f,
    { x: firstOrSecond === 0 ? endpoint1 : endpoint2 }))
  otherEpY = (ans === 2) ? getRandomWithExclusions(-7, 7, [defaultEpY]) : defaultEpY

  // populate xypairs with x-values
  xYPairs[0][0] = rightXs[0]
  xYPairs[2][0] = leftXs[2]

  // determine y values based on root function position and firstorsecond
  if (firstOrSecond === 1) {
    if (functionTypes[2] === "root") {
      xYPairs[0][1] = firstYAtContX
      // corrner case where srF accidentally has same endpoint val
      if ((ans === 0) && Math.round(math.evaluate(srF, { x: endpoint2 })) !== otherEpY) {
        ans = 2
      } else if (ans === 2 && Math.round(math.evaluate(srF, { x: endpoint2 })) === defaultEpY) {
        ans = 0
      }
    } else {
      xYPairs[0][1] = secondYAtContX
      xYPairs[2][1] = otherEpY
    }
  } else {
    if (functionTypes[0] === "root") {
      xYPairs[2][1] = firstYAtContX
      // corrner case where srF accidentally has same endpoint val
      if ((ans === 0) && Math.round(math.evaluate(srF, { x: endpoint1 })) !== otherEpY) {
        ans = 2
      } else if (ans === 2 && Math.round(math.evaluate(srF, { x: endpoint1 })) === defaultEpY) {
        ans = 0
      }
    } else {
      xYPairs[0][1] = otherEpY
      xYPairs[2][1] = secondYAtContX
    }
  }

  // generate other fs based on values computed above
  piecewiseFunctions[0] = getFunctionHelper(srF, functionTypes, xYPairs, leftXs, rightXs, domains, 0)
  piecewiseFunctions[2] = getFunctionHelper(srF, functionTypes, xYPairs, leftXs, rightXs, domains, 2)

  // convrt everything to latex
  for (let i = 0; i < 3; i++) {
    piecewiseFunctions[i].f = formatPolynomialToLatex(piecewiseFunctions[i].f)
  }

  const title = <></>

  const question = <div className="flex vertical center medium-gap">
    <h2>
      Is <Latex expression="f(x)" /> continous on <Latex expression={`[${endpoint1}, ${endpoint2}]`} />?
    </h2>
    <Piecewise classes="larger-font" functions={piecewiseFunctions} title={`f(x)`} />
  </div>

  const hints: React.JSX.Element[] = [
    <div>
      <div className="flex vertical center medium-gap">
        <div>
          Remember, we have 2 conditions to verify continuity on the closed interval <Latex expression={`[${endpoint1}, ${endpoint2}]`} /> for this function:
        </div>
        <Piecewise functions={piecewiseFunctions} title={`f(x)`} />
      </div>
      <div>
        <ul className="text-start">
          <li>
            <Latex expression="f(x)" /> is continuous on <Latex expression="(a, b)" />
          </li>
          <li>
            <Latex classes="bold" expression={`\\lim_{x \\to a^{\\footnotesize\\texttt{+}}} = f(a)`} /> and <Latex classes="bold" expression={`\\lim_{x \\to b^{\\footnotesize\\texttt{-}}} = f(b)`} />
          </li>
        </ul>
      </div>
    </div>,
    <div>
      <div>
        Let's start with the first condition. First, it is worthwhile noting that at <Latex expression={`x = ${continuousX}`} />, there is a change in functions. Thus, for this condition, 3 things must be verified:
      </div>
      <div>
        <ul className="text-start">
          <li>
            <Latex expression="f(x)" /> is continuous on <Latex expression={`(${endpoint1}, ${continuousX})`} />
          </li>
          <li>
            <Latex expression="f(x)" /> is continuous at <Latex expression={`x = ${continuousX}`} />
          </li>
          <li>
            <Latex expression="f(x)" /> is continuous on <Latex expression={`(${continuousX}, ${endpoint2})`} />
          </li>
        </ul>
      </div>
    </div>,
    <div>
      <div>
        For the first and third bullets, use the domains of the functions to determine whether they are continuous on those intervals.
      </div>
      <div>
        For <Latex expression={`x = ${continuousX}`} />, do the process we learned in the last section to determine whether <Latex expression="f(x)" /> is continuous at that point!
      </div>
    </div>,
    <div className="flex vertical center medium-gap">
      <div>
        If this verification fails, you automatically know <Latex expression="f(x)" /> is not continuous on the given interval. If the verification passes, move on to the 2nd condition:
      </div>
      <div>
        <Latex classes="bold" expression={`\\lim_{x \\to a^{\\footnotesize\\texttt{+}}} = f(a)`} /> and <Latex classes="bold" expression={`\\lim_{x \\to b^{\\footnotesize\\texttt{-}}} = f(b)`} />
      </div>
    </div>,
    <div>
      <div>
        Basically, ensure the respective one-sided limits equal the respective function values. If either of these verifications fail, you know <Latex expression="f(x)" /> is not continous on the interval. However, if both pass, both conditions of continuity on an interval have passed! Therefore, you know <Latex expression="f(x)" /> is continous on the interval.
      </div>
    </div>
  ]

  const options: Option[] = [
    {
      component: <div>
        Yes, <Latex expression="f(x)" /> is continous on <Latex expression={`[${endpoint1}, ${endpoint2}]`} />.
      </div>,
      correct: ans === 0
    },
    {
      component: <div>
        No, because <Latex expression="f(x)" /> is not continuous at <Latex expression={`x = ${continuousX}`} />, so it is not continous on <Latex expression={`(${endpoint1}, ${endpoint2})`} />.
      </div>,
      correct: ans === 1
    },
    {
      component: <div>
        No, because <Latex expression="f(x)" /> is continuous on <Latex expression={`(${endpoint1}, ${endpoint2})`} />, but <Latex expression={`\\lim_{x \\to ${endpoint1}^{\\footnotesize\\texttt{+}}} f(x) \\neq f(${endpoint1})`} />.
      </div>,
      correct: ans === 2 && firstOrSecond === 0
    },
    {
      component: <div>
        No, because <Latex expression="f(x)" /> is continuous on <Latex expression={`(${endpoint1}, ${endpoint2})`} />, but <Latex expression={`\\lim_{x \\to ${endpoint2}^{\\footnotesize\\texttt{-}}} f(x) \\neq f(${endpoint2})`} />.
      </div>,
      correct: ans === 2 && firstOrSecond === 1
    },
  ]

  return { title, question, type: 'mc', input: options, hints }

}

const getFunctionHelper = (srF: string, functions: string[], xYPairs: Array<number>[],
  leftXs: number[], rightXs: number[], domains: string[], i: number) => {
  let f;
  if (functions[i] === "root") {
    f = srF
  } else {
    f = generateFunction(functions[i], xYPairs[i][0], xYPairs[i][1], leftXs[i], rightXs[i])
  }
  return { f, domain: domains[i] }
}

const generateFunction = (type: string, x: number, y: number, minValid: number, maxValid: number) => {
  if (type === "ln") {
    const node = getPolynomialFunctionWithPoint(getRandomNumber(1, 2), x, y)
    return `log(e^(${node}))`
  } else if (type === "rat") {
    const f1 = getStringFactorFromXval(maxValid + getRandomNumber(1, 2))
    const f2 = getStringFactorFromXval(minValid - getRandomNumber(1, 2))

    const bottomExpression = sortPolynomialByDegree(nerdamer(`${f1}${f2}`).expand());
    const bottom = math.evaluate(bottomExpression, { x })
    const top = bottom * y

    return `${top}/(${bottomExpression})`
  }
}

const generateRandomQuestion = () => {
  return piecewiseQuestion()
}

export default generateRandomQuestion

// if there are 3 functions
// functions will be [(before ep1, ep1)], [(ep1, contX)], [(contX, beyond ep2)]
// or [(before ep1, contX)], [(contX, ep2)], [(ep2, beyond ep2)]

// if there are 2 functions
// functions will be [(endpoint1, continuousX)] and the other one will be [(continousX, endpoint2)]
// functions may or may not be continous at endpoint1 and endpoint2

// question: is f(x) continuous on [(endpoint1, endpoint2)]

// answer format
// Yes (ans = 0)
// No, because f(x) is not continuous at continousX, so it is not continous on (endpoint1, endpoint2) (ans = 1)
// No, because f(x) is continuous on (endpoint1, endpoint2), but lim_{x \\to endpoint1^+} \\neq f(endpoint1) (ans = 2)
// IF [endpoint1, endpoint2]:
// No, because f(x) is continuous on (endpoint1, endpoint2), but lim_{x \\to endpoint2^-} \\neq f(endpoint2) (ans = 3)
// ELSE IF ONLY 1 []
// No, because lim_{x \\to endpoint2^+} \\neq f(endpoint2) (lim from diff side) (ans = 3)
