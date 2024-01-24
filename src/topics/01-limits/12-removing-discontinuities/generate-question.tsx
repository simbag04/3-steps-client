import { buildPolynomialFromCoeffs, formatPolynomialToLatex, getCoeffsOfPolynomial, getRandomNumber } from "../../../helpers/functions";
import { getStringFactorFromXval, sortPolynomialByDegree, getRandomWithExclusions, generateOrderedValues } from "../../../helpers/functions";
import { getPolynomialFunction, generateSpecialTrig, getPolynomialFunctionWithPoint } from "../../../helpers/expression-generators"
import * as math from "mathjs"
import { PiecewiseFunction } from "../../../types/PiecewiseFunction";
import Latex from "../../../components/latex/Latex";
import React from "react";
import { Piecewise } from "../../../components/latex/Piecewise";

const nerdamer = require("nerdamer/all.min")

const factoringFunctionValueDiscontinuity = () => {
  const holeX: number = getRandomNumber(-5, 5); // xvalue to ask about
  const holeFactor: string = getStringFactorFromXval(holeX); // xval hole factor

  // generate the other factor(s) on top and bottom
  let topFactor: string = getRandomNumber(0, 1) === 0 ? getPolynomialFunction(1) : "1";
  let bottomFactor: string = topFactor;

  // evaluate values for top and bottom factor
  const topValue: number = math.evaluate(topFactor, { x: holeX });
  let bottomValue: number = math.evaluate(bottomFactor, { x: holeX });

  // make sure bottom factor is different from top factor and bottom isn't 0 as we dont want dne
  while (bottomFactor === topFactor || bottomValue === 0) {
    bottomFactor = (getRandomNumber(0, 1) === 0 || topFactor === "1") ? getPolynomialFunction(1) : "1";
    bottomValue = math.evaluate(bottomFactor, { x: holeX });
  }

  let numerator: string =
    sortPolynomialByDegree(nerdamer(`${holeFactor}(${topFactor})`).expand());
  let denominator: string =
    sortPolynomialByDegree(nerdamer(`${holeFactor}(${bottomFactor})`).expand());

  const ans = math.simplify(`(${topValue})/${bottomValue}`, { x: holeX }).toString();

  const piecewise: PiecewiseFunction[] = [
    {
      f: `\\frac{${numerator}}{${denominator}}`,
      domain: `x \\neq ${holeX}`
    },
    {
      f: `a`,
      domain: `x = ${holeX}`
    }
  ]

  const hints = [
    <div className="flex vertical center medium-gap">
      <div>
        We need to find the value of <Latex expression="a" /> that makes <Latex expression="f(x)" /> continuous at {`x = ${holeX}`}
      </div>
      <Piecewise title="f(x)" functions={piecewise} display={true}></Piecewise>
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
    </div>,
    <div>
      Use the top equation to find <Latex expression={`\\lim_{x \\to ${holeX}} f(x)`} />. Be sure to apply the appropriate techniques to find the correct limit.
    </div>,
    <div>
      Now, you should be able to use the 2nd condition of continuity to find <Latex expression="a" />!
    </div>
  ]
  const nextToInput = <Latex expression={`a = `} display={true} />
  const title = <></>
  const question = <>
    <h4>For what value of <Latex expression="a" /> will <Latex expression="f(x)" /> be continuous at <Latex expression={`x = ${holeX}`} />?</h4>
    <Piecewise title="f(x)" functions={piecewise}></Piecewise>
  </>
  return { title, question, nextToInput, ans, hints, type: 'math' }
}

const trigFunctionValueDiscontinuity = () => {
  const degree = getRandomNumber(1, 3)
  let multipliedAns = "1)/(1"; // expanded ans based on coeffs of problem
  let obj = generateSpecialTrig(degree, multipliedAns, false)
  let numerator = obj.term
  multipliedAns = obj.multipliedAns

  obj = generateSpecialTrig(degree, multipliedAns, true)
  let denominator = obj.term
  multipliedAns = obj.multipliedAns

  multipliedAns = "(" + multipliedAns + ")"
  const ans = math.simplify(multipliedAns).toString()
  const piecewise: PiecewiseFunction[] = [
    {
      f: `\\frac{${numerator}}{${denominator}}`,
      domain: `x \\neq 0`
    },
    {
      f: `a`,
      domain: `x = 0`
    }
  ]

  const hints = [
    <div className="flex vertical center medium-gap">
      <div>
        We need to find the value of <Latex expression="a" /> that makes <Latex expression="f(x)" /> continuous at {`x = 0`}
      </div>
      <Piecewise title="f(x)" functions={piecewise} display={true}></Piecewise>
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
    </div>,
    <div>
      Use the top equation to find <Latex expression={`\\lim_{x \\to 0} f(x)`} />. Be sure to apply the appropriate techniques to find the correct limit.
    </div>,
    <div>
      Now, you should be able to use the 2nd condition of continuity to find <Latex expression="a" />!
    </div>
  ]

  const nextToInput = <Latex expression={`a = `} display={true} />
  const title = <></>
  const question = <>
    <h4>For what value of <Latex expression="a" /> will <Latex expression="f(x)" /> be continuous at <Latex expression={`x = 0`} />?</h4>
    <Piecewise title="f(x)" functions={piecewise}></Piecewise>
  </>
  return { title, question, nextToInput, ans, hints, type: 'math' }
}

