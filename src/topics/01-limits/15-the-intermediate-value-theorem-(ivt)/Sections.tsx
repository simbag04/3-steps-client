import React from "react"
import Latex from "../../../components/latex/Latex"
import { GraphFunction } from "../../../@types/GraphFunction"
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph"
import * as math from "mathjs"
import { GRAPH_SIZE } from "../../../helpers/constants"

const f1 = math.parse("x^2")
const functions: GraphFunction[] = [
  {
    f: (x) => f1.evaluate({ x }),
    min: -11,
    max: 11,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: true,
    classes: "c1",
    leftCircle: false,
    rightCircle: false
  }
]

const Section1 = <>
  <div>
    Suppose that we have a graph of <Latex expression="f(x) = x^2" />.
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression="f(x)" /></h3>
    <FunctionGraph functions={functions} size={GRAPH_SIZE} />
  </div>
  <div>
    Here, we can see that <Latex expression="f(0) = 0" /> and <Latex expression="f(3) = 9" />.
  </div>
</>

const Section2 = <>
  <div>
    We can also see from the graph that between <Latex expression="x = 0" /> and <Latex expression="x = 3" />, every single <Latex expression="y" /> from <Latex expression="f(0) = 0" /> to <Latex expression="f(3) = 9" /> is hit.
  </div>
</>

const Section3 = <>
  <div>
    This brings us to the <strong>Intermediate Value Theorem</strong>, which says that:
  </div>
  <div>
    Suppose there is a function <Latex expression="f(x)" /> that is continuous on <Latex expression="[a, b]" />. Then, 2 things are guaranteed:

  </div>
  <div className="flex vertical center">
    <ul className="text-start">
      <li>
        <Latex expression="f(x)" /> will take on every value between <Latex expression="f(a)" /> and <Latex expression="f(b)" /> over the interval.
      </li>
      <li>
        For any <Latex expression="L" /> between <Latex expression="f(a)" /> and <Latex expression="f(b)" />, there exists a number <Latex expression="c" /> in <Latex expression="[a, b]" /> for which <Latex expression="f(c) = L" />.
      </li>
    </ul>
  </div>
</>

const Section4 = <>
  <div>
    In order to better understand this theorem, let's apply it to our graph of <Latex expression="f(x) = x^2" /> on the interval <Latex expression="[0, 3]" />.
  </div>
  <div>
    First, to apply this theorem, we need to confirm that <Latex expression="f(x)" /> is continuous on <Latex expression="[0, 3]" />, which we know it is.
  </div>
</>

const Section5 = <>
  <div>
    The theorem tells us that <Latex expression="f(x)" /> will take on every value between <Latex expression="f(0) = 0" /> and <Latex expression="f(3) = 9" /> over the interval <Latex expression="[0, 3]" />.
  </div>
  <div>
    This basically means what we noticed above - every single <Latex expression="y" /> value between <Latex expression="f(0) = 0" /> and <Latex expression="f(3) = 9" /> is hit on <Latex expression="[0, 3]" />.
  </div>
</>

const Section6 = <>
  <div>
    The theorem also tells us that for any <Latex expression="L" /> between <Latex expression="f(0) = 0" /> and <Latex expression="f(3) = 9" />, there is some <Latex expression="c" /> in <Latex expression="[0, 3]" /> such that <Latex expression="f(c) = L" />.
  </div>
  <div>
    Basically, we can pick any number between <Latex expression="f(0) = 0" /> and <Latex expression="f(3) = 9" /> - for example, we can pick <Latex expression="4" />. This is going to be our <Latex expression="L" /> value.
  </div>
  <div>
    By the IVT, it is guaranteed that there is some <Latex expression="c" /> in <Latex expression="[0, 3]" /> such that <Latex expression="f(c) = 4" />.
  </div>
  <div>
    Looking at the graph in this case, we can see that this <Latex expression="c" /> value is <Latex classes="bold" expression="2" />. This satisfies the theorem since <Latex expression="c = 2" /> is in the interval <Latex expression="[0, 3]" />.
  </div>
</>

const Section7 = <>
  <div>
    It is not necessary to have a function expression to use IVT. For example, consider this question:
  </div>
  <div>
    Suppose <Latex expression="f(x)" /> is continuous over all real numbers. Let <Latex expression="f(-3) = 6" /> and <Latex expression="f(4) = 0" />. Is it guaranteed that there is a value <Latex expression="c" /> on <Latex expression="[-3, 4]" /> such that <Latex expression="f(c) = 3" />?
  </div>
</>

const Section8 = <>
  <div>
    Here, we can use the IVT to say that the answer is <strong>yes</strong>, because <Latex expression="f(x)" /> is continuous on <Latex expression="[-3, 4]" /> and <Latex expression="3" /> is in between <Latex expression="f(-3) = 6" /> and <Latex expression="f(4) = 0" />.
  </div>
  <div>
    What if we were asked if it is guaranteed that there is a value <Latex expression="c" /> on <Latex expression="[-3, 4]" /> such that <Latex expression="f(c) = 9" />?
  </div>
</>

const Section9 = <>
  <div>
    In that case, the IVT does <strong>not</strong> guarantee a value <Latex expression="c" /> on <Latex expression="[-3, 4]" /> such that <Latex expression="f(c) = 9" />, because even though <Latex expression="f(x)" /> is continuous on <Latex expression="[-3, 4]" />, <Latex expression="9" /> is <strong>not</strong> in between <Latex expression="f(-3) = 6" /> and <Latex expression="f(4) = 0" />.
  </div>
</>

const Section10 = <>
  <div>
    Instead of directly being given function values, you may be asked to find the function value using tables or equations. It is also your job to ensure the function is continuous on the interval.
  </div>
  <div>
    For example, consider the function <Latex expression={`g(x) = \\frac{1}{x}`} />.
  </div>
  <div>
    Does the IVT guarantee a value <Latex expression="c" /> on <Latex expression="[-2, 2]" /> such that <Latex expression="g(c) = 0" />?
  </div>
</>

const Section11 = <>
  <div>
    We know that <Latex expression="g(x)" /> is not continuous at <Latex expression="x = 0" /> - therefore it is not continuous on <Latex expression="[-2, 2]" />. Thus, the IVT cannot be applied to this function on this interval.
  </div>
  <div>
    How about if we wanted to know if the IVT guarantees a value <Latex expression="c" /> on <Latex expression="[1, 5]" /> such that <Latex expression={`g(c) = \\frac{1}{2}`} />?
  </div>
</>

const Section12 = <>
  <div>
    In this case, <Latex expression="g(x)" /> is continuous on <Latex expression="[1, 5]" />, so the IVT can be applied.
  </div>
  <div>
    Next, we evaluate <Latex expression="g(1) = 1" /> and <Latex expression={`g(5) = \\frac{1}{5}`} />.
  </div>
  <div>
    Since <Latex expression={`\\frac{1}{2}`} /> is in between <Latex expression="g(1) = 1" /> and <Latex expression={`g(5) = \\frac{1}{5}`} />, the IVT does guarantee that there is some <Latex expression="c" /> on <Latex expression="[1, 5]" /> such that <Latex expression={`g(c) = \\frac{1}{2}`} />.
  </div>
</>

const Section13 = <>
  <div>
    That's it for IVT and the Limits Unit! Remember to practice problems for the IVT and review from time to time to ensure you understand the content!
  </div>
</>

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13 }