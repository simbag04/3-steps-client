import React from "react"
import Latex from "../../../components/latex/Latex"
import { PiecewiseFunction } from "../../../types/PiecewiseFunction"
import { Piecewise } from "../../../components/latex/Piecewise"

const Section1 = <>
  <div>
    Now that we know how to determine whether a function is continuous at a point, we can discuss continuity over an interval.
  </div>
  <div>
    In order for a function to be continuous on an interval <Latex expression="(a, b)" />, it must be continuous at every point <Latex expression="x" /> on <Latex expression="a < x < b" display={true} />
  </div>
</>

const Section2 = <>
  <div>
    Obviously, we can't check every single value inside an interval. However, we can use the fact that polynomial, rational, power, exponential, logarithmic, and trigonometric functions are continuous on all points over their domains.
  </div>

</>

const Section3 = <>
  <div>
    In other words, in order to find the intervals on which these types of functions are continuous, we just need to find the function's domain.
  </div>
  <div className="flex vertical center">
    There's 3 main types of functions that have restricted domains:
    <ul className="start">
      <li>
        Rational functions
      </li>
      <li>
        Logarithmic functions
      </li>
      <li>
        Square root functions
      </li>
    </ul>
  </div>
</>

const Section4 = <>
  <div>
    Let's start with rational functions. Consider:
  </div>
  <div>
    <Latex expression={`f(x) = \\frac{x}{x - 3}`} display={true} />
  </div>
  <div>
    The only constraint in this function is that the denominator cannot be 0. Thus, we know <Latex expression={`x \\neq 3`} />. However, all other numbers are allowed, so our domain becomes <Latex expression={`(-\\infty, 3) \\cup (3, \\infty)`} />.
  </div>
  <div>
    This means that <Latex expression="f(x)" /> is continuous on <Latex expression={`(-\\infty, 3) \\cup (3, \\infty)`} />.
  </div>
</>

const Section5 = <>
  <div>
    Next, let's look at logarithmic functions: consider <Latex expression={`g(x) = \\ln{(x - 4)}`} />.
  </div>
  <div>
    For logarithmic functions, the main constraint is that we can only take logs of positive numbers.
  </div>
  <div>
    This gives us <Latex expression={`x - 4 > 0`} />.
    Solving this, we get <Latex expression="x > 4" />.
  </div>
  <div>
    Thus, <Latex expression="g(x)" /> is continuous on <Latex expression={`(4, \\infty)`} />.
  </div>
</>

const Section6 = <>
  <div>
    Lastly, for square root functions, consider: <Latex expression={`h(x) = \\sqrt{2x^2 + 12x + 10}`} />.
  </div>
  <div>
    For this one, we cannot take the square root of negative numbers. Therefore, we need to make sure
  </div>
  <div>
    <Latex expression={`2x^2 + 12x + 10 \\geq 0`} />. We can find the roots by completing the square, and from there we can find the domain:
    <Latex expression={`2x^2 + 12x + 10 \\geq 0`} display={true} />
    <Latex expression={`2(x^2 + 6x + 9) - 8 \\geq 0`} display={true} />
    <Latex expression={`2(x + 3)^2 - 8 \\geq 0`} display={true} />
  </div>
  <div>
    Solving for the roots, we get: <Latex expression="x = -5" /> and <Latex expression="x = -1" />.
  </div>
  <div>

  </div>
</>

const Section7 = <>
  <div>
    We know the parabola is right side up because of the <strong>positive</strong> <Latex expression="x^2" /> coefficient, so this quadratic function is <Latex expression={`\\geq 0`} /> on <Latex expression={`(-\\infty, -5] \\cup [-1, \\infty)`} />.
  </div>
  <div>
    Thus, <Latex expression="h(x)" /> is continuous on <Latex expression={`(-\\infty, -5] \\cup [-1, \\infty)`} />.
  </div>
  <div>
    In the above case, there was a <strong>positive</strong> <Latex expression="x^2" /> coefficient, so the domain was to the left and right of the roots. If the coefficient had been <strong>negative</strong>, meaning the parabola would be facing down, it would be above 0 <strong>between</strong> the roots. This is a very easy way to find where quadratic functions are above 0!
  </div>
</>

const Section8 = <>
  <div>
    Earlier, we discussed continuity on the open interval <Latex expression="(a, b)" />. However, what if we want to talk about the closed interval <Latex expression="[a, b]" />?
  </div>
</>

const Section9 = <>
  <div>
    In order for <Latex expression="f(x)" /> to be continuous on <Latex expression="[a, b]" />, 2 conditions must be satisfied:
    <div className="flex vertical center">
      <ul className="text-start">
        <li>
          <Latex expression="f(x)" /> is continuous on <Latex expression="(a, b)" />
        </li>
        <li>
          <Latex classes="bold" expression={`\\lim_{x \\to a^{\\footnotesize\\texttt{+}}} = f(a)`} /> and <Latex classes="bold" expression={`\\lim_{x \\to b^{\\footnotesize\\texttt{-}}} = f(b)`} />
        </li>
      </ul>
    </div>
  </div>
</>

const Section10 = <>
  <div>
    Basically, when considering a closed interval <Latex expression="[a, b]" />, in order to include <Latex expression="a" /> in the interval we only care about the right-sided limit - the left-sided limit does not matter.
  </div>
  <div>
    Similarly, to include <Latex expression="b" /> in the interval, we only need to worry about the left-sided limit.
  </div>
