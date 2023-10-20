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
  {
    f: x => n2.evaluate({ x }),
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
    f: x => n3.evaluate({ x }),
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
]

const Section1 = <>
  <div>
    When calculating limits, one theorem that is useful is the <strong>Squeeze Theorem</strong>.
  </div>
  <div>
    This theorem says that <strong>if</strong> <Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} /> <strong>near</strong> <Latex expression={`x = a`} /> (but not necessarily <strong><em>at</em></strong> <Latex expression={`x = a`} />), and <Latex expression={`\\\\\\lim_{x \\to a}`} /><Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`=\\lim_{x \\to a}`} /> <Latex classes={'c3'} expression={`h(x)`} /> <Latex expression={`=L`} />, then <Latex expression={`\\lim_{x \\to a}`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`=L`} />.
  </div>
</>

const Section2 = <>
  To understand this, let's look at an example graph.
  <FunctionGraph functions={functions} size={GRAPH_SIZE} minx={-0.3} maxx={0.3} miny={-0.3} maxy = {0.3} />
</>

export { Section1, Section2 }