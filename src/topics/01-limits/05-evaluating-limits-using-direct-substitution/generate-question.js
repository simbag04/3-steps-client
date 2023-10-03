import { getPolynomialFunctionWithPoint } from "../../../helpers/expression-generators";
import { generateOrderedValues, getRandomNumber, getRandomWithExclusions, getStringFactorFromXval, shuffleArray, sortPolynomialByDegree } from "../../../helpers/functions";
import * as math from "mathjs"
import Latex from "../../../components/latex/Latex";
import { Piecewise } from "../../../components/latex/Piecewise"
const nerdamer = require("nerdamer/all.min")

/**
 * generates random question with piecewise function, user is asked to find a limit using that function
 * @returns relevant question components
 */
function piecewiseToLimit() {
  const title = <div className="flex vertical center">
    <h2>Evaluate the limit.</h2>
    <div>Enter "dne" if the limit doesn't exist</div>
  </div>

  const functions = []; // array for piecewise
  const mathFs = []; // array of mathjs functions
  const xValues = generateOrderedValues(2, true, -3, 2); // random xvalues
  let yValues = [getRandomNumber(-7, 7), getRandomNumber(-7, 7)]; // random y values
  let includes = getRandomNumber(0, 1); // whether current xval is included in domain

  // generate functions
  for (let i = 0; i <= xValues.length; i++) {
    // figure out domain of values and functions
    let domain; // latex domain
    let f; // function for domain
    let xVal; // xval to have point at
    let yVal; // yval to have point at
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
    mathFs.push((x) => node.evaluate({ x }));

    // format f
    f = math.simplifyCore(f).toTex({ parenthesis: 'auto' }).replaceAll('\\cdot', "");
    functions.push({ f, domain });
  }

  const question = <Piecewise functions={functions} title={`f(x)`} />

  // find answer
  // 0: left, 1: right, 2: 2-sided
  const sign = getRandomNumber(0, 2);
  const x = xValues[getRandomNumber(0, xValues.length - 1)];
  let ans;
  for (let i = 0; i < xValues.length; i++) {
    if (x === xValues[i]) {
      let f1 = Math.round(mathFs[i](x));
      let f2 = Math.round(mathFs[i + 1](x));
      if (sign === 0) {
        ans = f1;
      } else if (sign === 1) {
        ans = f2;
      } else {
        ans = f1 === f2 ? f1 : 'dne'
      }
    }
  }

  // other relevant components
  const signText = sign === 0 ? `^\\textbf{-}` : sign === 1 ? `^\\textbf{+}` : ``;
  const nextToInput = <span>
    <Latex expression={`\\lim_{x \\to ${x + signText}}g(x)`} inline={true} /> =
  </span>

  const hints = [
    <div className="flex vertical center small-gap">
      <div>
        {question}
      </div>
      <div>
        {nextToInput} ?
      </div>
      <div>
        Focus on the functions around <Latex expression={`x = ${x}`} />.
      </div>
    </div>,
    <div>
      Which side(s) are we evaluating the limit from? Based on that, which function(s) should we use to find the limit?
    </div>
  ]

  return { title, question, ans, type: 'frq', nextToInput, hints }
}

/**
 * generates random absolute value quadratic and user is asked to select which piecewise function corresponds to it.
 * @returns relevant question components
 */
function absValueToPiecewise() {
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
  const piecewise1 = [
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

  const piecewise2 = [
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

  const piecewise3 = [
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
  const options = [
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
    <div className="flex vertical center small-gap">
      <div>
        Remember we need to find where the function inside the absolute value is <Latex expression={`>`} /> or <Latex expression={`<`} /> 0. How can we do that with a quadratic?
      </div>
      <Latex expression={`g(x) = |${neg ? negExpanded : expanded}|`} classes={'large-font'} />
    </div>,
    <>
      <div>
        Once you've found when the function is <Latex expression={`>`} /> or <Latex expression={`<`} /> 0, how can we structure that in the piecewise format?
      </div>
      <div>
        Remember we need to make the whole function negative for points where the function is <Latex expression={`<`} /> 0.
      </div>
    </>

  ]

  return { title, question, type: 'mc', input: shuffleArray(options), hints }
}

function generateRandomQuestion() {
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