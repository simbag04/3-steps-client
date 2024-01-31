import React from "react";
import { GraphFunction } from "../../../@types/GraphFunction";
import { GraphPoint } from "../../../@types/GraphPoint";
import * as math from "mathjs"
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph";
import { GRAPH_SIZE } from "../../../helpers/constants";
import Latex from "../../../components/latex/Latex";
import { Piecewise } from "../../../components/latex/Piecewise";
import { PiecewiseFunction } from "../../../@types/PiecewiseFunction";

const f1 = math.parse("x^2")
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

const piecewise1: PiecewiseFunction[] = [
  {
    f: `\\frac{x^2 - 5x - 4}{x - 1}`,
    domain: `x \\neq 1`
  },
  {
    f: `a`,
    domain: `x = 1`
  }
]

const piecewise2: PiecewiseFunction[] = [
  {
    f: `ax^2 - 3`,
    domain: `x < 1`
  },
  {
    f: `x + 2`,
    domain: `x \\geq 1`
  }
]

const Section1 = <>
  <div>
    Recall when we were discussing discontinuities, one type of discontinuity we encountered was a <strong>removable</strong> discontinuity.
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph with Removable Discontinuity </h3>
    <FunctionGraph functions={removableFunctions} size={GRAPH_SIZE} points={removablePoints} ></FunctionGraph>
  </div>
</>

const Section2 = <>
  <div>
    This continuity was removable because if we define <Latex expression="f(2) = 4" />, it will match <Latex expression={`\\lim_{x \\to 2} f(x)`} />, so the function would be continuous again.
  </div>
  <div>
    This type of situation often comes up with making functions with holes continuous. For example, consider:
  </div>
  <div>
    <Latex expression={`f(x) = \\frac{x^2 - 5x - 4}{x - 1}`} display={true} />
  </div>
  <div>
    This function is not defined at <Latex expression="x = 1" /> since the denominator is 0 at this point. We want to find a value for <Latex expression="f(1)" /> that will make <Latex expression="f(x)" /> continuous at this point.
  </div>
</>

const Section3 = <>
  <div>
    In other words, given:
  </div>
  <div>
    <Piecewise title="f(x)" functions={piecewise1} display={true} />
  </div>
  <div>
    What is the value of <Latex expression="a" /> that will make <Latex expression="f(x)" /> continuous at <Latex expression="x = 1" />?
  </div>
</>

const Section4 = <>
  <div>
    To solve this, recall our 2 conditions that make functions continuous at a point:
  </div>
  <div className="flex vertical center">
    <ul className="text-start">
      <li>
        <Latex classes="bold" expression={`\\lim_{x \\to a} f(x)`} /> must <strong>exist</strong>
      </li>
      <li>
        <Latex classes="bold" expression={`\\lim_{x \\to a} f(x) = f(a)`} display={true} />
      </li>
    </ul>
  </div>
</>

const Section5 = <>
  <div>
    We can evaluate <Latex expression={`\\lim_{x \\to 1} f(x)`} /> using the top equation:
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to 1} \\frac{x^2 - 5x - 4}{x - 1} = \\frac{0}{0}`} display={true} />
  </div>
  <div>
    Remember, though, that when we get <Latex expression={`\\frac{0}{0}`} />, we can use other techniques to solve the limit. In this case, we can use factoring:
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to 1} \\frac{x^2 - 5x - 4}{x - 1} = \\lim_{x \\to 1} \\frac{(x - 1)(x - 4)}{x - 1} = \\lim_{x \\to 1} (x - 4) = -3`} display={true} />
  </div>
</>

const Section6 = <>
  <div>
    Thus, the first condition is satisfied because we know <Latex expression={`\\lim_{x \\to 1} f(x)`} /> exists.
  </div>
  <div>
    For the second condition we need <Latex expression={`\\lim_{x \\to 1} f(x) = f(1)`} />.
  </div>
</>

const Section7 = <>
  <div>
    Since <Latex expression="f(1) = a" /> and <Latex expression={`\\lim_{x \\to 1} f(x) = -3`} />, this means we need <Latex classes="bold" expression="a = 3" /> in order for <Latex expression="f(x)" /> to be continuous at <Latex expression="x = 1." />
  </div>
</>

const Section8 = <>
  <div>
    Anytime we want to make a function continuous at a point, we just need to make sure the 2 conditions hold. Let's look at another example:
  </div>
  <div>
    <Piecewise title="g(x)" functions={piecewise2} />
  </div>
  <div>
    For what value of <Latex expression="a" /> will <Latex expression="g(x)" /> be continuous at <Latex expression="x = 1" />?
  </div>
</>

const Section9 = <>
  <div>
    Again, going back to our 2 conditions, we first need <Latex expression={`\\lim_{x \\to 1} g(x)`} /> to exist.
  </div>
  <div>
    In order for <Latex expression={`\\lim_{x \\to 1} g(x)`} /> to exist, we need <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} g(x) = \\lim_{x \\to 1^{\\footnotesize\\texttt{+}}} g(x)`} />.
  </div>
</>

const Section10 = <>
  <div>
    Evaluating these, we get:
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} g(x) = \\lim_{x \\to 1} (ax^2 - 3) = a - 3`} display={true} />
    <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{+}}} g(x) = \\lim_{x \\to 1} (x + 2) = 3`} display={true} />
  </div>
</>

const Section11 = <>
  <div>
    In order for the limit to exist, both of these must equal each other. Thus, <Latex expression="a - 3 = 3" display={true} />
    <Latex classes="bold" expression="a = 6" />
  </div>
  <div>
    When <Latex expression="a = 6" />, <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} g(x) = \\lim_{x \\to 1^{\\footnotesize\\texttt{+}}} g(x) = 3`} />.
  </div>
</>

const Section12 = <>
  <div>
    Now that the first condition is verified, we can also check the  second condition.
  </div>
  <div>
    We know <Latex expression="g(1) = 1 + 2 = 3" />. Since <Latex expression={`\\lim_{x \\to 1} g(x) = g(1) = 3`} />, we know that the function is continuous at <Latex expression="x = 1" /> when <Latex classes="bold" expression="a = 6" />!
  </div>
</>

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12 }