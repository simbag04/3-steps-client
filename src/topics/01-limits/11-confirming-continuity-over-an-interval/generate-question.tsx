import { formatPolynomialToLatex, getCoeffsOfPolynomial, getRandomNumber, getRandomWithExclusions, getRootsOfPolynomial, getStringFactorFromXval, sortPolynomialByDegree } from "../../../helpers/functions"
import { getPolynomialFunctionWithPoint } from "../../../helpers/expression-generators"
import * as math from "mathjs"
import { PiecewiseFunction } from "../../../@types/PiecewiseFunction"
import { Piecewise } from "../../../components/latex/Piecewise"
import React from "react"
import Latex from "../../../components/latex/Latex"
import { Option } from "../../../@types/Option"
import { LEFT_LIMIT, RIGHT_LIMIT } from "../../../helpers/constants"

const nerdamer = require("nerdamer/all.min")

const piecewiseQuestion = () => {
  // need 1 point where function may or may not be continuous but will be included in the interval
  // need endpoints (can be on the boundaries or not) that will be included in the interval
  const continuousX = getRandomNumber(-3, 3);

  // decide if domains will be 
  // 1. [(before ep1, ep1)], [(ep1, contX)], [(contX, beyond ep2)]
  // 2. [(before ep1, contX)], [(contX, ep2)], [(ep2, beyond ep2)]
  let firstOrSecond = getRandomNumber(0, 1)
  let srF = getSqrtFunction(continuousX)

  let endpoint1 = getRandomNumber(-7, continuousX - 1);
  let endpoint2 = getRandomNumber(continuousX + 1, 7);

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

    if (Math.ceil(rootNumbers[0]) === continuousX) {
      firstOrSecond = 1
    } else if (Math.floor(rootNumbers[1]) === continuousX) {
      firstOrSecond = 0
    }

    if (firstOrSecond === 0 && sqRtFunction === 1) {
      endpoint1 = getRandomNumber(Math.ceil(rootNumbers[0]), continuousX - 1)
    } else if (firstOrSecond === 1 && sqRtFunction === 1) {
      endpoint2 = getRandomNumber(continuousX + 1, Math.floor(rootNumbers[1]))
    }
  }

  const b4EP1 = endpoint1 - getRandomNumber(1, 3) // value before endpoint 1
  const bYEP2 = endpoint2 + getRandomNumber(1, 3) // value beyond endpoint 2

  // generate other function positions
  const ratFunction = getRandomWithExclusions(0, 2, [1, sqRtFunction])
  const lnFunction = getRandomWithExclusions(0, 2, [sqRtFunction, ratFunction])
  const functionTypes = ["", "", ""] // array keeping track of type of 3 functions
  functionTypes[sqRtFunction] = "root"
  functionTypes[lnFunction] = "ln"
  functionTypes[ratFunction] = "rat"

  let ans = getRandomNumber(0, 2) // correct answer option
  const firstYAtContX = Math.round(math.evaluate(srF, { x: continuousX })); //srF's yVal
  const secondYAtContX = (ans === 1) ? getRandomWithExclusions(-7, 7, [firstYAtContX, 0]) : firstYAtContX // based on answer determineif f should be continuous at contX
  let defaultEpY: number | string; // default and other endpoint vals
  let otherEpY: number | string;

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
  // find ep value from middle function
  if (sqRtFunction === 1) {
    // if sqrt function in the middle use nerdamer to keep sqrt
    defaultEpY = nerdamer(piecewiseFunctions[1].f)
      .sub(`x`, firstOrSecond === 0 ? endpoint1 : endpoint2)
      .simplify()
      .toString();
  } else {
    defaultEpY = math.evaluate(piecewiseFunctions[1].f,
      { x: firstOrSecond === 0 ? endpoint1 : endpoint2 })
  }

  // based on value of default and answer, determine other ep value
  if (Number.isNaN(Number(defaultEpY))) {
    otherEpY = (ans === 2) ? getRandomWithExclusions(-7, 7, [0]) : defaultEpY
  } else {
    defaultEpY = Number(defaultEpY)
    otherEpY = (ans === 2) ? getRandomWithExclusions(-7, 7, [defaultEpY, 0]) : defaultEpY
  }

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

  // helpers for hints
  const leftVal = nerdamer(nerdamer(piecewiseFunctions[1 - firstOrSecond].f)
    .sub(`x`, `${continuousX}`)
    .simplify()).toTeX() // left limit val for continuous x

  const rightVal = nerdamer(nerdamer(piecewiseFunctions[2 - firstOrSecond].f)
    .sub(`x`, `${continuousX}`)
    .simplify()).toTeX() // right limit val for continuous x

  const ep1Val = nerdamer(nerdamer(piecewiseFunctions[0].f)
    .sub(`x`, `${endpoint1}`)
    .simplify()).toTeX() // endpoint1 function val

  const ep2Val = nerdamer(nerdamer(piecewiseFunctions[2].f)
    .sub(`x`, `${endpoint2}`)
    .simplify()).toTeX() // endpoint2 function val

  const ep1Limit = nerdamer(nerdamer(piecewiseFunctions[1 - firstOrSecond].f)
    .sub(`x`, `${endpoint1}`)
    .simplify()).toTeX() // endpoint1 limit

  const ep2Limit = nerdamer(nerdamer(piecewiseFunctions[2 - firstOrSecond].f)
    .sub(`x`, `${endpoint2}`)
    .simplify()).toTeX() // endpoint 2 limit

  // convert everything to latex
  for (let i = 0; i < 3; i++) {
    piecewiseFunctions[i].f = formatPolynomialToLatex(piecewiseFunctions[i].f)
  }

  const contFunction = piecewiseFunctions[1 - firstOrSecond].f
    .replaceAll(`x`, `(${continuousX})`) // function evaluation for continuousX

  const ep1Function = piecewiseFunctions[0].f
    .replaceAll(`x`, `(${endpoint1})`) // function evaluation for endpoint1

  const ep2Function = piecewiseFunctions[2].f
    .replaceAll(`x`, `(${endpoint2})`) // function evaluation for endpoint2

  const title = <></>

  const question = <div className="flex vertical center medium-gap">
    <h2>
      Is <Latex expression="f(x)" /> continous on <Latex expression={`[${endpoint1}, ${endpoint2}]`} />?
    </h2>
    <Piecewise classes="large-font" functions={piecewiseFunctions} title={`f(x)`} />
  </div>

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

  // generate hints
  const hints: React.JSX.Element[] = [
    <>
      <div>
        Remember, we have 2 conditions to verify continuity on the closed interval <Latex expression={`[${endpoint1}, ${endpoint2}]`} /> for this function:
      </div>
      <div>
        <ul className="text-start">
          <li>
            <Latex expression="f(x)" /> is continuous on <Latex expression="(a, b)" />
          </li>
          <li>
            <Latex expression={`\\lim_{x \\to a${RIGHT_LIMIT}} = f(a)`} /> and <Latex expression={`\\lim_{x \\to b${LEFT_LIMIT}} = f(b)`} />
          </li>
        </ul>
      </div>
    </>,
    <>
      <div>
        Let's start with verifying that <Latex expression="f(x)" /> is continuous on <Latex expression={`(${endpoint1}, ${endpoint2})`} />. First, it is worthwhile noting that at <Latex expression={`x = ${continuousX}`} />, there is a change in functions. Thus, for this condition, 3 things must be verified:
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
    </>,
    <>
      <div>
        Starting with the 1st and 3rd conditions, you need to find if:
      </div>
      <div>
        <Latex expression={piecewiseFunctions[1 - firstOrSecond].f} /> is continuous on <Latex expression={`(${endpoint1}, ${continuousX})`} />, and
      </div>
      <div>
        <Latex expression={piecewiseFunctions[2 - firstOrSecond].f} /> is continuous on <Latex expression={`(${continuousX}, ${endpoint2})`} />.
      </div>
      <div>
        Do this by finding the domains of both functions.
      </div>
    </>,
    <>
      <div>
        You should find that both functions are continuous on those intervals.
      </div>
      <div>
        Now, move on to the 2nd condition: is <Latex expression={`f(x)`} /> continuous at <Latex expression={`x = ${continuousX}`} />?
      </div>
      <div>
        To do this, remember we need to check 2 conditions:
      </div>
      <ul className="text-start">
        <li>
          <Latex expression={`\\lim_{x \\to ${continuousX}} f(x)`} /> must <strong>exist</strong>
        </li>
        <li>
          <Latex expression={`\\lim_{x \\to ${continuousX}} f(x) = f(${continuousX})`} display={true} />
        </li>
      </ul>
    </>,
    <>
      <div>
        You should find:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${continuousX}${LEFT_LIMIT}} f(x) = \\lim_{x \\to ${continuousX}${LEFT_LIMIT}} ${piecewiseFunctions[1 - firstOrSecond].f} = ${leftVal}`} display={true} />
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${continuousX}${RIGHT_LIMIT}} f(x) = \\lim_{x \\to ${continuousX}${RIGHT_LIMIT}} ${piecewiseFunctions[2 - firstOrSecond].f} = ${rightVal}`} display={true} />
      </div>
      <div>
        <Latex expression={`f(${continuousX}) = ${contFunction} = ${leftVal}`} display={true} />
      </div>
    </>
  ]

  if (ans === 1) {
    hints.push(
      <>
        <div>
          Since <Latex expression={`\\lim_{x \\to ${continuousX}${LEFT_LIMIT}} f(x) \\neq \\lim_{x \\to ${continuousX}${RIGHT_LIMIT}} f(x)`} />, <Latex expression="f(x)" /> is not continuous at <Latex expression={`x = ${continuousX}`} />.
        </div>
      </>,
      <>
        <div>
          Thus, the correct answer is:
        </div>
        <div className="hint-ans input correct ans">
          {options[ans].component}
        </div>
      </>
    )
  } else {
    hints.push(
      <>
        <div>
          Since <Latex expression={`\\lim_{x \\to ${continuousX}${LEFT_LIMIT}} f(x) = \\lim_{x \\to ${continuousX}${RIGHT_LIMIT}} f(x)`} />, and <Latex expression={`\\lim_{x \\to ${continuousX}} f(x) = f(${continuousX})`} />, <Latex expression="f(x)" /> is continuous at <Latex expression={`x = ${continuousX}`} />.
        </div>
        <div>
          Thus, we know <Latex expression="f(x)" /> is continuous on <Latex expression={`(${endpoint1}, ${endpoint2})`} />.
        </div>
      </>,
      <>
        <div>
          Now, check whether <Latex expression={`\\lim_{x \\to ${endpoint1}${RIGHT_LIMIT}} f(x) = f(${endpoint1})`} /> and <Latex expression={`\\lim_{x \\to ${endpoint2}${LEFT_LIMIT}} f(x) = f(${endpoint2})`} />.
        </div>
      </>,
      <>
        <div>
          Evaluating, you should find:
        </div>
        <div>
          <Latex expression={`\\lim_{x \\to ${endpoint1}${RIGHT_LIMIT}} f(x) = \\lim_{x \\to ${endpoint1}${RIGHT_LIMIT}} ${piecewiseFunctions[1 - firstOrSecond].f} = ${ep1Limit}`} display={true}/>
        </div>
        <div>
          <Latex expression={`f(${endpoint1}) = ${ep1Function} = ${ep1Val}`} display={true}/>
        </div>
        <div>
          <Latex expression={`\\lim_{x \\to ${endpoint2}${LEFT_LIMIT}} f(x)= \\lim_{x \\to ${endpoint2}${LEFT_LIMIT}} ${piecewiseFunctions[2 - firstOrSecond].f} = ${ep2Limit}`} display={true}/>
        </div>
        <div>
          <Latex expression={`f(${endpoint2}) = ${ep2Function} = ${ep2Val}`} display={true}/>
        </div>
      </>
    )

    if (ans === 0) {
      hints.push(
        <>
          <div>
            Since <Latex expression={`\\lim_{x \\to ${endpoint1}${RIGHT_LIMIT}} f(x)= f(${endpoint1})`} /> and <Latex expression={`\\lim_{x \\to ${endpoint2}${LEFT_LIMIT}} f(x)= f(${endpoint2})`} />, the correct answer is:
          </div>
          <div className="hint-ans input correct ans">
            {options[0].component}
          </div>
        </>
      )
    } else {
      hints.push(
        <>
          <div>
            It is clear that {firstOrSecond === 0 ?
              <Latex expression={`\\lim_{x \\to ${endpoint1}${RIGHT_LIMIT}} f(x) \\neq f(${endpoint1})`} /> :
              <Latex expression={`\\lim_{x \\to ${endpoint2}${LEFT_LIMIT}} f(x) \\neq f(${endpoint2})`} />}. Thus, the correct answer is:
          </div>
          <div className="hint-ans input correct ans">
            {options[2 + firstOrSecond].component}
          </div>
        </>
      )
    }
  }

  return { title, question, type: 'mc', input: options, hints }
}

