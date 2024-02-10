import React from "react"
import Latex from "../../../components/latex/Latex"
import { GraphFunction } from "../../../@types/GraphFunction"
import * as math from "mathjs"
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph"
import { GRAPH_SIZE } from "../../../helpers/constants"

const n1 = math.parse('x^2')
const n2 = math.parse('2x - 1')
const x_squared: GraphFunction[] = [
  {
    f: (x) => n1.evaluate({ x }),
    min: -11,
    max: 11,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: true,
    classes: 'c1',
    leftCircle: false,
    rightCircle: false
  }
]

const graph2: GraphFunction[] = [...x_squared,
{
  f: (x) => n2.evaluate({ x }),
  min: -1,
  max: 3,
  includeLeft: false,
  includeRight: false,
  leftArrow: false,
  rightArrow: false,
  classes: 'high-width c2',
  leftCircle: false,
  rightCircle: false
}
]
const Section1 = <>
  <div>
    The <strong>average rate of change</strong> of a function <Latex expression="f(x)" /> over an interval <Latex expression="[a, b]" /> is just the slope between the points <Latex expression="(a, f(a))" /> and <Latex expression="(b, f(b))" />.
  </div>
  <div>
    As an example, consider a graph of <Latex expression="f(x) = x^2" />:
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression="f(x)" /></h3>
    <FunctionGraph functions={x_squared} size={GRAPH_SIZE} />
  </div>

</>

const Section2 = <>
  <div>
    In order to find the <strong>average rate of change</strong> of <Latex expression="f(x)" /> over <Latex expression="[0, 2]" />, we can just use the regular slope formula:
  </div>
  <div>
    <Latex expression={`\\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}`} display={true} />
  </div>
  <div>
    Plugging in numbers, we get:
  </div>
  <div>
    <Latex expression={`\\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{f(2) - f(0)}{2 - 0} = \\frac{4 - 0}{2 - 0} = 2`} display={true} />
  </div>
</>

const Section3 = <>
  <div>
    Thus, the average rate of change of <Latex expression="f(x)" /> over <Latex expression="[0, 2]" /> is <Latex classes="bold" expression="2" />.
  </div>
  <div>
    In contrast, an <strong>instantaneous rate of change</strong> is the slope of the <strong>tangent line</strong> at a point.
  </div>
  <div>
    Let's understand this graphically by drawing the line <strong>tangent</strong> to <Latex expression="x = 1" />:
  </div>
  <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression="f(x)" /></h3>
    <FunctionGraph functions={graph2} size={GRAPH_SIZE} />
  </div>
</>

const Section4 = <>
  <div>
    The green line is the tangent line - this is the line that represents the direction of the graph at a particular point.
  </div>
  <div>
    Looking at this line, we can see that the slope of it is <Latex expression="2" />.
  </div>
  <div>
    This means that the <strong>instantaneous rate of change</strong> at <Latex expression="x = 1" /> is <Latex classes="bold" expression="2" />.
  </div>
</>

const Section5 = <>
  <div>
    The instantaneous rate of change is also known as the <strong>derivative</strong> at a point. This is denoted as <Latex classes="bold" expression="f'(x)" />.
  </div>
  <div>
    For the above problem, we would say that <Latex classes="bold" expression="f'(1) = 2" />.
  </div>
</>

const Section6 = <>
  <div>
    Thus, the <strong>derivative</strong> <em>and</em> <strong>instantaneous rate of change</strong> of a function at a point is just the slope of the <strong>tangent line</strong> to the function at that point.
  </div>
  <div>
    Suppose we were given that <Latex expression="g'(4) = -2" />. What is the slope of the tangent line to <Latex expression="g(x)" /> at <Latex expression="x = 4" />?
  </div>
</>

const Section7 = <>
  <div>
    Since the derivative at <Latex expression="x = 4" /> is <Latex expression="-2" />, the slope of the tangent line to <Latex expression="g(x)" /> at <Latex expression="x = 4" /> is also <Latex classes="bold" expression="-2" />.
  </div>
  <div>
    Suppose that we were also given that <Latex expression="g(4) = -5" /> - how can we write the <strong>equation</strong> of the tangent line to <Latex expression="g(x)" /> at <Latex expression="x = 4" />?
  </div>
</>

const Section8 = <>
  <div>
    We essentially want to write an equation in the form <Latex expression="y = mx + b" />, where <Latex expression="m" /> is the slope and <Latex expression="b" /> is the y-intercept. We know from above that <Latex expression="m = -2" />.
  </div>
  <div>
    Also, the line that is tangent to <Latex expression="g(x)" /> at <Latex expression="x = 4" /> <strong>touches</strong> <Latex expression="g(x)" /> at <Latex expression="x = 4" />. What this means is that <Latex expression="(4, g(4)) = (4, -5)" /> is a point on both <Latex expression="g(x)" /> <em>and</em> the tangent line to <Latex expression="g(x)" /> at this point.
  </div>
</>

const Section9 = <>
  <div>
    Thus, we can use <Latex expression="(4, -5)" /> as a point to solve for the <Latex expression="b" /> value!
  </div>
  <div>
    Plugging numbers in, we get:
  </div>
  <div>
    <Latex expression="-5 = (-2)(4) + b" display={true} />
    <Latex expression="b = 3" display={true} />
  </div>
</>

const Section10 = <>
  <div>
    Thus, the equation of the tangent line to <Latex expression="g(x)" /> at <Latex expression="x = 4" /> is <Latex classes="bold" expression="y = -2x + 3" />.
  </div>
</>

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10 }