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
  const topLC = getRandomNumber(1, 5)
  const bottomLC = getRandomNumber(1, 5)

  // get expressions for numerator and denominator
  const numerator = getFunction(numDegree, topLC, topSqrt)
  const denominator = getFunction(denDegree, bottomLC, bottomSqrt)

  const approaches = Boolean(getRandomNumber(0, 1)) // false: approaches inf, true: approaches -inf
  const func = `\\lim_{x \\to ${approaches ? `-` : ``}\\infty} \\frac{${numerator}}{${denominator}}`

  let ans: string
  if (numDegree < denDegree) {
    ans = "0"
  } else {
    ans = numDegree === denDegree ? math.simplify(`${topLC}/${bottomLC}`).toString() : `\\infty`
    const topSign = topSqrt || numDegree % 2 === 0 || !approaches
    const bottomSign = bottomSqrt || denDegree % 2 === 0 || !approaches
    if ((topSign && !bottomSign) || (bottomSign && !topSign)) {
      ans = `-${ans}`
    }
  }

  const title = <></>
  const question = <div className="flex vertical center medium-gap">
    <h3>Evaluate the limit.</h3>
    <Latex expression={`${func} = `} display={true} />
  </div>

  const hints = [
    <div className="flex vertical center medium-gap">
      We are trying to evaluate <Latex expression={`${func}`} display={true} />
    </div>
  ]

  if (topSqrt || bottomSqrt) {
    hints.push(<div className="flex vertical center medium-gap">
      <div>
        We can see there are roots in this function. Remember, to simplify these, we want to focus on the highest degree term and take the root of that.
      </div>
      <div>
        Keep in mind, though, that when we take the root, we want to surround the result with an absolute value so we remember it is positive!
      </div>
    </div>)
  }

  hints.push(
    <div className="flex vertical center medium-gap">
      <div>
        {topSqrt || bottomSqrt ? "Once you've done that, the next step is to " : "In order to solve this, we "}just need to find the horizontal asymptotes. Remember our 3 rules for that:
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
    </div>)

  hints.push(<div className="flex vertical center medium-gap">
    <div>
      Looking at the degrees of the top and bottom of this function, is there a horizontal asymptote? If yes, then that is your answer!
    </div>
    <div>
      If not, however, remember you can focus on the highest degree terms again. After doing that, try simpliying the remaining equation, and from there plugging in <Latex expression={`x = ${approaches ? `-` : ``}\\infty`} /> to find the result. Remember to keep the signs of the values in mind!
    </div>
  </div>)

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