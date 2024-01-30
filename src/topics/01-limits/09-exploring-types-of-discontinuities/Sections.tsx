import React from "react";
import { GraphFunction } from "../../../types/GraphFunction";
import * as math from "mathjs"
import { GraphPoint } from "../../../types/GraphPoint";
import Latex from "../../../components/latex/Latex";
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph";
import AsymptoticGraph from "../../../components/content-components/graphs/AsymptoticGraph"
import { GRAPH_SIZE } from "../../../helpers/constants";

const f1 = math.parse("x^2")
const f2 = math.parse("x")
const f3 = math.parse("-1/(x - 1) + 1")
const f4 = math.parse("x + 2")

const removableFunctions: GraphFunction[] = [
  {
    f: (x: number) => f1.evaluate({ x }),
    min: -11,
    max: 2,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: false,
    classes: "c1",
    leftCircle: false,
    rightCircle: true
  },
  {
    f: (x: number) => f1.evaluate({ x }),
    min: 2,
    max: 11,
    includeLeft: false,
    includeRight: false,
    leftArrow: false,
    rightArrow: true,
    classes: "c1",
    leftCircle: true,
    rightCircle: false
  }
]

const removablePoints: GraphPoint[] = [
  {
    x: 2,
    y: 1,
    classes: "c1"
  }
]

const jumpFunctions: GraphFunction[] = [
  {
    f: (x: number) => f1.evaluate({ x }),
    min: -11,
    max: 2,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: false,
    classes: "c2",
    leftCircle: false,
    rightCircle: true
  },
  {
    f: (x: number) => f2.evaluate({ x }),
    min: 2,
    max: 11,
    includeLeft: true,
    includeRight: false,
    leftArrow: false,
    rightArrow: true,
    classes: "c2",
    leftCircle: true,
    rightCircle: false
  }
]

const asymptoticFunctions = [
  {
    f: (x: number) => f3.evaluate({ x }),
    min: -11,
    max: 1,
    includeLeft: true,
    includeRight: false,
    leftArrow: true,
    rightArrow: true,
    classes: 'c3',
    leftCircle: false,
    rightCircle: false,
    type: "asymptotic"
  },
  {
    f: (x: number) => f3.evaluate({ x }),
    min: 1,
    max: 11,
    includeLeft: false,
    includeRight: true,
    leftArrow: true,
    rightArrow: true,
    classes: 'c3',
    leftCircle: false,
    rightCircle: false,
    type: "asymptotic"
  }
]

const continuousFunctions: GraphFunction[] = [
  {
    f: (x: number) => f1.evaluate({ x }),
    min: -11,
    max: 2,
    includeLeft: false,
    includeRight: true,
    leftArrow: true,
    rightArrow: false,
    classes: "c4",
    leftCircle: false,
    rightCircle: true
  },
  {
    f: (x: number) => f4.evaluate({ x }),
    min: 2,
    max: 11,
    includeLeft: true,
    includeRight: false,
    leftArrow: false,
    rightArrow: true,
    classes: "c4",
    leftCircle: true,
    rightCircle: false
  }
]

const Section1 = <>
  <div>
    Now that we are comfortable evaluating limits, we can discuss what it means for a graph to be <strong>continuous</strong>.
  </div>
  <div>
    In order to better understand continuous graphs, let's first explore some discontinuous graphs.
  </div>
</>

const Section2 = <>
  <div>
    Let's consider this graph that has a <strong>removable</strong> discontinuity:
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph with Removable Discontinuity </h3>
    <FunctionGraph functions={removableFunctions} size={GRAPH_SIZE} points={removablePoints} ></FunctionGraph>
  </div>

</>

const Section3 = <>
  <div>
    We call this discontinuity removable because we just need to fix the value of the function at <Latex expression="x = 2" /> to make the function continuous again.
  </div>
</>

const Section4 = <>
  <div>
    Let's look at another type of discontinuity: a <strong>jump</strong> discontinuity.
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph with Jump Discontinuity </h3>
    <FunctionGraph functions={jumpFunctions} size={GRAPH_SIZE}></FunctionGraph>
  </div>
</>

const Section5 = <>
  <div>
    This is a jump discontinuity as there is a jump between two sections of the graph, causing the graph to be discontinuous.
  </div>
</>

const Section6 = <>
  <div>
    Lastly, let's look at a graph with an <strong>infinite</strong> discontinuity.
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph with Infinite Discontinuity </h3>
    <AsymptoticGraph functions={asymptoticFunctions} size={GRAPH_SIZE} x={[1]} y={[1]}></AsymptoticGraph>
  </div>
</>

const Section7 = <>
  <div>
    This is an infinite discontinuity as the graph seems to be going to <Latex expression={`\\infty`} /> or <Latex expression={`-\\infty`} /> at <Latex expression="x = 1" />.
  </div>
</>

const Section8 = <>
  <div>
    If a graph doesn't fall into one of these categories, it is continuous. Now that we've looked at so many discontinuous graphs, let's look at a continuous one too:
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Continuous Graph</h3>
    <FunctionGraph functions={continuousFunctions} size={GRAPH_SIZE}></FunctionGraph>
  </div>
</>

const Section9 = <>
  <div>
    This graph is continuous even though it is a piecewise graph, because there are no removable, jump, or infinite discontinuities.
  </div>
  <div>
    We will explore how to more formally define continuity in the next section!
  </div>
</>

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9 }