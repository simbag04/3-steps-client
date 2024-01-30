import React from "react"
import { GraphFunction } from "../../../types/GraphFunction"
import * as math from "mathjs"
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph"
import { GRAPH_SIZE } from "../../../helpers/constants"
import Latex from "../../../components/latex/Latex"
import { GraphPoint } from "../../../types/GraphPoint"
import { Piecewise } from "../../../components/latex/Piecewise"

const f1 = math.parse("x^2")
const f2 = math.parse("x")
const jumpFunctions: GraphFunction[] = [
  {
    f: (x: number) => f1.evaluate({ x }),
    min: -11,
    max: 2,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: false,
    classes: "c2",
    leftCircle: false,
    rightCircle: true
  },
  {
    f: (x: number) => f2.evaluate({ x }),
    min: 2,
    max: 11,
    includeLeft: true,
    includeRight: false,
    leftArrow: false,
    rightArrow: true,
    classes: "c2",
    leftCircle: true,
    rightCircle: false
  }
]

const removableFunctions: GraphFunction[] = [
  {
    f: (x: number) => f1.evaluate({ x }),
    min: -11,
    max: 2,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: false,
    classes: "c1",
    leftCircle: false,
    rightCircle: true
  },
  {
    f: (x: number) => f1.evaluate({ x }),
    min: 2,
    max: 11,
    includeLeft: false,
    includeRight: false,
    leftArrow: false,
    rightArrow: true,
    classes: "c1",
    leftCircle: true,
    rightCircle: false
  }
]

const removablePoints: GraphPoint[] = [
  {
    x: 2,
    y: 1,
    classes: "c1"
  }
]

const Section1 = <>
  <div>
    Now that it's clear what makes functions discontinuous, we can dicuss what it means for a function to be continuous.
  </div>
  <div>
    First, recall that graphs with jumps (such as this one) are not continuous.
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression="g(x)" /> </h3>
    <FunctionGraph functions={jumpFunctions} size={GRAPH_SIZE}></FunctionGraph>
  </div>
</>

const Section2 = <>
  <div>
    Specifically, this graph is not continuous at <Latex expression="x = 2" />, because the jump occurs at this point in the graph. How can we formally represent a jump in a graph?
  </div>
</>

const Section3 = <>
  <div>
    A jump occurs when the limit from the left side at a point does not equal the limit from the right side. In the graph above, we can see that <Latex expression={`\\lim_{x \\to 2^{\\footnotesize\\texttt{-}}} g(x) = 4 \\neq \\lim_{x \\to 2^{\\footnotesize\\texttt{+}}} g(x) = 2`} />.
    In order for a graph to be continuous at a point, there cannot be any jumps.
  </div>
</>

const Section4 = <>
  <div>
    This brings us to our 1st condition of continuity: In order for a function <Latex expression="f(x)" /> to be continuous at a point <Latex expression="x = a" />:
    <Latex classes="bold" expression={`\\lim_{x \\to a^{\\footnotesize\\texttt{-}}} f(x) = \\lim_{x \\to a^{\\footnotesize\\texttt{+}}} f(x)`} display={true} />
  </div>
  <div>
    In other words, <Latex classes="bold" expression={`\\lim_{x \\to a} f(x)`} /> must <strong>exist</strong>. Oscillating graphs or graphs with asymptotes at <Latex expression="x = a" /> would not be continuous as their limits don't exist at <Latex expression="x = a" />.
  </div>
  <div>
    Generally for checking continuity, you will be checking that both 1-sided limits exist and are equal.
  </div>
</>

const Section5 = <>
  <div>
    However, this is not enough: recall that graphs can also have removable discontinuities, like the one here:
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression="h(x)" /></h3>
    <FunctionGraph functions={removableFunctions} size={GRAPH_SIZE} points={removablePoints} ></FunctionGraph>
  </div>
</>

const Section6 = <>
  <div>
    In this case, even though <Latex expression={`\\lim_{x \\to 2^{\\footnotesize\\texttt{-}}} h(x) = \\lim_{x \\to 2^{\\footnotesize\\texttt{+}}} h(x)`} />, <Latex expression={`h(x)`} /> is not continuous at <Latex expression="x = 2" /> because the value of the function <Latex expression="h(2)" /> is not equal to <Latex expression={`\\lim_{x \\to 2} h(x)`} />.
  </div>
</>

