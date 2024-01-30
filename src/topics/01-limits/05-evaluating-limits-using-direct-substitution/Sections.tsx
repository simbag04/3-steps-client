import Latex from "../../../components/latex/Latex"
import { Piecewise } from "../../../components/latex/Piecewise"
import React from "react"

/*
const Section1 = () => {
  return (
    <>
      <div>
        In the last section, we learned about using properties of limits to evaluate limits of complex functions.
      </div>
      <div>
        You may have noticed that you could have just directly substituted in the values of the limits.
      </div>
    </>
  )
}

const Section2 = () => {
  return (
    <>
      <div>
        For example, suppose that <Latex expression={`\\lim_{x \\to 5} f(x) = 5`} /> and <Latex expression={`\\lim_{x \\to 5} g(x) = 3`} />, and we want to find <Latex expression={`\\lim_{x \\to 5} \\left[\\frac{3f(x)}{g(x)} + g(x)^2 \\right]`} />.
      </div>
      <div>
        We could use the limit properties to simplify this, but we could also just directly substitute 5 for <Latex expression={`f(x)`} /> and 3 for <Latex expression={`g(x)`} /> in the limit expression.
      </div>
      <div>
        Then, we would get <Latex expression={`\\lim_{x \\to 5} \\left[\\frac{3f(x)}{g(x)} + g(x)^2 \\right] = `} /> <Latex expression={`\\frac{3(5)}{3} + (3)^2 = 5 + 9 = 14`} />.
      </div>
    </>
  )
}

const Section3 = () => {
  return (
    <>
      <div>
        This works because we already know the limit exists at <Latex expression={`x = 5`} /> for both <Latex expression={`f(x)`} /> and <Latex expression={`g(x)`} />.
      </div>
      <div>
        The expression for which we want to find the limit is just a transformation of these two functions. Therefore, we can apply the transformation directly to the values of the limits (i.e. directly substitute in the values).
      </div>
    </>
  )
}
*/

const Section1 = () => {
  return (
    <>
      <div>
        Another rule for limits that we can use is <Latex expression={`\\lim_{x \\to c} x = c`} />, where <Latex expression={`c`} /> is a constant.
      </div>
      <div>
        This makes sense because the graph of <Latex expression={`y = x`} /> is just a continuous line, so the limit at any point on the line is just the y-value at that point.
      </div>
    </>
  )
}

const Section2 = () => {
  return (
    <>
      <div>
        Due to this, we can evaluate limits with just <Latex expression={`x`} /> as a variable.
      </div>
      <div>
        As an example, consider <Latex classes='bold' expression={`\\lim_{x \\to 3} (x^2 + 6x - 3)`} />.
      </div>
    </>
  )
}

const Section3 = () => {
  return (
    <>
      <div>
        We already know <Latex expression={`\\lim_{x \\to 3} x = 3`} />. Thus, we can directly substitute in 3 for <Latex expression={`x`} />.
      </div>
      <div>
        This gives us <Latex expression={`\\lim_{x \\to 3} (x^2 + 6x - 3) = `} /> <Latex expression={`(3)^2 + 6(3) - 3 = 24`} />.
      </div>
    </>
  )
}

const Section4 = () => {
  const functions = [{ f: `2x - 1`, domain: `x < 0` }, { f: `x`, domain: `x \\geq 0` }]
  return (
    <>
      <div>
        Let's look at an example with <strong>piecewise functions</strong>. Let <Piecewise title={`f(x)`} functions={functions} display={true} />
      </div>
      <div>
        What is <Latex classes='bold' expression={`\\lim_{x \\to 5} f(x)`} />?
      </div>
    </>
  )
}

const Section5 = () => {
  return (
    <>
      <div>
        Since we are evaluating the limit as <Latex expression={`x \\to 5`} />, and <Latex expression={`5 \\geq 0`} />, we need to use the second function.
      </div>
      <div>
        Therefore, <Latex expression={`\\lim_{x \\to 5} f(x) = `} /> <Latex expression={`\\lim_{x \\to 5} x = 5`} />.
      </div>
    </>
  )
}

const Section6 = () => {
  return (
    <>
      <div>
        What about <Latex classes='bold' expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{-}}} f(x)`} /> and <Latex classes='bold' expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{+}}} f(x)`} />? <Latex classes='bold' expression={`\\lim_{x \\to 0} f(x)`} />?
      </div>
    </>
  )
}

const Section7 = () => {
  return (
    <>
      <div>
        For <Latex expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{-}}} f(x)`} />, since we are asked about the limit from the <strong>left</strong>, we need to use the first function. Therefore, <Latex expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{-}}} f(x) = `} /> <Latex expression={`\\lim_{x \\to 0} (2x - 1) = -1`} />.
      </div>
      <div>
        Similarly, <Latex expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{+}}} f(x) = `} /> <Latex expression={`\\lim_{x \\to 0} x = 0`} />.
      </div>
    </>
  )
}

const Section8 = () => {
  return (
    <>
      <div>
        Since <Latex expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{-}}} f(x) \\neq`} /> <Latex expression={`\\lim_{x \\to 0^{\\footnotesize\\texttt{+}}} f(x)`} />, <Latex expression={`\\lim_{x \\to 0} f(x)`} /> <strong>does not exist!</strong>
      </div>
    </>
  )
}

const Section9 = () => {
  return (
    <>
      <div>
        Lastly, let's look at <strong>absolute value functions</strong>. Let <Latex expression={`g(x) = |x - 3|`} />. What is <Latex expression={`\\lim_{x \\to 3} g(x)`} />?
      </div>
    </>
  )
}

const Section10 = () => {
  return (
    <>
      <div>
        The first thing we should do is rewrite this absolute value function as a piecewise function, so we know which function we should use to evaluate the limit.
      </div>
      <div>
        Recall that to write an absolute value function as a piecewise function, we need to first find where the inside of the absolute value (in this case <Latex expression={`x - 3`} />) is <Latex expression={'<'} /> or <Latex expression={'>'} /> than 0.
      </div>
    </>
  )
}

const Section11 = () => {
  const functions = [{ f: '-(x - 3)', domain: 'x < 3' }, { f: `x - 3`, domain: `x \\geq 3` }]
  return (
    <>
      <div>
        Since <Latex expression={`x - 3 \\geq 0`} /> when <Latex expression={`x \\geq 3`} />, and <Latex expression={`x - 3 < 0`} /> when <Latex expression={`x < 3`} />, we have <Piecewise title={'g(x)'} functions={functions} display={true} />
      </div>
      <div>
        Using this, we can evaluate both limits:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to 3^{\\footnotesize\\texttt{-}}} g(x) = \\lim_{x \\to 3} \\left[-(x - 3)\\right] = 0`} display={true} />
        <Latex expression={`\\lim_{x \\to 3^{\\footnotesize\\texttt{+}}} g(x) = \\lim_{x \\to 3} (x - 3) = 0`} display={true} />
      </div>
    </>
  )
}

const Section12 = () => {
  return (
    <>
      <div>
        Since <Latex expression={`\\lim_{x \\to 3^{-}} g(x) = `} /> <Latex expression={`\\lim_{x \\to 3^{+}} g(x) = 0`} />, <Latex expression={`\\lim_{x \\to 3} g(x) = 0`} />!
      </div>
    </>
  )
}

const Section13 = () => {
  return (
    <>
      <div>
        To summarize, direct substitution is a great first step towards evaluating a limit. However, remember to use the correct functions to substitute into, especially in cases with piecewise and absolute value functions.
      </div>
    </>
  )
}



export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13 }