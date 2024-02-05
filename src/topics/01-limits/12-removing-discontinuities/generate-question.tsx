import { buildPolynomialFromCoeffs, formatPolynomialToLatex, getCoeffsOfPolynomial, getRandomNumber } from "../../../helpers/functions";
import { getStringFactorFromXval, sortPolynomialByDegree, getRandomWithExclusions, generateOrderedValues } from "../../../helpers/functions";
import { getPolynomialFunction, generateSpecialTrig, getPolynomialFunctionWithPoint } from "../../../helpers/expression-generators"
import * as math from "mathjs"
import { PiecewiseFunction } from "../../../@types/PiecewiseFunction";
import Latex from "../../../components/latex/Latex";
import React from "react";
import { Piecewise } from "../../../components/latex/Piecewise";
import { LEFT_LIMIT, RIGHT_LIMIT } from "../../../helpers/constants";

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
      f: `b`,
      domain: `x = ${holeX}`
    }
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
        Remember limits are about a function is <strong>approaching</strong>, not necessarily the function value at a point.
      </div>
      <div>
        Thus, use the top equation to find <Latex expression={`\\lim_{x \\to ${holeX}} f(x)`} />.
      </div>
      <div>
        You will need to factor the top and bottom and cancel a factor to find the correct limit.
      </div>
    </>,
    <>
      <div>
        You should have gotten:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${holeX}} \\left(\\frac{${numerator}}{${denominator}}\\right) = ${math.parse(ans).toTex()}`} display={true} />
      </div>
    </>,
    <>
      <div>
        Now, you need <Latex classes="bold" expression={`\\lim_{x \\to ${holeX}} f(x) = f(${holeX})`} />
      </div>
      <div>
        This means that:
      </div>
      <div>
        <Latex classes="bold" expression={`\\lim_{x \\to ${holeX}} f(x) = ${math.parse(ans).toTex()} = f(${holeX}) = b`} />
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
  ]
  const nextToInput = <Latex expression={`b = `} display={true} />
  const title = <></>
  const question = <>
    <h3>For what value of <Latex expression="b" /> will <Latex expression="f(x)" /> be continuous at <Latex expression={`x = ${holeX}`} />?</h3>
    <Piecewise classes="large-font" title="f(x)" functions={piecewise} display={true}></Piecewise>
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
      f: `b`,
      domain: `x = 0`
    }
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
        Remember limits are about a function is <strong>approaching</strong>, not necessarily the function value at a point.
      </div>
      <div>
        Thus, use the top equation to find <Latex expression={`\\lim_{x \\to ${0}} f(x)`} />.
      </div>
      <div>
        You will need to use the following special trig limits to find the correct limit:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\lim_{x \\to 0} \\frac{x}{\\sin x} = 1, \\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 1`} display={true} />
      </div>
    </>,
    <>
      <div>
        You should have gotten:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${0}} \\left(\\frac{${numerator}}{${denominator}}\\right) = ${math.parse(ans).toTex()}`} display={true} />
      </div>
    </>,
    <>
      <div>
        Now, you need <Latex classes="bold" expression={`\\lim_{x \\to ${0}} f(x) = f(${0})`} />
      </div>
      <div>
        This means that:
      </div>
      <div>
        <Latex classes="bold" expression={`\\lim_{x \\to ${0}} f(x) = ${math.parse(ans).toTex()} = f(${0}) = b`} />
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
  ]

  const nextToInput = <Latex expression={`b = `} display={true} />
  const title = <></>
  const question = <>
    <h4>For what value of <Latex expression="b" /> will <Latex expression="f(x)" /> be continuous at <Latex expression={`x = 0`} />?</h4>
    <Piecewise classes="large-font" title="f(x)" functions={piecewise} display={true}></Piecewise>
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
  const fsToUse = []

  // generate functions
  for (let i = 0; i <= xValues.length; i++) {
    // figure out domain of values and functions
    let domain: string; // latex domain
    let f: string; // function for domain
    let xVal: number; // xval to have point at
    let yVal: number; // yval to have point at
    let addF = false
    let simplifiedF = ''

    // add number at function
    if (i - 1 === xIndex && separateFunctionVal) {
      const y = continuous !== 2 ? String(yValues[xIndex]) : `b`
      functions.push({ f: y, domain: `x = ${x}` })
      includes = 1 // don't include xval in next function
      if (continuous === 2) {
        ans = yValues[xIndex]
      }
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
      yVal = yValues[i - 1]
      addF = !includes && i - 1 === xIndex
    } else {
      // 2-sided domain
      domain = `${xValues[i - 1]} ${includes ? "<" : "\\leq"} x`;
      addF = i - 1 === xIndex && !includes
      includes = xIndex === i && separateFunctionVal ? 0 : getRandomNumber(0, 1);
      addF = addF || (includes && xIndex === i)
      domain = domain + ` ${includes ? "\\leq" : "<"} ${xValues[i]}`

      xVal = xValues[xIndex];
      yVal = yValues[xIndex];
    }

    // generate function
    let degree = Math.abs(xVal) > 2 ? 1 : getRandomNumber(1, 2); // only do degree 2 for small x
    f = getPolynomialFunctionWithPoint(degree, xVal, yVal, true);
    f = math.simplifyCore(f).toString().replaceAll(' * ', '') // simplify f before finding coeffs

    // replace coefficient if this is the correct function to change
    if (continuous !== 2 && continuous + xIndex === i) {
      const obj = replaceCoefficientWithVar(f, xVal)
      f = obj.f
      ans = obj.ans
      simplifiedF = obj.simplified
    }

    // format f
    const replaced = f.includes('x')
    const bFunction = f.includes('b')
    let newf = f.replaceAll('x', `(${xVal})`)
    newf = newf.replaceAll('b', `(${ans})`)
    f = formatPolynomialToLatex(f).replaceAll(`\\mathrm`, '');
    functions.push({ f, domain });

    if (addF) {
      fsToUse.push({ type: 1, f: newf, value: yVal, simplified: bFunction ? simplifiedF : yVal, replaced })
    }

    if (i === xIndex || i - 1 === xIndex) {
      fsToUse.push({ type: i === xIndex ? 0 : 2, f, value: yVal, simplified: bFunction ? simplifiedF : yVal })
    }
  }

  fsToUse.sort((a, b) => a.type - b.type)

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
        In order to determine if <Latex classes="bold" expression={`\\lim_{x \\to ${x}} f(x)`} /> <strong>exists</strong>, we need <Latex classes="bold" expression={`\\lim_{x \\to ${x}${LEFT_LIMIT}} f(x) = \\lim_{x \\to ${x}${RIGHT_LIMIT}} f(x)`} />.
      </div>
    </>,
    <>
      <div>
        We can evaluate:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${x}${LEFT_LIMIT}} f(x) = \\lim_{x \\to ${x}} \\left(${fsToUse[0].f}\\right) = ${fsToUse[0].simplified}`} display={true} />
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${x}${RIGHT_LIMIT}} f(x) = \\lim_{x \\to ${x}} \\left(${fsToUse[2].f}\\right) = ${fsToUse[2].simplified}`} display={true} />
      </div>
    </>
  ]

  if (continuous !== 2) {
    hints.push(
      <>
        <div>
          Since both limits need to be equal, we have:
        </div>
        <div>
          <Latex expression={`${fsToUse[0].simplified} = ${fsToUse[2].simplified}`} display={true} />
          {fsToUse[0].simplified.length > 1 || fsToUse[2].simplified.length > 1 ?
            <Latex expression={`b = ${ans}`} display={true} /> : null}
        </div>
      </>,
      <>
        <div>
          Now, we need to verify <Latex classes="bold" expression={`\\lim_{x \\to ${x}} f(x) = f(${x})`} />{separateFunctionVal ? '' : <> with this value of <Latex expression="b" /></>}:
        </div>
        <div>
          <Latex expression={`f(${x}) = ${fsToUse[1].f}
          ${fsToUse[1].replaced ? `= ${fsToUse[1].value}` : ''} = \\lim_{x \\to ${x}} f(x)`} display={true} />
        </div>
      </>,
      <>
        <div>
          When <Latex expression={`b = ${ans}`} />, both conditions of continuity are satisfied!
        </div>
      </>
    )
  } else {
    hints.push(
      <>
        <div>
          The limits equal each other, so the first condition is satisfied. Now, we just need <Latex classes="bold" expression={`\\lim_{x \\to ${x}} f(x) = f(${x})`} />:
        </div>
        <div>
          <Latex expression={`\\lim_{x \\to ${x}} f(x) = ${fsToUse[0].value} = f(${x}) = b`} display={true} />
          <Latex expression={`b = ${ans}`} />
        </div>
      </>
    )
  }

  hints.push(
    <>
      <div>
        Thus, the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        {ans}
      </div>
    </>
  )

  const nextToInput = <Latex expression={`b = `} display={true} />
  const title = <></>
  const question = <>
    <h3>For what value of <Latex expression="b" /> will <Latex expression="f(x)" /> be continuous at <Latex expression={`x = ${x}`} />?</h3>
    <Piecewise title="f(x)" functions={functions} display={true}></Piecewise>
  </>

  return { title, question, nextToInput, ans, hints, type: 'math' }
}

const replaceCoefficientWithVar = (f: string, xval: number) => {
  const coeffs: any[] = getCoeffsOfPolynomial(f)
  let toChange = getRandomNumber(0, coeffs.length - 1)

  // ensure a value isn't 0
  while (coeffs[toChange] === 0) {
    toChange = getRandomNumber(0, coeffs.length - 1)
  }

  const oldAns = coeffs[toChange]
  coeffs[toChange] = 'b'

  // find simplified version
  let total = 0
  let simplified = ''
  for (let i = 0; i < coeffs.length; i++) {
    if (coeffs[i] === 'b') {
      const bcoeff = xval ** i
      simplified += `${bcoeff === 1 ? 'b' : bcoeff === -1 ? '-b' : `${bcoeff}b`}`
    } else {
      total += coeffs[i] * (xval ** i)
    }
  }
  simplified += `${total > 0 ? `+${total}` : total < 0 ? `${total}` : ''}`

  return { ans: oldAns, f: buildPolynomialFromCoeffs(coeffs), simplified }
}

const generateRandomQuestion = () => {
  const rand = 8 // getRandomNumber(0, 9)
  if (rand <= 1) {
    return factoringFunctionValueDiscontinuity()
  } else if (rand <= 3) {
    return trigFunctionValueDiscontinuity()
  } else {
    return limitDiscontinuity()
  }
}

export default generateRandomQuestion