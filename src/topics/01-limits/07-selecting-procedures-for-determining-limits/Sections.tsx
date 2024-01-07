import Latex from "../../../components/latex/Latex"
import React from "react"

const Section1 = <>
  <div>
    We've learned a lot of strategies to evaluate limits! Let's look at a summary.
  </div>
</>

const Section2 = <>
  <div>
    We started with evaluating limits using <strong>graphs</strong>.
  </div>
  <div>
    We learned about one-sided limits, and the 3 scenarios where limits don't exist:
  </div>
  <ol className="start">
    <li>
      When the limit from the left does not equal the right
    </li>
    <li>
      When the graph is approaching positive or negative infinity at the point
    </li>
    <li>
      When the graph is oscillating at the point
    </li>
  </ol>
</>

const Section3 = <>
  <div>
    Then, we estimated limits using <strong>tables</strong>.
  </div>
  <div>
    We discussed how to use tables effectively to estimate limits when we are unsure how to evaluate them. We also talked about "zooming in" at the point where we want to find the limit.
  </div>
</>

const Section4 = <>
  <div>
    Next, we evaluated limits with properties of limits, which we eventually found was the same thing as using direct substitution.
  </div>
</>

const Section5 = <>
  <div>
    Now using direct substitution as our primary tool to evaluate limits, we discussed finding limits of piecewise and absolute value functions. 
  </div>
</>

const Section6 = <>
  <div>
    However, sometimes using direct substitution caused us to get <Latex expression={`\\frac{0}{0}`} /> in our limits. To solve these, we had other strategies.
  </div>
</>

const Section7 = <>
  <div>
    The first strategy we used was factoring out a term in both the top/bottom of the fraction and cancelling them, which removed the <Latex expression={'\\frac{0}{0}'} />, and gave us a valid limit.
  </div>
</>

const Section8 = <>
  <div>
    In scenarios with a radical, we used the formula <Latex expression={`(a + b)(a - b) = a^2 - b^2`} /> to remove the radical, which allowed us to simpliy and solve the limit by factoring.
  </div>
</>

const Section9 = <>
  <div>
    Lastly, when given limits with trig functions, we talked about using trig identites to find the factor on the top and bottom that could be cancelled.
  </div>
</>

const Section10 = <>
  <div>
    In the next section, you will get a chance to practice with <em>all</em> of these techniques!
  </div>
</>
export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10 }