/**
 * Gets a sqrt function to use in above piecewise question
 * @param x x value at which there should be a squared y val on function
 * @returns sqrt function that has a wide enough domain
 */
const getSqrtFunction = (x: number) => {
  let srF = getPolynomialFunctionWithPoint(2, x, getRandomNumber(1, 6) ** 2, true)
  let roots = getRootsOfPolynomial(srF)

  // keep generating function till it is valid for a wide enough domain
  while (!roots[0].includes("i") && !roots[1].includes("i") &&
    Number(roots[0]) !== Number(roots[1])) {
    if (Math.floor(Number(roots[1])) - Math.ceil(Number(roots[0])) > 1) {
      break;
    }
    srF = getPolynomialFunctionWithPoint(2, x, getRandomNumber(1, 6) ** 2, true)
    roots = getRootsOfPolynomial(srF)
  }

  return srF
}

/**
 * Function generation helper method for above question
 * @param srF square root function
 * @param functions types of functions
 * @param xYPairs x, y pairs that function should have a point at
 * @param leftXs left domains
 * @param rightXs right domains
 * @param domains domain strings
 * @param i index to use in all arrays  
 * @returns piecewise function with generated function and domain
 */
const getFunctionHelper = (srF: string, functions: string[], xYPairs: Array<number>[],
  leftXs: number[], rightXs: number[], domains: string[], i: number): PiecewiseFunction => {
  // do srF in case the function is a root - otherwise, generate function normally
  let f = srF;
  if (functions[i] !== "root") {
    f = generateFunction(functions[i], xYPairs[i][0], xYPairs[i][1], leftXs[i], rightXs[i])
  }
  return { f, domain: domains[i] }
}

