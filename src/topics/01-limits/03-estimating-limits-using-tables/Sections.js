import { FunctionTable } from "../../../components/content-components/tables/FunctionTable"
import Latex from "../../../components/latex/Latex"

const table1Data = [
  { x: 1, y: 3 },
  { x: 2, y: 4 },
  { x: 3, y: 6 },
  { x: 3.9, y: 6.3 },
  { x: 3.99, y: 6.49 },
  { x: 3.999, y: 6.499 },
  { x: 4, y: 10 },
  { x: 4.001, y: 6.501 },
  { x: 4.01, y: 6.51 },
  { x: 4.1, y: 6.7 },
  { x: 5, y: 8 },
  { x: 6, y: 9 },
  { x: 7, y: 10 },
]

const table2Data = [
  { x: 1, y: 5 },
  { x: 2, y: 6 },
  { x: 3, y: 8 },
  { x: 3.9, y: 8.8 },
  { x: 3.99, y: 8.95 },
  { x: 3.999, y: 8.999 },
  { x: 4, y: 9 },
]

const table3Data = [
  { x: 1, y: 8 },
  { x: 2, y: 7 },
  { x: 3, y: 3 },
  { x: 4, y: 0 },
  { x: 5, y: -2 },
  { x: 6, y: -5 },
  { x: 7, y: -9 },
]

const table4Data = [
  { x: 2, y: 5},
  { x: 2.9, y: 5.9 },
  { x: 2.99, y: 5.99 },
  { x: 2.999, y: 5.999 },
  { x: 3, y: "und" },
  { x: 3.001, y: 6.001 },
  { x: 3.01, y: 6.01  },
  { x: 3.1, y: 6.1 },
  { x: 4, y: 7     },
]

const Section1 = () => {
  return (
    <div>In addition to graphs, limits can also be estimated from tables.</div>
  )
}
const Section2 = () => {
  return (
    <>
      <div>For example, consider this table. </div>
      <FunctionTable xTitle={"x"} yTitle={`f(x)`} data={table1Data} />
    </>
  )
}

const Section3 = () => {
  return (
    <>
      <div>It is reasonable to estimate that <Latex expression={`{\\lim}_{x \\to 4} f(x) = 6.5`} /> because that is what the values near <Latex expression={`x = 4`} /> seem to be approaching.</div>
    </>
  )
}

const Section4 = () => {
  return (
    <>
      <div>
        This is reasonable even though <Latex expression={`f(4) = 10`} />, because a limit is defined as what a function is <strong>approaching</strong>, not the actual value of the function. For all we know, there could be a hole in the graph at this point!
      </div>
    </>
  )
}

const Section5 = () => {
  return (
    <>
      <div>
        What about estimating <Latex expression={`{\\lim}_{x \\to 4} g(x)`} /> from this table?
      </div>
      <FunctionTable xTitle={`x`} yTitle={`g(x)`} data={table2Data} />
    </>
  )
}

const Section6 = () => {
  return (
    <>
      <div>
        We only have information about <Latex expression={`x`} /> values to the <strong>left</strong> of 4. Since we don't know anything about the graph on the right side of <Latex expression={`x = 4`} />, we cannot say anything about the limit.
      </div>
    </>
  )
}

const Section7 = () => {
  return (
    <>
      <div>
        Let's look at another table: What can we say about <Latex expression={`{\\lim}_{x \\to 4} h(x)`} />?
      </div>
      <FunctionTable xTitle={`x`} yTitle={`h(x)`} data={table3Data} />
    </>
  )
}

const Section8 = () => {
  return (
    <>
      <div>
        Again, we can't really say anything at all because we aren't really "zooming in" on <Latex expression={`x = 4`} />. Limits are the idea of getting infinitely close to the <Latex expression={`x`} /> value, and we don't see that in this table.
      </div>
    </>
  )
}

const Section9 = () => {
  return (
    <>
      <div>
        All of this brings us closer to estimating limits of functions. For example, suppose we are asked to find <Latex expression={`{\\lim}_{x \\to 3} k(x)`} />, where <Latex expression={`k(x) = \\frac{x^2 - 9}{x - 3}`} />
      </div>
    </>
  )
}

const Section10 = () => {
  return (
    <>
      <div>
        We don't have a graph of this function, so we cannot visually see the limit. However, what we can do is create a <strong>table of values</strong> for the function, "zooming in" on <Latex expression={`x = 3`} />. This will give us a good estimate of the limit.
      </div>
      <FunctionTable xTitle={`x`} yTitle={`k(x)`} data={table4Data} />
    </>
  )
}

const Section11 = () => {
  return (
    <>
      <div>
        Based on this table, we can reasonably estimate that <Latex expression={`{\\lim}_{x \\to 3} k(x) = 6`} />.
      </div>
      <div>
        When we use this strategy to estimate a limit, it is important to make sure to "zoom in" on the point from <strong>both</strong> sides. Pick x-values that get infinitely close to the point in question to get a good estimate!
      </div>
    </>
  )
}

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11 }