import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph";
import Latex from "../../../components/latex/Latex";
import { GRAPH_SIZE } from "../../../helpers/constants";
import '../../../styles/graph.css'
import * as math from 'mathjs'

const n1 = math.parse('x^2* sin(1/x)');
const n2 = math.parse('x^2');
const n3 = math.parse('-x^2');
const functions = [
  {
    f: x => n2.evaluate({ x }),
    min: -0.5,
    max: 0.5,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: true,
    classes: 'c3',
    leftCircle: false,
    rightCircle: false,
  },
  {
    f: x => n3.evaluate({ x }),
    min: -0.5,
    max: 0.5,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: true,
    classes: 'c1',
    leftCircle: false,
    rightCircle: false,
  },
  {
    f: x => n1.evaluate({ x }),
    min: -0.5,
    max: 0,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: false,
    classes: 'c2',
    leftCircle: false,
    rightCircle: false,
    dataGap: 0.001
  },
  {
    f: x => n1.evaluate({ x }),
    min: 0,
    max: 0.5,
    includeLeft: false,
    includeRight: false,
    leftArrow: false,
    rightArrow: true,
    classes: 'c2',
    leftCircle: false,
    rightCircle: false,
    dataGap: 0.001
  },
]

const Section1 = <>
  <div>
    When calculating limits, one theorem that is useful is the <strong>Squeeze Theorem</strong>.
  </div>
  <div>
    This theorem says that <strong>if</strong> <Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} /> <strong>near</strong> <Latex expression={`x = a`} /> (but not necessarily <strong><em>at</em></strong> <Latex expression={`x = a`} />),
  </div>
  <div>
    and <Latex classes={'c1'} expression={`\\lim_{x \\to a} f(x)`} /> <Latex expression={`=`} /> <Latex classes={'c3'} expression={`\\lim_{x \\to a} h(x)`} /> <Latex classes={'c4'} expression={'=L'} />, then <Latex classes={'c2'} expression={`\\lim_{x \\to a} g(x)`} /> <Latex classes={'c4'} expression={'=L'} />.
  </div>
</>

const Section2 = <>
  <div>
    To understand this, let's look at an example graph with <Latex classes={'c1'} expression={`f(x) = -x^2`} />, <Latex classes={'c2'} expression={`g(x) = x^2 \\sin(\\frac{1}{x})`} />, <Latex classes={'c3'} expression={`h(x) = x^2`} />
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Sample Graph</h3>
    <FunctionGraph functions={functions} size={GRAPH_SIZE} minx={-0.3} maxx={0.3} miny={-0.3} maxy={0.3} />
  </div>
</>

const Section3 = <>
  <div>
    We want to evaluate <Latex expression={`\\lim_{x \\to 0}`} /> <Latex classes={'c2'} expression={`g(x)`} />. However, using direct substition, we get: <Latex expression={`\\lim_{x \\to 0} g(x) = \\lim_{x \\to 0} x^2 \\sin(\\frac{1}{x}) = (0)^2 \\sin(\\frac{1}{0})`} display={true} />
  </div>
  <div>
    Graphically, it is clear that this limit is <Latex expression={`0`} />. But how can we evaluate this limit analytically?
  </div>
</>

const Section4 = <>
  <div>
    We can use the Squeeze Theorem! In this example, we see that <Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} />
  </div>
</>

const Section5 = <>
  <div>
    We can focus on the limits of the top and bottom functions:
    <Latex classes={'c1'} expression={`\\lim_{x \\to 0} f(x)= \\lim_{x \\to 0} -x^2 = 0`} display={true} />
    <Latex classes={'c3'} expression={`\\lim_{x \\to 0} h(x)= \\lim_{x \\to 0} x^2 = 0`} display={true} />
  </div>
</>

const Section6 = <>
  <div>
    Since <Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} /> near <Latex expression={`x = 0`} />, and <Latex classes={'c1'} expression={`\\lim_{x \\to 0} f(x)=0`} />, and <Latex classes={'c3'} expression={`\\lim_{x \\to 0} h(x)=0`} />,
  </div>
  <div>
    by the Squeeze Theorem, <Latex classes={'c2'} expression={`\\lim_{x \\to 0} g(x)=0`} />
  </div>
</>

const Section7 = <>
  <div>
    However, how could we have known that <Latex classes={'c1'} expression={`-x^2`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`x^2 \\sin(\\frac{1}{x})`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`x^2`} /> without looking at the graph?
  </div>
</>