const limitDiscontinuity = () => {
  const functions: PiecewiseFunction[] = []; // array for piecewise
  const numFunctions = getRandomNumber(0, 10) <= 6 ? 1 : 2
  const xValues = generateOrderedValues(numFunctions, true, -3, 2); // random xvalues
  let yValues = []; // array for random y values
  let xIndex = getRandomNumber(0, xValues.length - 1); // index of x val to ask about 

  // ensure xval isn't 0
  if (xValues[xIndex] === 0) {
    if (xValues.length === 1) {
      xValues[0] = getRandomWithExclusions(-3, 3, [0])
    } else {
      xIndex = getRandomWithExclusions(0, xValues.length - 1, [xIndex])
    }
  }
  const x = xValues[xIndex] // actual x val to ask about

  // generate y values
  for (let i = 0; i < numFunctions; i++) {
    yValues.push(getRandomNumber(-7, 7))
  }

  // whether there is a separate value at the function
  const separateFunctionVal = (numFunctions === 1) ? getRandomNumber(0, 10) <= 6 : false
  // 0: ask left limit, 1: ask right limit, 2: ask about function val
  const continuous = separateFunctionVal ? getRandomNumber(0, 2) : getRandomNumber(0, 1)
  let includes = xIndex === 0 && separateFunctionVal ? 0 : getRandomNumber(0, 1); // whether current xval is included in domain - don't include if there is a separate function value
  let ans;

  // generate functions
  for (let i = 0; i <= xValues.length; i++) {
    // figure out domain of values and functions
    let domain: string; // latex domain
    let f: string; // function for domain
    let xVal: number; // xval to have point at
    let yVal: number; // yval to have point at

    // add number at function
    if (i - 1 === xIndex && separateFunctionVal) {
      functions.push({ f: continuous !== 2 ? String(yValues[xIndex]) : `a`, domain: `x = ${x}` })
      includes = 1 // don't include xval in next function
      if (continuous === 2) {
        ans = yValues[xIndex]
      }
    }

    if (i === 0) {
      domain = `x ${includes ? "\\leq" : "<"} ${xValues[i]}`
      xVal = xValues[i];
      yVal = yValues[i];
    } else if (i === xValues.length) {
      domain = `x ${includes ? ">" : "\\geq"} ${xValues[i - 1]}`
      xVal = xValues[i - 1];
      yVal = yValues[i - 1]
    } else {
      // 2-sided domain
      domain = `${xValues[i - 1]} ${includes ? "<" : "\\leq"} x`;
      includes = xIndex === i && separateFunctionVal ? 0 : getRandomNumber(0, 1);
      domain = domain + ` ${includes ? "\\leq" : "<"} ${xValues[i]}`

      xVal = xValues[xIndex];
      yVal = yValues[xIndex];
    }

    // generate function
    let degree = Math.abs(xVal) > 2 ? 1 : getRandomNumber(1, 2); // only do degree 2 for small x
    f = getPolynomialFunctionWithPoint(degree, xVal, yVal, true);
    f = math.simplifyCore(f).toString() // simplify f before finding coeffs

    // replace coefficient if this is the correct function to change
    if (continuous !== 2 && continuous + xIndex === i) {
      const obj = replaceCoefficientWithVar(f)
      f = obj.f
      ans = obj.ans
    }

    // format f
    f = formatPolynomialToLatex(f);
    functions.push({ f, domain });
  }

  const hints = [
    <div className="flex vertical center medium-gap">
      <div>
        We need to find the value of <Latex expression="a" /> that makes <Latex expression="f(x)" /> continuous at {`x = ${x}`}
      </div>
      <Piecewise title="f(x)" functions={functions} display={true}></Piecewise>
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
    </div>,
    <div>
      First, we need to make sure the limit exists. Since this is a piecewise function and we are trying to make it continuous at <Latex expression={`x = ${x}`} />, we need to make sure <Latex expression={`\\lim_{x \\to ${x}^{\\footnotesize\\texttt{-}}} f(x) = \\lim_{x \\to ${x}^{\\footnotesize\\texttt{+}}} f(x)`} />.
    </div>,
    <>
      {continuous === 2 ?
        <div>
          Once you've verified this, move on to the next condition. What must be the value of <Latex expression={`f(${x})`} />?
        </div> :
        <div>
          This should help you find a value for <Latex expression="a" />! Once you find this value, make sure you also verify that the 2nd condition holds with your <Latex expression="a" /> value.
        </div>}
    </>,
  ]
  const nextToInput = <Latex expression={`a = `} display={true} />
  const title = <></>
  const question = <>
    <h4>For what value of <Latex expression="a" /> will <Latex expression="f(x)" /> be continuous at <Latex expression={`x = ${x}`} />?</h4>
    <Piecewise title="f(x)" functions={functions}></Piecewise>
  </>

  return { title, question, nextToInput, ans, hints, type: 'math' }
}

const replaceCoefficientWithVar = (f: string) => {
  const coeffs: any[] = getCoeffsOfPolynomial(f)
  let toChange = getRandomNumber(0, coeffs.length - 1)

  // ensure a value isn't 0
  while (coeffs[toChange] === 0) {
    toChange = getRandomNumber(0, coeffs.length - 1)
  }

  const oldAns = coeffs[toChange]
  coeffs[toChange] = 'a'

  return { ans: oldAns, f: buildPolynomialFromCoeffs(coeffs) }
}

const generateRandomQuestion = () => {
  const rand = getRandomNumber(0, 9)
  if (rand <= 1) {
    return factoringFunctionValueDiscontinuity()
  } else if (rand <= 3) {
    return trigFunctionValueDiscontinuity
  } else {
    return limitDiscontinuity()
  }
}

export default generateRandomQuestion