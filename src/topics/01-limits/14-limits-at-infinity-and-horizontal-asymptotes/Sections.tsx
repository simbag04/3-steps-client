import React from "react";
import Latex from "../../../components/latex/Latex";
import * as math from "mathjs"
import AsymptoticGraph from "../../../components/content-components/graphs/AsymptoticGraph"
import { GRAPH_SIZE } from "../../../helpers/constants";

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

const Section1 = <>
  <div>
    In addition to discussing limits at a point, we also want to discuss the behavior of graphs as <Latex expression={`x`} /> approaches <Latex expression={`\\infty`} /> and <Latex expression={`-\\infty`} />.
  </div>
  <div>
    Let's start by looking at a graph to understand how we can do this:
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression="f(x)" /></h3>
    <AsymptoticGraph functions={asymptoticFunctions} size={GRAPH_SIZE} x={[1]} y={[1]} />
  </div>
</>

const Section2 = <>
  <div>
    In this graph, it is clear that as <Latex expression="x" /> approaches <Latex expression={`\\infty`} />, the graph seems to be approaching <Latex expression="1" />. Similarly, as <Latex expression="x" /> approaches <Latex expression={`-\\infty`} />, the graph also seems to be approaching <Latex expression="1" />.
  </div>
  <div>
    Thus, <Latex classes="bold" expression={`\\lim_{x \\to \\infty} f(x) = 1`} /> and <Latex classes="bold" expression={`\\lim_{x \\to -\\infty} f(x) = 1`} />.
  </div>
  <div>
    Notice that <Latex expression="y = 1" /> is also a horizontal asymptote of this graph.
  </div>
  <div>
    In fact, this is always the case - if we find the horizontal asymptote of a function (if it exists), then we have found its limit as <Latex expression="x" /> approaches <Latex expression={`\\infty`} /> and <Latex expression={`-\\infty`} />.
  </div>
</>

const Section3 = <>
  <div>
    This is useful when we are only given a function expression, because we can easily find the horizontal asymptotes with 3 rules:
  </div>
  <div>
    For each of these rules, let <Latex expression="n" /> be the highest degree of the numerator, and <Latex expression="d" /> be the highest degree of the denominator.
  </div>
  <div className="flex vertical center">
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
  </div>
</>

const Section4 = <>
  <div>
    Let's look at some examples - let's start with:
  </div>
  <div>
    <Latex expression={`f(x) = \\frac{x}{x^2 + 1}`} display={true} />
  </div>
  <div>
    In this case, the degree of the numerator is <Latex classes="bold" expression="1" /> and the degree of the denominator is <Latex classes="bold" expression="2" />. Since the degree of the top is less than the bottom, the horizontal asymptote is <Latex classes="bold" expression="0" />.
  </div>
  <div>
    Thus, <Latex expression={`\\lim_{x \\to \\infty} f(x) = 0`} /> and <Latex expression={`\\lim_{x \\to -\\infty} f(x) = 0`} />.
  </div>
</>

const Section5 = <>
  <div>
    Antoher example we can look at is:
  </div>
  <div>
    <Latex expression={`g(x) = \\frac{2x^3 + x - 1}{x^3 - x}`} display={true} />
  </div>
  <div>
    In this case, the degrees of both the top and bottom are <Latex classes="bold" expression="3" />, so we need to find the ratio of the leading coefficients.
  </div>
  <div>
    The leading coefficients are <Latex classes="bold" expression="2" /> on the top and <Latex classes="bold" expression="1" /> on the bottom, so the horizontal asymptote is <Latex expression={`\\frac{2}{1} = 2`} />.
  </div>
  <div>
    Thus, <Latex classes="bold" expression={`\\lim_{x \\to \\infty} g(x) = 2`} /> and <Latex classes="bold" expression={`\\lim_{x \\to -\\infty} g(x) = 2`} />.
  </div>
</>

const Section6 = <>
  <div>
    Lastly, let's look at:
  </div>
  <div>
    <Latex expression={`h(x) = \\frac{x^2 + 3}{x + 1}`} display={true} />
  </div>
  <div>
    In this case the degree of the numerator is <Latex classes="bold" expression="2" />, and the degree of the denominator is <Latex classes="bold" expression="1" />. Since the degree of the top is greater than the degree of the bottom, there is no horizontal asymptote!
  </div>
</>