const Section8 = <>
  <div>
    Since we want to find <Latex classes={'c2'} expression={`\\lim_{x \\to 0} x^2 \\sin(\\frac{1}{x})`} />, first we can focus on just <Latex expression={`\\sin(\\frac{1}{x})`} />.
  </div>
  <div>
    Since this is a <Latex expression={`\\sin`} /> function, we know that <Latex expression={`-1 \\leq \\sin(\\frac{1}{x}) \\leq 1`} />
  </div>
</>

const Section9 = <>
  <div>
    Now, multiplying the whole inequality by <Latex expression={`x^2`} />, we get <Latex expression={`-x^2 \\leq x^2\\sin(\\frac{1}{x}) \\leq x^2`} />, which is exactly what we want!
  </div>
</>

const Section10 = <>
  <div>
    Lastly, we just take <Latex expression={`\\lim_{x \\to 0}`} /> of all 3 expressions, which gives us:
    <Latex expression={`\\lim_{x \\to 0}-x^2 \\leq \\lim_{x \\to 0}x^2\\sin(\\frac{1}{x}) \\leq \\lim_{x \\to 0} x^2`} display={true} />
    <Latex expression={`0 \\leq \\lim_{x \\to 0}x^2\\sin(\\frac{1}{x}) \\leq 0`} display={true} />
    <Latex expression={`\\lim_{x \\to 0}x^2\\sin(\\frac{1}{x}) = 0`} display={true} />
  </div>
  <div>
    This is the same as the result from before!
  </div>
</>


const Section11 = <>
  <div>
    Let's look at another example: <Latex expression={`\\lim_{x \\to 0} -x^2 \\sin(\\frac{1}{x}) + 1`} />. Similar to before, we can start with the inequality <Latex expression={`-1 \\leq \\sin(\\frac{1}{x}) \\leq 1`} />.
  </div>
</>

const Section12 = <>
  <div>
    The next logical step is to multiply both sides by <Latex expression={`-x^2`} />. However, we have to be careful here - since <Latex expression={`-x^2`} /> is always negative, we have to also flip the inequalities to get: <Latex expression={`x^2 \\geq -x^2\\sin(\\frac{1}{x}) \\geq -x^2`} />.
  </div>
</>

const Section13 = <>
  <div>
    Rewriting this inequality from least to greatest, we get <Latex expression={`-x^2 \\leq -x^2\\sin(\\frac{1}{x}) \\leq x^2`} />
  </div>
  <div>
    Next, we can add 1 to all sides of the inequality to get <Latex expression={`-x^2 + 1 \\leq -x^2\\sin(\\frac{1}{x}) + 1 \\leq x^2 + 1`} />
  </div>
</>

const Section14 = <>
  <div>
    Finally, taking <Latex expression={`\\lim_{x \\to 0}`} /> of all 3 expressions in the inequality, we get
    <Latex expression={`\\lim_{x \\to 0} -x^2 + 1 \\leq \\lim_{x \\to 0} -x^2\\sin(\\frac{1}{x}) + 1 \\leq \\lim_{x \\to 0} x^2 + 1`} display={true} />
    <Latex expression={`1 \\leq \\lim_{x \\to 0} -x^2\\sin(\\frac{1}{x}) + 1 \\leq 1`} display={true} />
  </div>
  <div>
    Therefore: <Latex expression={`\\lim_{x \\to 0} -x^2\\sin(\\frac{1}{x}) + 1 = 1`} display={true} />
  </div>
</>
// const Section11 = <>
//   <div>
//     The Squeeze Theorem can also be used to show that <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1`} /> and <Latex expression={`\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0`} />
//   </div>
//   <div>
//     These can be used to evaluate limits very easily!
//   </div>
// </>

// const Section12 = <>
//   <div>
//     For example, what is <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin(7x)}{x}`} />?
//   </div>
// </>

// const Section13 = <>
//   <div>
//     Multiplying the fraction by <Latex expression={`\\frac{7}{7}`} />, <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin(7x)}{x} = \\lim_{x \\to 0} \\frac{7\\sin(7x)}{7x} = 7 \\lim_{x \\to 0} \\frac{\\sin(7x)}{7x}`} display={true} />
//   </div>
// </>

// const Section14 = <>
//   <div>
//     Now, we can apply the rule that <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin x}{x} = 0`} /> to say that <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin(7x)}{7x} = 1`} />
//   </div>
//   <div>
//     Notice how it is not necessary that we have <Latex expression={`\\frac{\\sin(x)}{x}`} /> - as long as we have the same expression for both <Latex expression={`x`} /> in <Latex expression={`\\frac{\\sin(x)}{x}`} />, we can use this property.
//   </div>
// </>

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13, Section14 }