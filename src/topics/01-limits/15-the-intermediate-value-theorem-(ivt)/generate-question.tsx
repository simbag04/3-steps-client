import { formatPolynomialToLatex, getRandomNumber, getRandomWithExclusions, shuffleArray } from "../../../helpers/functions"
import { getPolynomialFunctionWithPoint } from "../../../helpers/expression-generators"
import { Option } from "../../../types/Option"
import Latex from "../../../components/latex/Latex"
import React from "react"
import { PiecewiseFunction } from "../../../types/PiecewiseFunction"
import { Piecewise } from "../../../components/latex/Piecewise"
import * as math from "mathjs"

const applyIVT = () => {
  const x1 = getRandomNumber(-8, 3)
  const x2 = getRandomNumber(x1 + 1, 8)
  const y1 = getRandomNumber(-7, 7)
  const y2 = getRandomWithExclusions(-7, 7, [y1 - 1, y1, y1 + 1])

  const withinYVal = getRandomNumber(Math.min(y1, y2) + 1, Math.max(y1, y2) - 1)
  const outsideYVal = Boolean(getRandomNumber(0, 1)) ?
    getRandomNumber(-10, Math.min(y1, y2) - 1) :
    getRandomNumber(Math.max(y1, y2) + 1, 10)

  const options: Option[] = [
    {
      component: <>
        <Latex expression={`f(c) = ${withinYVal}`} /> for at least one <Latex expression="c" /> in <Latex expression={`[${x1}, ${x2}]`} />.
      </>,
      correct: true
    },
    {
      component: <>
        <Latex expression={`f(c) = ${withinYVal}`} /> for at least one <Latex expression="c" /> in <Latex expression={`[${Math.min(y1, y2)}, ${Math.max(y1, y2)}]`} />.
      </>,
      correct: false
    },
    {
      component: <>
        <Latex expression={`f(c) = ${outsideYVal}`} /> for at least one <Latex expression="c" /> in <Latex expression={`[${x1}, ${x2}]`} />.
      </>,
      correct: false
    },
    {
      component: <>
        <Latex expression={`f(c) = ${outsideYVal}`} /> for at least one <Latex expression="c" /> in <Latex expression={`[${Math.min(y1, y2)}, ${Math.max(y1, y2)}]`} />.
      </>,
      correct: false
    }
  ]

  const title = <></>
  const question = <>
    <div className="flex vertical center medium-gap">
      <div>
        Let <Latex expression="f(x)" /> be a continuous function over all real numbers.
      </div>
      <div>
        Suppose that <Latex expression={`f(${x1}) = ${y1}`} /> and <Latex expression={`f(${x2}) = ${y2}`} />.
      </div>
      <strong>Which of the following is guaranteed by the IVT?</strong>
    </div>
  </>

  const hints = [
    <>
      <div>
        The IVT guarantees that for any <Latex expression="L" /> between <Latex expression="f(a)" /> and <Latex expression="f(b)" />, there exists a number <Latex expression="c" /> in <Latex expression="[a, b]" /> for which <Latex expression="f(c) = L" />.
      </div>
    </>,
    <div>
      Thus, the <Latex expression="c" /> value should be in between the <Latex expression="x" /> values and the <Latex expression="L" /> value should be in between the <Latex expression="y" /> values. 
    </div>,
    <div>
      Match these up in the options to find the correct answer!
    </div>
  ]

  return { type: 'mc', input: shuffleArray(options), title, question, hints }
}

