import { buildPolynomialFromCoeffs, formatPolynomialToLatex, getCoeffsOfPolynomial, getRandomNumber } from "../../../helpers/functions"
import { getPolynomialFunction } from "../../../helpers/expression-generators"
import React from "react"
import Latex from "../../../components/latex/Latex"
import * as math from "mathjs"

const generateAsymptoticFunction = () => {
  // degree of top and bottom functions
  const numDegree = getRandomNumber(1, 3)
  const denDegree = getRandomNumber(1, 3)

  // whether top/bottom will be sqrt
  const topSqrt = Boolean(getRandomNumber(0, 1))
  const bottomSqrt = Boolean(getRandomNumber(0, 1))

  // leading coefficients of top and bottom
  const topLC = getRandomNumber(2, 5)
  const bottomLC = getRandomNumber(2, 5)

  // get expressions for numerator and denominator
  const numerator = getFunction(numDegree, topLC, topSqrt)
  const withoutSqrtNum = topSqrt ? `|${topLC}x${numDegree > 1 ? `^${numDegree}` : ''}|` : numerator
  const denominator = getFunction(denDegree, bottomLC, bottomSqrt)
  const withoutSqrtDen = bottomSqrt ? `|${bottomLC}x${denDegree > 1 ? `^${denDegree}` : ''}|` : denominator

  const approaches = Boolean(getRandomNumber(0, 1)) // false: approaches inf, true: approaches -inf
  const limitText = `\\lim_{x \\to ${approaches ? `-` : ``}\\infty}`
  const func = `${limitText} \\frac{${numerator}}{${denominator}}`

  let ans: string
  const topSign = topSqrt || numDegree % 2 === 0 || !approaches
  const bottomSign = bottomSqrt || denDegree % 2 === 0 || !approaches
  const overallSign = (topSign && bottomSign) || (!topSign && !bottomSign)
  if (numDegree < denDegree) {
    ans = "0"
  } else {
    ans = numDegree === denDegree ? math.simplify(`${topLC}/${bottomLC}`).toString() : `\\infty`
    if (!overallSign) {
      ans = `-${ans}`
    }
  }

  const title = <></>
  const question = <div className="flex vertical center medium-gap">
    <h3>Evaluate the limit.</h3>
    <Latex expression={`${func} = `} display={true} />
  </div>

  const hints = [
    <>
      <div>
        In order to solve this, we need to find the horizontal asymptotes. Remember our 3 rules for that:
      </div>
      <ul className="text-start">
        <li>
          If <Latex expression="n < d" />, the horizontal asymptote is 0.
        </li>
        <li>
          If <Latex expression="n = d" />, the horizontal asymptote is the ratio of the leading coefficients.
        </li>
        <li>
          If <Latex expression="n > d" />, there is no horizontal asymptote.
        </li>
      </ul>
    </>
  ]

  if (topSqrt || bottomSqrt) {
    hints.push(
      <>
        <div>
          Before we can do that, however, we need to get rid of the square roots. Remember, to simplify these, we want to focus on the highest degree term and take the root of that.
        </div>
        <div>
          We also want to surround the result with an absolute value so we remember it is positive!
        </div>
      </>,
      <>
        <div>
          Simplifying the square roots, you should get:
        </div>
        <div>
          <Latex expression={`${limitText} \\frac{${numerator}}{${denominator}} \\approx ${limitText} \\frac{${withoutSqrtNum}}{${withoutSqrtDen}}`} display={true} />
        </div>
      </>
    )
  }

  if (numDegree < denDegree) {
    hints.push(
      <>
        <div>
          Since <Latex expression="n < d" />, <Latex expression="f(x)" /> has a horizontal asymptote of 0.
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
  } else {
    if (numDegree === denDegree) {
      hints.push(
        <>
          <div>
            In this case, since <Latex expression="n = d" />, the horizontal asymptotes is the ratio of the leading coefficients.
          </div>
        </>
      )
    } else {
      hints.push(
        <>
          <div>
            Since <Latex expression="n > d" />, there is no horizontal asymptote. However, we know the limit must be <Latex expression={`\\infty`} /> or <Latex expression={`-\\infty`} />.
          </div>
        </>
      )
    }

    if (topSqrt || bottomSqrt || numDegree > denDegree) {
      hints.push(
        <>
          {numDegree > denDegree ? null :
            <div>
              Since there are absolute values, make sure you account for the sign of the answer.
            </div>
          }
          <div>
            Plugging in <Latex expression={`x = ${approaches ? '-' : ''}\\infty`} />, you should get a <strong>{topSign ? 'positive' : 'negative'}</strong> numerator and a <strong>{bottomSign ? 'positive' : 'negative'}</strong> denominator. This means the final answer should be <strong>{overallSign ? 'positive' : 'negative'}</strong>.
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
          {ans.includes('infty') ? <Latex expression={ans} /> : ans}
        </div>
      </>
    )
  }

  return { question, ans, type: 'math', title, hints, math_input_buttons: ["infinity"] }
}

/** Helper function to generate function for above problem */
const getFunction = (degree: number, leadingCoeff: number, sqrt: boolean) => {
  let func = getPolynomialFunction(sqrt ? degree * 2 : degree, false, true)
  const coeffs = getCoeffsOfPolynomial(func)
  coeffs[coeffs.length - 1] = sqrt ? leadingCoeff ** 2 : leadingCoeff

  // ensure max of 4 nonzero terms
  // count num nonzeros
  let numNonZeros = coeffs.filter(x => x !== 0).length
  let zeros = numNonZeros - 4
  for (let i = coeffs.length - 2; zeros > 0 && i >= 0; i--) {
    if (coeffs[i] !== 0) {
      coeffs[i] = 0
      zeros--
    }
  }

  func = buildPolynomialFromCoeffs(coeffs)
  func = formatPolynomialToLatex(func)
  return sqrt ? `\\sqrt{${func}}` : func
}

const generateRandomQuestion = () => {
  return generateAsymptoticFunction()
}

export default generateRandomQuestion