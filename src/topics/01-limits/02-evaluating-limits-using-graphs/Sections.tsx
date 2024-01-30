import Latex from "../../../components/latex/Latex"
import JumpGraph from "../../../components/content-components/graphs/JumpGraph"
import * as math from 'mathjs'
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph"
import AsymptoticGraph from "../../../components/content-components/graphs/AsymptoticGraph"
import { GRAPH_SIZE } from "../../../helpers/constants"
import React from "react"

// functions to be used in sections
const n1 = math.parse("-x")
const n2 = math.parse("0.5x + 4")
const functions = [
  {
    f: x => n1.evaluate({ x }),
    min: -11,
    max: -2,
    includeLeft: true,
    includeRight: false,
    leftArrow: true,
    rightArrow: false,
    classes: 'c4',
    leftCircle: false,
    rightCircle: true
  },
  {
    f: x => n2.evaluate({ x }),
    min: -2,
    max: 11,
    includeLeft: true,
    includeRight: true,
    leftArrow: false,
    rightArrow: true,
    classes: 'c4',
    leftCircle: true,
    rightCircle: false
  },
]

const n3 = math.parse("-1/(x - 1) + 1")
const n4 = math.parse("1/(x - 1) + 1")

const asymptoticFunctions = [
  {
    f: x => n3.evaluate({ x }),
    min: -11,
    max: 1,
    includeLeft: true,
    includeRight: false,
    leftArrow: true,
    rightArrow: true,
    classes: 'c4',
    leftCircle: false,
    rightCircle: false,
    type: "asymptotic"
  },
  {
    f: x => n4.evaluate({ x }),
    min: 1,
    max: 11,
    includeLeft: false,
    includeRight: true,
    leftArrow: true,
    rightArrow: true,
    classes: 'c4',
    leftCircle: false,
    rightCircle: false,
    type: "asymptotic"
  }
]

const n5 = math.parse(`sin(1/x)`)
const oscillatingFunctions = [
  {
    f: x => n5.evaluate({ x }),
    min: -11,
    max: 11,
    includeLeft: false,
    includeRight: true,
    leftArrow: true,
    rightArrow: true,
    classes: 'c4',
    leftCircle: false,
    rightCircle: false
  }
]

// sections
const Section1 = () => {
  return (
    <>
      <div>
        Consider a graph <Latex expression={`f(x)`} inline={true} /> that has a jump: What can we say about <Latex expression={`\\ {\\lim}_{x \\to -2} f(x)`} inline={true} />?
      </div>
      <div className="flex vertical center medium-gap">
        <h3>Graph of <Latex expression={`f(x)`} inline={true} /></h3>
        <FunctionGraph functions={functions} size={GRAPH_SIZE} />
      </div>
    </>
  )
}

const Section2 = () => {
  return (
    <div>
      The graph seems to be approaching different values from the left and right! This brings us to the concept of <strong>one-sided limits</strong> (in other words, limits from the left or right).
    </div>
  )
}

const Section3 = () => {
  return (
    <div>
      The notation to write a limit approaching from the <strong>left</strong> is <Latex classes="bold" expression={`{\\lim}_{x \\to a^{\\footnotesize\\texttt{-}}}f(x)`} inline={true} />, with a <strong>minus</strong> sign on the top right of the number.
    </div>
  )
}

const Section4 = () => {
  return (
    <div>
      Similarly, the notation for a limit approaching from the <strong>right</strong> is <Latex classes="bold" expression={`{\\lim}_{x \\to a^{\\footnotesize\\texttt{+}}}f(x)`} inline={true} />, with a <strong>plus</strong> sign instead of a minus sign.
    </div>
  )
}

const Section5 = () => {
  return (
    <>
      <div>
        What is <Latex classes="c2" expression={`{\\lim}_{x \\to -2^{\\footnotesize\\texttt{-}}}f(x)`} inline={true} /> and <Latex classes="c3" expression={`{\\lim}_{x \\to -2^{\\footnotesize\\texttt{+}}}f(x)`} inline={true} />?
      </div>

      <div className="flex vertical center">
        <h3>Graph of <Latex expression={`f(x)`} inline={true} /></h3>
        <JumpGraph functions={functions} size={GRAPH_SIZE} />
      </div>
    </>
  )
}

const Section6 = () => {
  return (
    <div>
      Looking at the graph, <Latex classes="c2" expression={`{\\lim}_{x \\to -2^{\\footnotesize\\texttt{-}}}f(x) = 2`} inline={true} /> and <Latex classes="c3" expression={`{\\lim}_{x \\to -2^{\\footnotesize\\texttt{+}}}f(x) = 3`} inline={true} />.
    </div>
  )
}

const Section7 = () => {
  return (
    <div>
      Since <Latex classes="c2" expression={`{\\lim}_{x \\to -2^{\\footnotesize\\texttt{-}}}f(x)`} inline={true} /> <Latex expression={`\\neq`} inline={true} /> <Latex classes="c3" expression={`{\\lim}_{x \\to -2^{\\footnotesize\\texttt{+}}}f(x)`} inline={true} />, <Latex expression={`{\\lim}_{x \\to -2}f(x)`} inline={true} /> <strong>does not exist</strong>.
    </div>
  )
}

const Section8 = () => {
  return (
    <>
      <div>
        Let's consider another type of graph: one with asymptotes. What can we say about <Latex expression={`\\lim_{x \\to 1}g(x)`} inline={true} />?
      </div>
      <div className="flex vertical center medium-gap">
        <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
        <AsymptoticGraph functions={asymptoticFunctions} size={GRAPH_SIZE} x={[1]} y={[1]} />
      </div>
    </>
  )
}

const Section9 = () => {
  return (
    <div>
      It seems that near <Latex expression={`x = 1`} inline={true} />, the graph is approaching infinity. This is another case where the limit <strong>does not exist</strong>.
    </div>
  )
}

const Section10 = () => {
  return (
    <>
      <div>
        Lastly, let's consider an oscillating graph. What can we say about <Latex expression={`\\lim_{x \\to 0}h(x)`} inline={true} />?
      </div>
      <div className="flex vertical center medium-gap">
        <h3>Graph of <Latex expression={`h(x)`} inline={true} /></h3>
        <FunctionGraph functions={oscillatingFunctions} size={GRAPH_SIZE} />
      </div>
    </>
  )
}

const Section11 = () => {
  return (
    <div>
      The graph's behavior around <Latex expression={`x=0`} inline={true} /> is oscillating so densely that we cannot see what the graph is approaching near that point. Therefore, once again, the limit <strong>does not exist</strong>.
    </div>
  )
}

const Section12 = () => {
  return (
    <>
      <div>
        To summarize, there are 3 cases where a limit does not exist:
      </div>
      <div>
        <ol className="start">
          <li>
            When the limit from the left does not equal the right.
          </li>
          <li>
            When the graph is approaching positive or negative infinity at the point.
          </li>
          <li>
            When the graph is oscillating at the point.
          </li>
        </ol>
      </div>
    </>
  )
}

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12 }