const checkIfIVTApplies = () => {
  const continuityCheck = getRandomNumber(0, 2) // 0: check left, 1: check middle, 2: check right
  const isContinuous = Boolean(getRandomNumber(0, 1)) // whether function will be contiuous
  let x1 = getRandomNumber(-8, 3)
  let x2 = getRandomNumber(x1 + 2, 8)
  const midX = getRandomNumber(x1 + 1, x2 - 1) // find x in the middle to potentially ask about

  // determine ys based on whether function is continuous
  const y1 = getRandomNumber(-7, 7)
  const y2 = isContinuous ? y1 : getRandomWithExclusions(-7, 7, [y1 - 1, y1, y1 + 1])

  // generate functions 
  const xToGenerate = continuityCheck === 0 ? x1 : continuityCheck === 1 ? midX : x2
  const f1 = getPolynomialFunctionWithPoint(getRandomNumber(1, 2), xToGenerate, y1)
  const f2 = getPolynomialFunctionWithPoint(getRandomNumber(1, 2), xToGenerate, y2)

  // get y values at interval endpoints
  let intervalY1 = Math.round(Number(math.evaluate(f1, { x: x1 }).toString()))
  let intervalY2 = Math.round(Number(math.evaluate(f2, { x: x2 }).toString()))

  // ensure that intervalY1 and intervalY2 are far enough apart that there can be a value in between them to ask about
  while (Math.abs(intervalY1 - intervalY2) < 2) {
    if (xToGenerate === x1) {
      x2 = x2 + 1
      intervalY2 = Math.round(Number(math.evaluate(f2, { x: x2 }).toString()))
    } else {
      x1 -= 1
      intervalY1 = Math.round(Number(math.evaluate(f1, { x: x1 }).toString()))
    }
  }

  // get yval within and outside f(x1) and f(x2)
  const withinYVal = getRandomNumber(Math.min(intervalY1, intervalY2) + 1, Math.max(intervalY1, intervalY2) - 1)
  const outsideYVal = Boolean(getRandomNumber(0, 1)) ?
    getRandomNumber(Math.min(intervalY1, intervalY2) - 10, Math.min(intervalY1, intervalY2) - 1) :
    getRandomNumber(Math.max(intervalY1, intervalY2) + 1, Math.max(intervalY1, intervalY2) + 10)

  const yToAsk = Boolean(getRandomNumber(0, 1)) ? withinYVal : outsideYVal // which y to use
  const piecewiseFunctions: PiecewiseFunction[] = [
    {
      f: formatPolynomialToLatex(f1),
      domain: continuityCheck === 0 ? `x \\leq ${xToGenerate}` : `x < ${xToGenerate}`
    },
    {
      f: formatPolynomialToLatex(f2),
      domain: continuityCheck === 2 ? `x \\geq ${xToGenerate}` : `x > ${xToGenerate}`
    }
  ]

  // all other question components
  const title = <></>
  const question = <>
    Consider:
    <Piecewise title="f(x)" functions={piecewiseFunctions} />
    <strong>
      Does the IVT guarantee a <Latex expression="c" /> on <Latex expression={`[${x1}, ${x2}]`} /> such that <Latex expression={`f(c) = ${yToAsk}`} />?
    </strong>
  </>

  const options: Option[] = [
    {
      component: <div>
        Yes, because <Latex expression="f(x)" /> is continuous on <Latex expression={`[${x1}, ${x2}]`} /> and <Latex expression={`${yToAsk}`} /> is in between <Latex expression={`f(${x1})`} /> and <Latex expression={`f(${x2})`} />.
      </div>,
      correct: isContinuous && yToAsk === withinYVal
    },
    {
      component: <div>
        Yes, because <Latex expression="f(x)" /> is continuous on <Latex expression={`[${x1}, ${x2}]`} />.
      </div>,
      correct: false
    },
    {
      component: <div>
        No, because <Latex expression="f(x)" /> is continuous on <Latex expression={`[${x1}, ${x2}]`} />, but <Latex expression={`${yToAsk}`} /> is not in between <Latex expression={`f(${x1})`} /> and <Latex expression={`f(${x2})`} />.
      </div>,
      correct: isContinuous && yToAsk === outsideYVal
    },
    {
      component: <div>
        No, because <Latex expression="f(x)" /> is not continuous on <Latex expression={`[${x1}, ${x2}]`} />, so IVT does not apply.
      </div>,
      correct: !isContinuous
    },
  ]

  const hints = [
    <div className="flex vertical center medium-gap">
      <div>
        In order to apply the IVT, first we need to confirm that <Latex expression="f(x)" /> is continuous over the interval <Latex expression={`[${x1}, ${x2}]`} />.
      </div>
      <Piecewise title="f(x)" functions={piecewiseFunctions} display={true} />
    </div>,
    <div>
      Remember, in order to confirm continuity over this interval, we need to check 3 things:
      <ul className="text-start">
        <li>
          <Latex expression="f(x)" /> is continuous on <Latex expression={`(${x1}, ${x2})`} />
        </li>
        <li>
          <Latex expression={`\\lim_{x \\to ${x1}^{\\footnotesize\\texttt{+}}} = f(${x1})`} />
        </li>
        <li>
          <Latex expression={`\\lim_{x \\to ${x2}^{\\footnotesize\\texttt{-}}} = f(${x2})`} />
        </li>
      </ul>
    </div>,
    <>
      <div>
        If you were not able to verify continuity, then IVT cannot be applied.
      </div>
    </>,
    <>
      <div>
        However, if you were able to verify continuity, you can check the <Latex expression="y" /> values for which IVT applies. Do this by finding <Latex expression={`f(${x1})`} /> and <Latex expression={`f(${x2})`} />.
      </div>
      <div>
        If the <Latex expression="y" /> value is in between these 2 values, we know IVT can be applied. Otherwise, it cannot be.
      </div>
    </>
  ]

  return { title, type: 'mc', question, input: shuffleArray(options), hints }
}

const generateRandomQuestion = () => {
  const rand = getRandomNumber(0, 9)
  if (rand <= 9) {
    return checkIfIVTApplies()
  } else {
    return applyIVT()
  }
}

export default generateRandomQuestion