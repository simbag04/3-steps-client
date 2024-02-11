import Latex from "../../../components/latex/Latex"
import { getPolynomialFunction } from "../../../helpers/expression-generators"
import { formatPolynomialToLatex, getRandomNumber, getRandomWithExclusions } from "../../../helpers/functions"
import * as math from "mathjs"
import React from "react"

const writeEquation = () => {
  const xVal = getRandomNumber(-5, 5)
  const derivative = getRandomWithExclusions(-5, 5, [0])
  const yVal = getRandomNumber(-5, 5)
  const b = Number(math.simplify(`${yVal} - ${xVal * derivative}`).toString())

  const question = <>
    <h3>
      Suppose that <Latex expression={`g'(${xVal}) = ${derivative}`} /> and <Latex expression={`g(${xVal}) = ${yVal}`} />.
    </h3>
    <h3>
      What is the equation of the line tangent to <Latex expression="g(x)" /> at <Latex expression={`x = ${xVal}`} />?
    </h3>
  </>

  const title = <></>
  const ans = `${derivative === -1 ? `-` : derivative === 1 ? '' : derivative}x${b < 0 ? b : b > 0 ? `+${b}` : ''}`
  const nextToInput = <Latex expression="y=" />
  const hints = [
    <>
      <div>
        The equation of a tangent line looks something like:
      </div>
      <div>
        <Latex expression="y = mx + b" display={true} />
      </div>
      <div>
        Recall that <Latex expression="m" /> represents the slope and <Latex expression="b" /> represents the y-intercept.
      </div>
    </>,
    <>
      <div>
        We are given that <Latex expression={`g'(${xVal}) = ${derivative}`} />, so the derivative of <Latex expression="g(x)" /> at <Latex expression={`x = ${xVal}`} /> is <Latex expression={`${derivative}`} />.
      </div>
      <div>
        Since the derivative is the same thing as slope of a tangent line, we know the slope of the line:
      </div>
      <div>
        <Latex expression={`m = ${derivative}`} display={true} />
      </div>
    </>,
    <>
      <div>
        You were also given that <Latex expression={`g(${xVal}) = ${yVal}`} />. This means that <Latex expression={`(${xVal}, ${yVal})`} /> is a point on the tangent line.
      </div>
      <div>
        We can use this to solve for <Latex expression="b" />:
      </div>
      <div>
        <Latex expression={`${yVal} = (${derivative})(${xVal}) + b`} display={true} />
        <Latex expression={`b = ${b}`} display={true} />
      </div>
    </>,
    <>
      <div>
        Thus, the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        {ans.toString()}
      </div>
    </>
  ]

  return { title, ans, question, nextToInput, hints, type: 'math' }
}

const findAverageRateOfChange = () => {
  const f = getPolynomialFunction(getRandomNumber(1, 3))
  const x1 = getRandomNumber(-3, 3)
  const x2 = getRandomWithExclusions(-3, 3, [x1])
  const xs = [Math.min(x1, x2), Math.max(x1, x2)]

  const y1 = math.evaluate(f, { x: xs[0] })
  const y2 = math.evaluate(f, { x: xs[1] })

  const ans = math.simplify(`(${y2} - ${y1})/(${xs[1]} - ${xs[0]})`).toString()
  const latexF = formatPolynomialToLatex(f)

  const title = <></>
  const question = <>
    <div>
      <h3>Find the average rate of change of the function on the interval:</h3>
    </div>
    <div>
      <Latex expression={`f(x) = ${latexF}`} display={true} />
    </div>
    <div>
      Interval: <Latex expression={`[${xs[0]}, ${xs[1]}]`} />
    </div>
  </>


  const hints = [
    <>
      <div>
        Recall that the <strong>average rate of change</strong> of a function <Latex expression="f(x)" /> on an interval <Latex expression="[a, b]" /> is the slope between the points <Latex expression="(a, f(a))" /> and <Latex expression="(b, f(b))" />.
      </div>
      <div>
        In this case, <Latex expression={`a = ${xs[0]}`} /> and <Latex expression={`b = ${xs[1]}`} />.
      </div>
      <div>
        Start by evaluating <Latex expression={`f(${xs[0]})`} /> and <Latex expression={`f(${xs[1]})`} />.
      </div>
    </>,
    <>
      <div>
        Evaluating, you should find that:
      </div>
      <div>
        <Latex expression={`f(${xs[0]}) = ${latexF.replaceAll(`x`, `(${xs[0]})`)} = ${y1}`} display={true} />
        <Latex expression={`f(${xs[1]}) = ${latexF.replaceAll(`x`, `(${xs[1]})`)} = ${y2}`} display={true} />
      </div>
    </>,
    <>
      <div>
        Thus, your two points are <Latex expression={`(${xs[0]}, ${y1})`} /> and <Latex expression={`(${xs[1]}, ${y2})`} />.
      </div>
      <div>
        Now, use the slope formula to find the slope between these two points.
      </div>
    </>,
    <>
      <div>
        You should get:
      </div>
      <div>
        <Latex expression={`\\frac{y_2 - y_1}{x_2 - x_1} = \\frac{(${y2}) - (${y1})}{(${xs[1]}) - (${xs[0]})} = ${ans}`} display={true} />
      </div>
    </>,
    <>
      <div>
        Thus, the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        {ans.toString()}
      </div>
    </>
  ]

  return { title, question, type: 'math', ans, hints }
}

const generateRandomQuestion = () => {
  const rand = getRandomNumber(1, 10)
  if (rand <= 5) {
    return findAverageRateOfChange()
  } else {
    return writeEquation()
  }
}

export default generateRandomQuestion