const Section7 = <>
  <div>
    This brings us to our 2nd condition of continuity: In order for a function <Latex expression="f(x)" /> to be continuous at a point <Latex expression="x = a" />: <Latex classes="bold" expression={`\\lim_{x \\to a} f(x) = f(a)`} display={true} />
  </div>
  <div>
    This basically means that the value of the function at <Latex expression="x = a" /> must equal the limit of the function at <Latex expression="x = a" />.
  </div>
</>

const Section8 = <>
  <div>
    To summarize, in order for a function <Latex expression="f(x)" /> to be continuous at a point <Latex expression="x = a" />, 2 conditions must be satisfied:
  </div>
  <div>
    <ul className="text-start">
      <li>
        <Latex classes="bold" expression={`\\lim_{x \\to a} f(x)`} /> must <strong>exist</strong>.
      </li>
      <li>
        <Latex classes="bold" expression={`\\lim_{x \\to a} f(x) = f(a)`} display={true} />
      </li>
    </ul>
  </div>
</>
const picewiseFunctions = [{ f: `2x - 1`, domain: `x < 0` }, { f: `x`, domain: `x \\geq 0` }]

const Section9 = <>
  <div>
    Using these definitions, we can analyze the continuity of functions without graphing them. For example, let's look at this piecewise function:
  </div>
  <div>
    <Piecewise title={`f(x)`} functions={picewiseFunctions} display={true} />
  </div>
  <div>
    How can we determine whether <Latex expression="f(x)" /> is continuous at <Latex expression="x = 
    0" />?
  </div>
</>

const Section10 = <>
  <div>
    All we have to do is verify the 2 conditions!
  </div>
  <div>
    Let's start with the 1st condition: <Latex classes="bold" expression={`\\lim_{x \\to 0} f(x)`} /> must <strong>exist</strong>.
  </div>
</>

const Section11 = <>
  <div>
    To evaluate <Latex expression={`\\lim_{x \\to 0} f(x)`} />, we need to evaluate both 1-sided limits first:
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{-}}} f(x) = \\lim_{x \\to 0} (2x - 1) = 2(0) - 1 = -1`} display={true} />
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{+}}} f(x) = \\lim_{x \\to 0} x = 0`} display={true} />
  </div>
</>

const Section12 = <>
  <div>
    Here, we can see that <Latex expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{-}}} f(x) \\neq \\lim_{x \\to 0^{\\footnotesize\\texttt{+}}} f(x)`} display={true} />
  </div>
  <div>
    Thus, <Latex expression={`\\lim_{x \\to 0} f(x)`} /> does not exist. Therefore, the 1st condition of continuity isn't satisfied, so <Latex expression="f(x)" /> is <strong>not</strong> continuous.
  </div>
</>

const picewiseFunctions2 = [{ f: `2x^2 - 4`, domain: `x \\leq 1` }, { f: `3x - 5`, domain: `x > 1` }]
const Section13 = <>
  <div>
    Let's look at another example:
  </div>
  <div>
    <Piecewise title={`g(x)`} functions={picewiseFunctions2} display={true} />
  </div>
</>

const Section14 = <>
  <div>
    Evaluating the 1-sided limits, we see:
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} g(x) = \\lim_{x \\to 1} (2x^2 - 4) = 2(1)^2 - 4 = -2`} display={true} />
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{+}}} g(x) = \\lim_{x \\to 1} (3x - 5) = -2`} display={true} />
  </div>
</>

const Section15 = <>
  <div>
    Here, we can see that <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} g(x) = \\lim_{x \\to 1^{\\footnotesize\\texttt{+}}} g(x)`} />, so <Latex expression={`\\lim_{x \\to 1} g(x) = -2`} /> - it exists! The 1st condition is satisfied.
  </div>
  <div>
    Now, we have to verify the 2nd condition:
    <Latex classes="bold" expression={`\\lim_{x \\to 1} g(x) = g(1)`} display={true} />
  </div>
</>

const Section16 = <>
  <div>
    Previously, we saw that <Latex expression={`\\lim_{x \\to 1} g(x) = -2`} />. To evaluate <Latex expression="g(1)" />, we can do <Latex expression="g(1) = 2(1)^2 - 4 = -2" />.
  </div>
</>

const Section17 = <>
  <div>
    Thus, <Latex expression={`\\lim_{x \\to 1} g(x) = g(1) = -2`} />. The 2nd condition is also satisfied now, so we can conclude that <Latex expression="g(x)" /> is continuous at <Latex expression="x = 1" />!
  </div>
</>

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13, Section14, Section15, Section16, Section17 } 