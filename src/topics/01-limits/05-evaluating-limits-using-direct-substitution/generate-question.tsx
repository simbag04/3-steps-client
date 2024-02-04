import { getPolynomialFunctionWithPoint } from "../../../helpers/expression-generators";
import { generateOrderedValues, getRandomNumber, getRandomWithExclusions, getStringFactorFromXval, shuffleArray, sortPolynomialByDegree } from "../../../helpers/functions";
import * as math from "mathjs"
import Latex from "../../../components/latex/Latex";
import { Piecewise } from "../../../components/latex/Piecewise"
import React from "react";
import { PiecewiseFunction } from "../../../@types/PiecewiseFunction";
import { Option } from "../../../@types/Option";
import { Question } from "../../../@types/Question";
import { LEFT_LIMIT, RIGHT_LIMIT } from "../../../helpers/constants";
const nerdamer = require("nerdamer/all.min")

/**
 * generates random question with piecewise function, user is asked to find a limit using that function
 * @returns relevant question components
 */
const piecewiseToLimit = (): Question => {
  const title = <></>
  const functions: PiecewiseFunction[] = []; // array for piecewise
  const mathFs = []; // array of mathjs functions
  const xValues = generateOrderedValues(2, true, -3, 2); // random xvalues
  let yValues = [getRandomNumber(-7, 7), getRandomNumber(-7, 7)]; // random y values
  let includes = getRandomNumber(0, 1); // whether current xval is included in domain

  // generate functions
  for (let i = 0; i <= xValues.length; i++) {
    // figure out domain of values and functions
    let domain: string; // latex domain
    let f: string; // function for domain
    let xVal: number; // xval to have point at
    let yVal: number; // yval to have point at
    if (i === 0) {
      domain = `x ${includes ? "\\leq" : "<"} ${xValues[i]}`
      xVal = xValues[i];
      yVal = yValues[i];
    } else if (i === xValues.length) {
      domain = `x ${includes ? ">" : "\\geq"} ${xValues[i - 1]}`
      xVal = xValues[i - 1];
      yVal = yValues[i - 1];
    } else {
      // 2-sided domain
      domain = `${xValues[i - 1]} ${includes ? "<" : "\\leq"} x`;
      includes = getRandomNumber(0, 1);
      domain = domain + ` ${includes ? "\\leq" : "<"} ${xValues[i]}`

      // random which xval functions are continuous at
      const match = getRandomNumber(0, 1) ? i - 1 : i;
      xVal = xValues[match];
      yVal = yValues[match];
    }

    // generate function
    let degree = Math.abs(xVal) > 2 ? 1 : getRandomNumber(1, 2); // only do degree 2 for small x
    f = getPolynomialFunctionWithPoint(degree, xVal,
      getRandomNumber(0, 1) ? yVal : getRandomNumber(-7, 7));

    // store function to evaluate f
    const node = math.parse(f);
    mathFs.push((x: number) => node.evaluate({ x }));

    // format f
    f = math.simplifyCore(f).toTex({ parenthesis: 'auto' }).replaceAll('\\cdot', "");
    functions.push({ f, domain });
  }

  const question = <>
    <div className="flex vertical center">
      <h2>Evaluate the limit.</h2>
      <div>Enter "dne" if the limit doesn't exist.</div>
    </div>
    <Piecewise functions={functions} title={`f(x)`} />
  </>

  // find answer
  // 0: left, 1: right, 2: 2-sided
  const sign = getRandomNumber(0, 2);
  const x = xValues[getRandomNumber(0, xValues.length - 1)];
  let ans: number | string;
  const fsToUse = []
  for (let i = 0; i < xValues.length; i++) {
    if (x === xValues[i]) {
      let f1 = Math.round(mathFs[i](x));
      let f2 = Math.round(mathFs[i + 1](x));
      if (sign === 0) {
        ans = f1;
        fsToUse.push({ f: functions[i].f, value: f1 })
      } else if (sign === 1) {
        ans = f2;
        fsToUse.push({ f: functions[i + 1].f, value: f2 })
      } else {
        ans = f1 === f2 ? f1 : 'dne'
        fsToUse.push({ f: functions[i].f, value: f1 })
        fsToUse.push({ f: functions[i + 1].f, value: f2 })
      }
    }
  }

  // other relevant components
  const signText = sign === 0 ? `^{\\footnotesize\\texttt{-}}` : sign === 1 ? `^{\\footnotesize\\texttt{+}}` : ``;
  const nextToInput = <span>
    <Latex classes="bold" expression={`\\lim_{x \\to ${x + signText}}g(x)`} inline={true} /> =
  </span>

  const hints = [
    <>
      <div>
        In this case, we want to evaluate the limit as <Latex expression="x" /> approaches <Latex expression={`${x}`} /> from {sign === 2 ? <strong>both sides</strong> : sign === 1 ? <>the <strong>right</strong></> : <>the <strong>left</strong></>}.
        Focus on the functions around <Latex expression={`x = ${x}`} />.
      </div>
    </>
  ]

  if (sign === 2) {
    hints.push(
      <div>
        Since we want to evaluate the limit from both sides, we need to look at the limits from both the left and the right of <Latex expression={`x = ${x}`} />.
      </div>,
      <>
        <div>
          Evaluating from the left, you should get:
        </div>
        <div>
          <Latex expression={`\\lim_{x \\to ${x}${LEFT_LIMIT}} f(x) = \\lim_{x \\to ${x}${LEFT_LIMIT}} ${fsToUse[0].f} = ${fsToUse[0].value}`} display={true} />
        </div>

        <div>
          Evaluating from the right, you should get:
        </div>
        <div>
          <Latex expression={`\\lim_{x \\to ${x}${RIGHT_LIMIT}} f(x) = \\lim_{x \\to ${x}${RIGHT_LIMIT}} ${fsToUse[1].f} = ${fsToUse[1].value}`} display={true} />
        </div>
      </>,
      <>
        <div>
          Since these limits are {ans === "dne" ? "not" : ""} equal, we know the correct answer is:
        </div>
        <div className="hint-ans input correct ans">
          {ans}
        </div>
      </>
    )
  } else {
    hints.push(
      <div>
        Since we want to evaluate the limit from the <strong>{sign === 0 ? "left" : "right"}</strong> of <Latex expression={`x = ${x}`} />, we should use the function <Latex expression={fsToUse[0].f} />.
      </div>,
      <>
        <div>
          Evaluating the limit, we get:
        </div>
        <div>
          <Latex expression={`\\lim_{x \\to ${x}${sign === 0 ? LEFT_LIMIT : RIGHT_LIMIT}} f(x) = \\lim_{x \\to ${x}${sign === 0 ? LEFT_LIMIT : RIGHT_LIMIT}} ${fsToUse[0].f} = ${fsToUse[0].value}`} display={true} />
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

  return { title, question, ans, type: 'math', nextToInput, hints }
}

/**
 * generates random absolute value quadratic and user is asked to select which piecewise function corresponds to it.
 * @returns relevant question components
 */
const absValueToPiecewise = (): Question => {
  const title = <></>

  // get two factors
  const x1 = getRandomNumber(-7, 7)
  const xvalues = [x1, getRandomWithExclusions(-7, 7, [x1])]
  xvalues.sort((a, b) => a - b)

  const f1 = getStringFactorFromXval(xvalues[0])
  const f2 = getStringFactorFromXval(xvalues[1])
  const neg = getRandomNumber(0, 1); // whether provided function is negative or positive

  // get normal expanded version and negative expanded version
  let expanded = sortPolynomialByDegree(nerdamer(`${f1}${f2}`).expand());
  expanded = nerdamer(expanded).toTeX().replaceAll(`\\cdot`, '')

  let negExpanded = sortPolynomialByDegree(nerdamer(`-${f1}${f2}`).expand());
  negExpanded = nerdamer(negExpanded).toTeX().replaceAll(`\\cdot`, '')

  const question = <>
    <h3>Select the piecewise function corresponding to this absolute value function: </h3>
    <Latex expression={`g(x) = |${neg ? negExpanded : expanded}|`} classes={'large-font'} />
  </>

  // function arrays for each option
  const piecewise1: PiecewiseFunction[] = [
    {
      f: expanded,
      domain: `x \\leq ${xvalues[0]}`
    },
    {
      f: negExpanded,
      domain: `${xvalues[0]} < x < ${xvalues[1]}`
    },
    {
      f: expanded,
      domain: `x \\geq ${xvalues[1]}`
    }
  ]

  const piecewise2: PiecewiseFunction[] = [
    {
      f: negExpanded,
      domain: `x \\leq ${xvalues[0]}`
    },
    {
      f: expanded,
      domain: `${xvalues[0]} < x < ${xvalues[1]}`
    },
    {
      f: negExpanded,
      domain: `x \\geq ${xvalues[1]}`
    }
  ]

  const piecewise3: PiecewiseFunction[] = [
    {
      f: expanded,
      domain: `x \\leq 0`
    },
    {
      f: negExpanded,
      domain: `x > 0`
    }
  ]

  // create options array
  const options: Option[] = [
    {
      component: <Piecewise functions={piecewise1} title={`g(x)`} />,
      correct: true
    },
    {
      component: <Piecewise functions={piecewise2} title={`g(x)`} />,
      correct: false
    },
    {
      component: <Piecewise functions={piecewise3} title={`g(x)`} />,
      correct: false
    }
  ]

  const hints = [
    <>
      <div>
        In order to convert an absolute value function to a piecewise function, the first thing we have to do is find where the function inside is <Latex expression={`>`} /> or <Latex expression={`<`} /> 0.
      </div>
      <div>
        In this case, we have a quadratic equation inside the absolute value. In order to find where this is above or below 0, first find its zeros.
      </div>
    </>,
    <>
      <div>
        You should've found that the zeros are <Latex expression={`x = ${xvalues[0]}`} /> and <Latex expression={`x = ${xvalues[1]}`} />.
      </div>
      <div>
        Now, think about whether the parabola is right side up or upside down.
      </div>
    </>,
    <>
      <div>
        Since the coefficient of the <Latex expression="x^2" /> term is {neg ? "negative" : "positive"}, we know the parabola is {neg ? "upside down" : "right side up"}.
      </div>
      <div>
        This means that when <Latex expression={`x < ${xvalues[0]}`} /> and <Latex expression={`x > ${xvalues[1]}`} />, the quadratic is {neg ? "negative" : "positive"}. When <Latex expression={`${xvalues[0]} < x < ${xvalues[1]}`} />, the quadratic is {!neg ? "negative" : "positive"}.
      </div>
    </>,
    <>
      <div>
        We can use this to create our piecewise function. Absolute value basically means that negative values are made positive. Thus, wherever our quadratic is negative, for that domain only, we will multiply the quadratic by <Latex expression="-1" />. 
      </div>
      <div>
        Basically, when {neg ? <><Latex expression={`x < ${xvalues[0]}`} /> and <Latex expression={`x > ${xvalues[1]}`} /></> : <Latex expression={`${xvalues[0]} < x < ${xvalues[1]}`} />}, our piecewise function will be <Latex expression={`${neg ? expanded : negExpanded}`} />. 
      </div>
      <div>
        Otherwise, when {!neg ? <><Latex expression={`x < ${xvalues[0]}`} /> and <Latex expression={`x > ${xvalues[1]}`} /></> : <Latex expression={`${xvalues[0]} < x < ${xvalues[1]}`} />} it will be <Latex expression={`${neg ? negExpanded : expanded}`} />.
      </div>
    </>,
    <>
      <div>
        This means that the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        {options[0].component}
      </div>
    </>

  ]

  return { title, question, type: 'mc', input: shuffleArray(options), hints }
}

const generateRandomQuestion = (): Question => {
  // determine type of question to generate
  const rand = getRandomNumber(1, 10)
  let q = null;
  if (rand <= 6) {
    q = piecewiseToLimit();
  } else {
    q = absValueToPiecewise()
  }
  return q;
}

export default generateRandomQuestion;