const Section7 = <>
  <div>
    However, we can still find <Latex expression={`\\lim_{x \\to \\infty} h(x)`} /> and <Latex expression={`\\lim_{x \\to -\\infty} h(x)`} />.
  </div>
  <div>
    The idea is to focus on the highest degree terms - we can ignore the remaining terms as when <Latex expression="x" /> is approaching <Latex expression={`\\infty`} /> or <Latex expression={`-\\infty`} />, those terms will not matter in front of the higher degree terms.
  </div>
</>

const Section8 = <>
  <div>
    Only looking at the higher degree terms, we see:
  </div>
  <div>
    <Latex expression={`h(x) = \\frac{x^2 + 3}{x + 1} \\approx \\frac{x^2}{x} = x`} display={true} />
  </div>
  <div>
    Now, we can directly evaluate:
  </div>
  <div>
    <Latex classes="bold" expression={`\\lim_{x \\to \\infty} h(x) = \\lim_{x \\to \\infty} x = \\infty`} display={true} />
    <Latex classes="bold" expression={`\\lim_{x \\to -\\infty} h(x) = \\lim_{x \\to -\\infty} x = -\\infty`} display={true} />
  </div>
</>

const Section9 = <>
  <div>
    These are the basic rules to use when evaluating limits at <Latex expression={`\\infty`} /> or <Latex expression={`-\\infty`} /> - however, it can get a little more complicated: consider
  </div>
  <div>
    <Latex expression={`f(x) = \\frac{\\sqrt{x^2 + 3}}{x}`} display={true} />
  </div>
  <div>
    In this case, we have a square root function to deal with.
  </div>
  <div>
    However, just like in the previous example, we can focus on the highest degree terms:
  </div>
  <div>
    <Latex expression={`f(x) = \\frac{\\sqrt{x^2 + 3}}{x} \\approx \\frac{\\sqrt{x^2}}{x}`} display={true} />
  </div>
</>

const Section10 = <>
  <div>
    Now, we can simplify the root. The only thing to keep in mind is that the square root function is always <strong>positive</strong>, so instead of just simplifying it to <Latex expression="x" />, we should simplify it to <Latex expression="|x|" />. Thus,
  </div>
  <div>
    <Latex expression={`f(x) \\approx \\frac{\\sqrt{x^2}}{x} = \\frac{|x|}{x}`} display={true} />
  </div>

</>

const Section11 = <>
  <div>
    And now, we can take the limits:
  </div>
  <div>
    <Latex classes="bold" expression={`\\lim_{x \\to \\infty} \\frac{|x|}{x} = \\frac{+\\infty}{+\\infty} = 1`} display={true} />
    <Latex classes="bold" expression={`\\lim_{x \\to -\\infty} \\frac{|x|}{x} = \\frac{+\\infty}{-\\infty} = -1`} display={true} />
  </div>
  <div>
    Notice how in this case, because of the absolute value, we couldn't directly divide the <Latex expression={`\\frac{x}{x}`} /> to get 1 - we had to account for the <strong>signs</strong>.
  </div>
</>

const Section12 = <>
  <div>
    Let's look at one last example:
  </div>
  <div>
    <Latex expression={`g(x) = \\frac{\\sqrt{4x^4 + 3}}{3x^2 + 5}`} display={true} />
  </div>
  <div>
    Again, focusing on the higher degree terms, we get:
  </div>
  <div>
    <Latex expression={`g(x) = \\frac{\\sqrt{4x^4 + 3}}{3x^2 + 5} \\approx \\frac{\\sqrt{4x^4}}{3x^2} = \\frac{|2x^2|}{3x^2}`} display={true} />
  </div>
</>

const Section13 = <>
  <div>
    In this case, we have <Latex expression="x^2" /> on top, and that is always positive. That's why we can drop the absolute value on top:
  </div>
  <div>
    <Latex expression={`g(x) \\approx \\frac{|2x^2|}{3x^2} = \\frac{2x^2}{3x^2}`} display={true} />
  </div>
  <div>
    Now, using our horizontal asymptotes technique, the top and bottom have the same degree. Thus, the asymptote is just the ratio of the leading coefficients: <Latex expression={`\\frac{2}{3}`} />.
  </div>
  <div>
    Thus, we have:
  </div>
  <div>
    <Latex classes="bold" expression={`\\lim_{x \\to \\infty} g(x) = \\frac{2}{3}`} display={true} />
    <Latex classes="bold" expression={`\\lim_{x \\to -\\infty} g(x) = \\frac{2}{3}`} display={true} />
  </div>
</>

const Section14 = <>
  <div>
    The key idea with these problems is always to focus on the highest degree terms, and try to find the horizontal asymptotes of the functions. In case of square roots, remember to add an absolute value to the simplified expression, so you know it is always positive!
  </div>
</>

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13, Section14 }