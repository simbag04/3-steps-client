import Latex from "../../../components/latex/Latex"
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

const Section4 = () => {
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

const Section5 = () => {
  return (
    <>
      <div>
        Due to this, direct substitution also works when finding a limit with just <Latex expression={`x`} /> as a variable.
      </div>
      <div>
        As an example, consider <Latex expression={`\\lim_{x \\to 3} (x^2 + 6x - 3)`} />.
      </div>
    </>
  )
}

const Section6 = () => {
  return (
    <>
      <div>
        We already know <Latex expression={`\\lim_{x \\to 3} x = 3`} />. The expression we are finding the limit for is just a transformation of this function, so we can directly substitute in 3 for <Latex expression={`x`} />.
      </div>
      <div>
        This gives us <Latex expression={`\\lim_{x \\to 3} (x^2 + 6x - 3) = `} /> <Latex expression={`(3)^2 + 6(3) - 3 = 24`} />. That was even easier than using the properties! 
      </div>         
    </>
  )
}

const Section7 = () => {
  return (
    <>
      <div>
        Let's look at another example. Let <Latex expression={`f(x) = \\begin{cases} 2x & x < 0\\\\ x & x \\geq 0 \\end{cases}`} display={true} />
      </div>
    </>
  )
}

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7 }