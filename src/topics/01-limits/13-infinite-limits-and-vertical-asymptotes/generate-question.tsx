import Latex from "../../../components/latex/Latex"
import { getRandomNumber, getRandomWithExclusions, getStringFactorFromXval, sortPolynomialByDegree } from "../../../helpers/functions"
import React from "react"
import * as math from "mathjs"
import { Option } from "../../../@types/Option"
import { LEFT_LIMIT, RIGHT_LIMIT } from "../../../helpers/constants"

const nerdamer = require("nerdamer/all.min")

const asymptoticLimitQuestion = () => {
  const bottomFactors = getRandomNumber(1, 2)
  const topFactors = getRandomNumber(1, 2)
  const bottomXs = []
  const topXs = []
  let denominator = ""
  let numerator = ""

  // get x values for denominator
  for (let i = 0; i < bottomFactors; i++) {
    const num = getRandomNumber(-7, 7)
    bottomXs.push(num)
    denominator += getStringFactorFromXval(num)
  }

  bottomXs.sort((a, b) => a - b);
  const xIndex = getRandomNumber(0, bottomXs.length - 1)
  const x = bottomXs[xIndex] // x to ask about

  // get x values for denominator
  // exclude asymptotic x to ask about so factors can't cancel
  for (let i = 0; i < topFactors; i++) {
    const num = getRandomWithExclusions(-7, 7, [x])
    topXs.push(num)
    numerator += getStringFactorFromXval(num)
  }

  // add coeffs to top and bottom
  const top = Boolean(getRandomNumber(0, 1)) // false: top coeff negative, true: positive
  const bottom = Boolean(getRandomNumber(0, 1)) // false: bottom coeff negative, true: positive
  const topCoeff = top ? getRandomNumber(1, 7) : getRandomNumber(-7, -1)
  const bottomCoeff = bottom ? getRandomNumber(1, 7) : getRandomNumber(-7, -1)
  const factoredTop = `${topCoeff}${numerator}`
  const factoredBottom = `${bottomCoeff}${denominator}`

  // create numerator/denominator
  numerator = sortPolynomialByDegree(nerdamer(`${factoredTop}`).expand())
  denominator = sortPolynomialByDegree(nerdamer(`${factoredBottom}`).expand())

  const expression = `f(x) = \\frac{${numerator}}{${denominator}}`
  const leftLimit = `\\lim_{x \\to ${x}${LEFT_LIMIT}} f(x)`
  const rightLimit = `\\lim_{x \\to ${x}${RIGHT_LIMIT}} f(x)`

  const title = <></>
  const question = <>
    <h3>Which of the following statements is true about <Latex expression="f(x)" />?</h3>
    <Latex expression={expression} display={true} />
  </>

  const leftNum = Number(math.evaluate(numerator, { x: x - 0.1 }).toString())
  const leftDen = Number(math.evaluate(denominator, { x: x - 0.1 }).toString())
  const rightNum = Number(math.evaluate(numerator, { x: x + 0.1 }).toString())
  const rightDen = Number(math.evaluate(denominator, { x: x + 0.1 }).toString())
  const leftAns = leftNum * leftDen
  const rightAns = rightNum * rightDen

  const options: Option[] = [
    {
      component: <>
        <Latex expression={`${leftLimit} = \\infty`} /> and <Latex expression={`${rightLimit} = \\infty`} />
      </>,
      correct: leftAns > 0 && rightAns > 0
    },
    {
      component: <>
        <Latex expression={`${leftLimit} = \\infty`} /> and <Latex expression={`${rightLimit} = -\\infty`} />
      </>,
      correct: leftAns > 0 && rightAns < 0
    },
    {
      component: <>
        <Latex expression={`${leftLimit} = -\\infty`} /> and <Latex expression={`${rightLimit} = \\infty`} />
      </>,
      correct: leftAns < 0 && rightAns > 0
    },
    {
      component: <>
        <Latex expression={`${leftLimit} = -\\infty`} /> and <Latex expression={`${rightLimit} = -\\infty`} />
      </>,
      correct: leftAns < 0 && rightAns < 0
    }
  ]

  const correctAns = options.filter((opt) => opt.correct)
  const hints = [
    <>
      <div>
        Plugging in <Latex expression={`x = ${x}`} />, you should get a denominator of 0, which means there's an asymptote at <Latex expression={`x = ${x}`} />.
      </div>
    </>,
    <>
      <div>
        Since there's an asymptote, the limits must be either <Latex expression={`\\infty`} /> or <Latex expression={`-\\infty`} />.
      </div>
      <div>
        The first step to figuring out whether it's <Latex expression={`\\infty`} /> or <Latex expression={`-\\infty`} /> is to factor <Latex expression="f(x)" />.
      </div>
    </>,
    <>
      <div>
        This should give you:
      </div>
      <Latex expression={`f(x) = \\frac{${factoredTop}}{${factoredBottom}}`} display={true} />
      <div>
        Now, remember that "as <Latex expression="x" /> approaches {x} from the left" is another way of saying <Latex expression="x" /> is extremely close to {x} on the left side. You could use <Latex expression={`${x - 0.1}`} /> to represent this.
      </div>
    </>,
    <>
      <div>
        Using this <Latex expression="x" /> value, plug this into the factored <Latex expression="f(x)" /> equation.
      </div>
      <div>
        This should give you a <strong>{leftNum > 0 ? "positive" : "negative"}</strong> numerator and a <strong>{leftDen > 0 ? "positive" : "negative"}</strong> denominator.
      </div>
    </>,
    <>
      <div>
        This means the left-sided limit must be <strong>{leftAns > 0 ? "positive" : "negative"}</strong>. Thus,
      </div>
      <div>
        <Latex expression={`${leftLimit} = ${leftAns > 0 ? '' : '-'}\\infty`} display={true} />
      </div>
    </>,
    <>
      <div>
        Now, repeat this process with <Latex expression={`${x + 0.1}`} /> for the right-sided limit.
      </div>
    </>,
    <>
      <div>
        You should get a <strong>{rightNum > 0 ? "positive" : "negative"}</strong> numerator and a <strong>{rightDen > 0 ? "positive" : "negative"}</strong> denominator.
      </div>
      <div>
        This means the right-sided limit must be <strong>{rightAns > 0 ? "positive" : "negative"}</strong>. Thus,
      </div>
      <div>
        <Latex expression={`${rightLimit} = ${rightAns > 0 ? '' : '-'}\\infty`} display={true} />
      </div>
    </>,
    <>
      <div>
        Thus, the correct answer is: 
      </div>
      <div className="hint-ans input correct ans">
        {correctAns[0].component}
      </div>
    </>
  ]

  return { type: 'mc', title, question, input: options, hints }
}

const generateRandomQuestion = () => {
  return asymptoticLimitQuestion()
}

export default generateRandomQuestion