import Latex from '../../../components/latex/Latex'
import '../../../styles/graph.css'
import { LimitPropertyRules } from "./LimitPropertyRules"
import React from 'react'

const Section1 = () => {
  return (
    <>
      <div>There are a variety of properties that can be used to compute limits.</div>
      <div>Throughout this section, we will be using the fact that <Latex expression={`{\\lim}_{x \\to a} f(x)`} /> and <Latex expression={`{\\lim}_{x \\to a} g(x)`} /> exist, and <Latex expression={`c`} /> is a constant</div>
    </>
  )
}

const Section2 = () => {
  return (
    <>
      <div>
        This is a list of all the properties we will need. Don't worry about memorizing these as you will see that it is not necessary!
      </div>
      <LimitPropertyRules />
    </>
  )
}

const Section3 = () => {
  return (
    <>
      <div>Let's work through an example. Suppose that we are <strong>given</strong> <Latex expression={`\\lim_{x \\to 5} f(x) = 2`} /> and <Latex expression={`\\lim_{x \\to 5} g(x) = 4`} /> and we want to find:

      </div>
      <div>
        <Latex expression={`\\lim_{x \\to 5} \\left[3f(x) g(x) + \\frac{f(x)^2}{\\sqrt[2]{g(x)}} + 5 \\right]`} display={true} />
      </div>
    </>
  )
}

const Section4 = () => {
  return (
    <>
      <div>
        Since we see a sum, we can start by using rule number <strong>2</strong> to split up the limit into:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to 5} 3f(x) g(x) + \\lim_{x \\to 5} \\left[\\frac{f(x)^2}{\\sqrt[2]{g(x)}} \\right] + \\lim_{x \\to 5} 5`} display={true} />
      </div>
    </>
  )
}

const Section5 = () => {
  return (
    <>
      <div>
        Looking at the first term, we see a product of two functions, so let's use rule number <strong>3</strong> to split those up. Also, we can use rule number <strong>7</strong> for the last term:
      </div>
      <div>
        <Latex expression={`(\\lim_{x \\to 5} 3f(x) \\cdot \\lim_{x \\to 5} g(x)) + \\lim_{x \\to 5} \\left[\\frac{f(x)^2}{\\sqrt[2]{g(x)}} \\right] + 5`} display={true} />
      </div>
    </>
  )
}

const Section6 = () => {
  return (
    <>
      <div>
        Awesome, we see a <Latex expression={`\\lim_{x \\to 5} g(x)`} /> that we can replace with 4! Also, we can apply rule number <strong>1</strong> to <Latex expression={`\\lim_{x \\to 5} 3f(x)`} />:
      </div>
      <div>
        <Latex expression={`(3 \\lim_{x \\to 5} f(x) \\cdot 4) + \\lim_{x \\to 5} \\left[\\frac{f(x)^2}{\\sqrt[2]{g(x)}} \\right] + 5`} display={true} />
      </div>
    </>
  )
}

const Section7 = () => {
  return (
    <>
      <div>
        We see <Latex expression={`\\lim_{x \\to 5} f(x)`} /> which we can replace with 2!
      </div>
      <div>
        <Latex expression={`(3 \\cdot 2 \\cdot 4) + \\lim_{x \\to 5} \\left[\\frac{f(x)^2}{\\sqrt[2]{g(x)}} \\right] + 5`} display={true} />
      </div>
    </>
  )
}

const Section8 = () => {
  return (
    <>
      <div>
        Simplifying, we have evaluated that the first term is 24! Let's continue with the 2nd term: since we see a fraction, we can use rule number <strong>4</strong>.
      </div>
      <div>
        <Latex expression={`24 + \\left[\\frac{\\lim_{x \\to 5} \\left[f(x)^2\\right]}{\\lim_{x \\to 5} \\sqrt[2]{g(x)}} \\right] + 5`} display={true} />
      </div>
    </>
  )
}

const Section9 = () => {
  return (
    <>
      <div>
        Let's use rule number <strong>5</strong> for the exponent on top. Also, rule number <strong>6</strong> can be applied for the fraction's denominator:
      </div>
      <div>
        <Latex expression={`24 + \\left[\\frac{\\left[\\lim_{x \\to 5} f(x)\\right]^2}{\\sqrt[2]{\\left[\\lim_{x \\to 5} g(x)\\right]}} \\right] + 5`} display={true} />
      </div>
    </>
  )
}

const Section10 = () => {
  return (
    <>
      <div>
        Again, we see <Latex expression={`\\lim_{x \\to 5} f(x)`} /> and <Latex expression={`\\lim_{x \\to 5} g(x)`} /> which we can replace with 2 and 4 respectively!
      </div>
      <div>
        <Latex expression={`24 + \\left[\\frac{2^2}{\\sqrt[2]{4}} \\right] + 5`} display={true} />
      </div>
    </>
  )
}

const Section11 = () => {
  return (
    <>
      <div>
        Simplifying, we get down to <Latex expression={`24 + \\frac{4}{2} + 5 = 24 + 2 + 5 = 31`} />
      </div>
    </>
  )
}

const Section12 = () => {
  return (
    <>
      <div>
        Instead of expanding the limit properties 1 by 1, we could also just have directly substituted in the corresponding limit of each function:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to 5} \\left[3f(x) g(x) + \\frac{f(x)^2}{\\sqrt[2]{g(x)}} + 5 \\right] = `} display={true} /> <Latex expression={`\\lim_{x \\to 5} \\left[3(2)(4) + \\frac{(2)^2}{\\sqrt[2]{(4)}} + 5 \\right] = 24 + 2 + 5 = 31`} display={true} />
      </div>
    </>
  )
}

const Section13 = () => {
  return (
    <>
      <div>
        Wow, the problem looked so complicated at the beginning, but it actually wasn't that hard! The limit properties enable us to use direct substitution to evaluate these limits.
      </div>
      <div>
        In this example, we started with givens: <Latex expression={`\\lim_{x \\to 5} f(x) = 2`} /> and <Latex expression={`\\lim_{x \\to 5} g(x) = 4`} />. Keep in mind that you can also use graphs or tables to find values of limits, as we learned in previous lessons.
      </div>
    </>
  )
}

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13 }