</>

const piecewise: PiecewiseFunction[] = [{ f: `\\frac{8x}{x - 3}`, domain: `x \\leq -1` }, { f: `\\sqrt{-2x + 2}`, domain: `-1 < x < 1` }, { f: `\\ln(x + 1)`, domain: `x \\geq 1` }]

const Section11 = <>
  <div>
    Let's look at a comprehensive example:
  </div>
  <div>
    <Piecewise title="f(x)" functions={piecewise} display={true} />
  </div>
  <div>
    Is <Latex expression="f(x)" /> continuous on <Latex expression="[-2, 1]" />?
  </div>
</>

const Section12 = <>
  <div>
    First, we need to check that <Latex expression="f(x)" /> is continuous on <Latex expression="(-2, 1)" />.
  </div>
  <div>
    Since there is a change in functions at <Latex expression="x = -1" />, we should analyze <Latex expression="(-2, -1)" />, <Latex expression="x = -1" />, and <Latex expression="(-1, 1)" /> separately.
  </div>
</>

const Section13 = <>
  <div>
    For <Latex expression="(-2, -1)" />, we need to look at the first function: <Latex expression={`\\frac{8x}{x - 3}`} />. Using the domain of this function, we know that it is continuous on <Latex expression={`(-\\infty, 3) \\cup (3, \\infty)`} />.
  </div>
  <div>
    Since <Latex expression="(-2, -1)" /> is contained in this interval, we know that <Latex expression="f(x)" /> is continuous on <Latex expression="(-2, -1)" />.
  </div>
</>

const Section14 = <>
  <div>
    Similarly analyzing <Latex expression="(-1, 1)" />, we can look at <Latex expression={`\\sqrt{-2x + 2}`} />, which is continuous on <Latex expression={`(-\\infty, 1]`} />. Once again, this means that <Latex expression="f(x)" /> is continuous on <Latex expression="(-1, 1)" />.
  </div>
</>


const Section15 = <>
  <div>
    We also need to check <Latex expression="x = -1" />. To do this, we can use what we learned in the last section:
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to -1^{\\footnotesize\\texttt{-}}} f(x) = \\lim_{x \\to -1} \\frac{8x}{x - 3} = \\frac{-8}{-4} = 2`} display={true} />
    <Latex expression={`\\lim_{x \\to -1^{\\footnotesize\\texttt{+}}} f(x) = \\lim_{x \\to -1} \\sqrt{-2x + 2} = \\sqrt{4} = 2`} display={true} />
    <Latex expression={`f(-1) = \\frac{-8}{-4} = 2`} display={true} />
  </div>
  <div>
    Since <Latex expression={`\\lim_{x \\to -1^{\\footnotesize\\texttt{-}}} f(x) = \\lim_{x \\to -1^{\\footnotesize\\texttt{+}}} f(x)`} />, <Latex expression={`\\lim_{x \\to -1} f(x)`} /> exists, and <Latex expression={`\\lim_{x \\to -1} f(x) = 2 = f(-1)`} />.
  </div>
  <div>
    Thus, <Latex expression="f(x)" /> is continuous at <Latex expression="x = -1" /> as well.
  </div>
</>

const Section16 = <>
  <div>
    So far, we have established that <Latex expression="f(x)" /> is continuous on <Latex expression="(-2, -1)" />, at <Latex expression="x = -1" />, and <Latex expression="(-1, 1)" />. In other words, <Latex expression="f(x)" /> is continuous on <Latex expression="(-2, 1)" />.
  </div>
  <div>
    The last thing to check is the endpoints: <Latex expression={`\\lim_{x \\to -2^{\\footnotesize\\texttt{+}}} f(x) = f(-2)`} /> and <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} f(x) = f(1)`} />.
  </div>
</>

const Section17 = <>
  <div>
    Evaluating the first endpoint of <Latex expression="x = -2" />:
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to -2^{\\footnotesize\\texttt{+}}} f(x) = \\frac{8(-2)}{-2 - 3} = \\frac{16}{5}`} display={true} />
    <Latex expression={`f(-2) = \\frac{8(-2)}{-2 - 3} = \\frac{16}{5}`} display={true} />
  </div>
  <div>
    Thus, since <Latex expression={`\\lim_{x \\to -2^{\\footnotesize\\texttt{+}}} f(x) = f(-2)`} />, <Latex expression="-2" /> is included in the interval.
  </div>
  <div>
    For the second endpoint of <Latex expression="x = 1" />:
  </div>
  <div>
    <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} f(x) = \\sqrt{-2(1) + 2} = 0`} display={true} />
    <Latex expression={`f(1) = \\ln{(1 + 1)} = \\ln{2}`} display={true} />
  </div>
  <div>
    Thus, since <Latex expression={`\\lim_{x \\to 1^{\\footnotesize\\texttt{-}}} f(x) \\neq f(1)`} />, <Latex expression="1" /> is <strong>not</strong> included in the interval.
  </div>
</>

const Section18 = <>
  <div>
    All in all, <Latex expression="f(x)" /> is continuous on <Latex expression="[-2, 1)" />, not <Latex expression="[-2, 1]" />. Keep in mind how we only had to check the limits from one side to determine if <Latex expression="-2" /> or <Latex expression="1" /> would be included in the interval, but we had to check both sides for <Latex expression="x = -1" />!
  </div>
</>


export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13, Section14, Section15, Section16, Section17, Section18 }