/**
 * Generates specific function at (x, y)
 * @param type of function to generate
 * @param x value at which there should be a point
 * @param y value at which there should be a point
 * @param minValid x-value that function must be valid on
 * @param maxValid x-value that function must be valid on
 * @returns generated function string
 */
const generateFunction = (type: string, x: number, y: number | string,
  minValid: number, maxValid: number) => {
  if (type === "ln") {
    const num: number = typeof y === "string" ? getRandomWithExclusions(-7, 7, [0]) : y
    let node = getPolynomialFunctionWithPoint(getRandomNumber(1, 2), x, num)
    if (typeof y === "string") {
      // if y is a string (sqrt), use nerdamer to simplify
      node = `${nerdamer(`simplify(${y}/${num})`)}(${node})`
    }
    return `log(e^(${node}))`
  } else if (type === "rat") {
    // get factors with xvals that are beyond min and max valid
    const f1 = getStringFactorFromXval(maxValid + getRandomNumber(1, 2))
    const f2 = getStringFactorFromXval(minValid - getRandomNumber(1, 2))

    const bottomExpression = sortPolynomialByDegree(nerdamer(`${f1}${f2}`).expand());
    const bottom = math.evaluate(bottomExpression, { x })

    // use nerdamer to simplify in case y is a sqrt
    const top = nerdamer(`simplify((${bottom})(${y}))`).toString()
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
