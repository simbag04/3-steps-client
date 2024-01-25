import * as math from "mathjs"
import React from "react"
import AsymptoticGraph from "../../../components/content-components/graphs/AsymptoticGraph"
import { GRAPH_SIZE } from "../../../helpers/constants"
import Latex from "../../../components/latex/Latex"

const n1 = math.parse("-1/(x - 1) + 1")
const n2 = math.parse("1/(x - 1) + 1")

const asymptoticFunctions = [
  {
    f: x => n1.evaluate({ x }),
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
    f: x => n2.evaluate({ x }),
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

const asymptoticFunctions2 = [
  {
    f: x => n1.evaluate({ x }),
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
    f: x => n1.evaluate({ x }),
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

const Section1 = <>
  <div>
    Recall when we had graphs with asymptotes:
  </div>
  <div>
    <h3>Graph of <Latex expression="g(x)" /></h3>
    <AsymptoticGraph functions={asymptoticFunctions} size={GRAPH_SIZE} x={[1]} y={[1]} />
  </div>
</>

const Section2 = <>
  <div>
    When we were discussing the limit of this graph as <Latex expression={`x \\to 1`} />, recall that we said the limit <strong>does not exist</strong>, because it seems to be approaching infinity.
  </div>
  <div>
    From now on, instead of saying does not exist, we will say the limit is infinity. Basically, for the above graph, we can say that <Latex expression={`\\lim_{x \\to 1} g(x) = \\infty`} />.
  </div>
</>

const Section3 = <>
  <div>
    There can also be an asymptotic graph like this:
  </div>
  <div>
    <h3>Graph of <Latex expression="h(x)" /></h3>
    <AsymptoticGraph functions={asymptoticFunctions2} size={GRAPH_SIZE} x={[1]} y={[1]} />
  </div>
</>

const Section4 = <>
  <div>
    In this case, we can see that the limits from both sides are different. In particular, from the left side, the graph is approaching <Latex expression={`+\\infty`} />, and from the right side, the graph is approaching <Latex expression={`-\\infty`} />.
  </div>
  <div>
    Thus, we can say <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} h(x) = \\infty`} /> and <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{+}}} h(x) = -\\infty`} />.  
  </div>
</>

const Section5 = <>
  <div>
    In this case, we can't say anything about <Latex expression={`\\lim_{x \\to 1} h(x)`} /> as the left and right sided limits are different.
  </div>
</>

const Section6 = <>
  <div>
    It is easy to see infinite limits with a graph, but how would we know the limit if we were only given an equation of a function?
  </div>
  <div>
    For example, consider <Latex expression={`f(x) = \\frac{x + 3}{x^2 - 5x + 4}`} />. How can we find <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} f(x)`} /> and <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{+}}} f(x)`} />?
  </div>
  <div>
    Plugging in <Latex expression="x = 1" /> into this equation doesn't really help as it makes the denominator 0, and we don't know if the limit would be positive or negative <Latex expression={`\\infty`} />.
  </div>
</>

const Section7 = <>
  <div>
    The first step to solve this is factor the bottom, so we have:
    <Latex expression={`f(x) = \\frac{x + 3}{x^2 - 5x + 4} = \\frac{x + 3}{(x - 1)(x - 4)}`} display={true} />
  </div>
  <div>
    Now, when we say "<Latex expression="x" /> is approaching <Latex expression="1" /> from the left," we mean that <Latex expression="x" /> is getting extremely close to <Latex expression="1" /> from the left. We can use a number like <Latex expression="x = 0.999" /> to represent this.
  </div>
</>

const Section8 = <>
  <div>
    Since <Latex expression="x = 1" /> is an asymptote of this function, we know the answer is going to be <Latex expression={`\\infty`} /> or <Latex expression={`-\\infty`} />. Thus, we don't really need to plug in <Latex expression="x = 0.999" /> and get an exact number - we just need the <strong>sign</strong> of <Latex expression="f(0.999)" />.
  </div>
  <div>
    Plugging in <Latex expression="x = 0.999" />, we get <Latex expression={`f(0.999) = \\frac{0.999 + 3}{(0.999 - 1)(0.999 - 4)}`} display={true} />
  </div>
</>

const Section9 = <>
  <div>
    Here, we see that the top is a positive number. On the bottom, <Latex expression="(0.999 - 1)" /> will give us a negative number. <Latex expression="(0.999 - 4)" /> will also give us a negative number.
  </div>
  <div>
    Thus, on the bottom, we are multiplying two negative numbers together, which gives us a <strong>positive</strong> value.
  </div>
  <div>
    Since we have a <strong>positive</strong> number on the top and we are dividing by a <strong>positive</strong> number, we know that the answer will be <Latex expression={`+\\infty`} />. Thus, <Latex classes="bold" expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} f(x) = \\infty`} />.
  </div>
</>

const Section10 = <>
  <div>
    We can use very similar reasoning for the right sided limit. First, we need a number on the right side of <Latex expression="x = 1" /> that is very close to <Latex expression="x = 1" />. We can use <Latex expression="x = 1.001" />.
  </div>
  <div>
    Plugging this into our factored form, we get:
    <Latex expression={`f(1.001) = \\frac{1.001 + 3}{(1.001 - 1)(1.001 - 4)}`} display={true} />
  </div>
</>

const Section11 = <>
  <div>
    Analyzing this, on the bottom we know that <Latex expression="(1.001 - 1)" /> is positive, but <Latex expression="(1.001 - 4)" /> is negative. Thus, since we multiply a positive and negative number together, our denominator is <strong>negative</strong>.
  </div>
</>

const Section12 = <>
  <div>
    The numerator is <strong>positive</strong>, so we are dividing a positive number by a negative number. Thus, we know the answer will be <strong>negative</strong>, so we have <Latex classes="bold" expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{+}}} f(x) = -\\infty`} />.
  </div>
  <div>
    This type of sign analysis is extremely convenient for finding limits at vertical asymptotes, and will be very useful later on in Calculus as well!
  </div>
</>

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12 }