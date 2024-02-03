import Latex from "../../../components/latex/Latex";
import { getRandomNumber, getRandomWithExclusions } from "../../../helpers/functions";
import { fitPointsToQuadratic, generateRandomPolynomialWithPoint } from "../../../helpers/expression-generators"
import * as math from 'mathjs'
import AsymptoticGraph from "../../../components/content-components/graphs/AsymptoticGraph";
import { COLORS, GRAPH_SIZE } from "../../../helpers/constants";
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph";
import React from "react";
import { Question } from "../../../@types/Question";
import { GraphFunction } from "../../../@types/GraphFunction";

/**
 * generates random question that shows a graph with asymptote(s) and asks users to find the limit at an asymptotic point
 * @returns question, answer, text next to input, hints
 */
const asymptoticGraphQuestion = (): any => {
  const randomNumbers = getRandomNumber(1, 2); // number of asymptotes
  const xValues = []; // values at which there will be an asymptote
  let f = `(${getRandomNumber(0, 1) === 0 ? "-" : ""}1/`; // function

  // get random x values and build function
  for (let i = 0; i < randomNumbers; i++) {
    const num = getRandomWithExclusions(-7, 7, [-1, 0, 1, ...xValues]);
    xValues[i] = num;
    f = f + `(x ${num < 0 ? '+' : '-'} ${Math.abs(num)})`;
  }
  const verticalShift = getRandomNumber(-5, 5)
  f = f + `) ${verticalShift > 0 ? '+' : '-'} ${Math.abs(verticalShift)}`

  // sort x values in ascending order
  xValues.sort((a, b) => a - b);
  const node = math.parse(f);

  // generate functions array
  // this generates an array that doesn't include the x values as the function is undefined at those points
  const functions: GraphFunction[] = [];
  for (let i = 0; i <= xValues.length; i++) {
    let curr = {
      f: (x: number) => node.evaluate({ x }),
      min: i === 0 ? -11 : xValues[i - 1],
      max: i === xValues.length ? 11 : xValues[i],
      includeLeft: false,
      includeRight: false,
      leftArrow: true,
      rightArrow: true,
      classes: 'f',
      leftCircle: false,
      rightCircle: false,
      type: "asymptotic"
    }

    functions[i] = curr;
  }

  // set all other question stuff
  const ans = "dne";
  const type = 'math';

  // random x value to ask about
  const val = xValues[getRandomNumber(0, xValues.length - 1)];

  const question = <div className="flex vertical center medium-gap">
    <div className="flex vertical center">
      <h2>Evaluate the limit.</h2>
      <div>Enter "dne" if the limit doesn't exist.</div>
    </div>
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <AsymptoticGraph functions={functions} size={GRAPH_SIZE} x={xValues} y={[verticalShift]} />
  </div>

  const nextToInput = <span>
    <Latex classes="bold" expression={`\\lim_{x \\to ${val}} g(x)`} inline={true} /> =
  </span>

  const hints = [
    <div>
      Focus on <Latex expression={`x = ${val}`} /> on the graph.
    </div>,
    <>
      <div>
        Recall that there are 3 cases when a limit doesn't exist:
      </div>
      <div>
        <ol className="start">
          <li>
            When the limit from the left does not equal the right.
          </li>
          <li>
            When the graph is approaching positive or negative infinity at the point.
          </li>
          <li>
            When the graph is oscillating at the point.
          </li>
        </ol>
      </div>
    </>,
    <>
      <div>
        In this case, it is clear that the graph is approaching positive or negative infinity at <Latex expression={`x = ${val}`} />. Thus, the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        dne
      </div>
    </>
  ]

  return { question, ans, type, nextToInput, hints }
}

/**
 * generates random question that shows a graph of multiple functions, potentially with a jump.
 * Asks users to find limit from left, right, or both sides of a random point in graph
 * @returns question, answer, text next to input, hints
 */
const jumpGraphQuestion = (): any => {
  const numFunctions = getRandomNumber(2, 3); // number of functions in graph
  const xValues: number[] = []; // xvalues where there is a potential jump
  const exclusions: number[] = []; // xvalues that should not be a jump

  // generate random xvalues
  for (let i = 1; i < numFunctions; i++) {
    const num = getRandomWithExclusions(-8, 8, exclusions);
    xValues[i - 1] = num;
    exclusions.push(num - 2, num - 1, num, num + 1, num + 2) // exclude xvalue and +- 2
  }

  // sort xvalues in ascending order
  xValues.sort((a, b) => a - b);

  const possibleXs = [...xValues]; // possiblexs that can be asked about

  const functions = [];

  // min/max variables of each function in function array
  let min = -11;
  let max = xValues[0] ? xValues[0] : 11;

  // generate functions array
  for (let i = 0; i < numFunctions; i++) {
    let x = null;
    let node;

    if (i === 0) {
      // left most function
      x = xValues[i] !== undefined ? xValues[i] : getRandomNumber(-8, 8);
      node = generateRandomPolynomialWithPoint(
        getRandomNumber(1, 4), x, getRandomNumber(-7, 7)) // graph with point at right x value
    } else if (i === numFunctions - 1) {
      // right most function
      x = xValues[i - 1]
      node = generateRandomPolynomialWithPoint(
        getRandomNumber(1, 4), x, getRandomNumber(-7, 7)) // graph with point at left x value
    } else {
      // middle graph
      x = xValues[i];
      const midx = Math.round((xValues[i - 1] + xValues[i]) / 2) // midpoint of function domain

      // points that should be in graph
      const points = [
        { x: xValues[i - 1], y: getRandomNumber(-7, 7) },
        { x: midx, y: getRandomNumber(-7, 7) },
        { x: xValues[i], y: getRandomNumber(-7, 7) }
      ]
      possibleXs.push(midx); // add midx as a potential xvalue to ask about
      node = fitPointsToQuadratic(points) // generate graph that fits to points
    }

    max = xValues[i] !== undefined ? xValues[i] : 11; // update max
    let curr = {
      f: (x: number) => node.evaluate({ x }),
      min,
      max,
      includeLeft: i !== 0 ? !functions[i - 1].includeRight : false, // opposite of prev f right
      includeRight: getRandomNumber(0, 1) === 0, // randomly decide
      leftArrow: i === 0, // arrows on first and last graphs
      rightArrow: i === numFunctions - 1,
      classes: 'f',
      leftCircle: i !== 0, // circle on both sides except first/last graphs which have arrows
      rightCircle: i !== numFunctions - 1
    }

    min = xValues[i]; // update min
    functions[i] = curr;
  }

  const qX = possibleXs[getRandomNumber(0, possibleXs.length - 1)]; // x to ask about
  let ans: number | string;

  // 0: left, 1: right, 2: 2-sided
  const sign = getRandomNumber(0, 2);

  // get correct answer based on xvalue/sign
  for (let i = 0; i < functions.length; i++) {
    if (qX === functions[i].min) {
      // qX on left side of graph, limit from right
      if (sign === 1) {
        ans = Math.round(functions[i].f(functions[i].min));
      }
    } else if (qX === functions[i].max) {
      // qX on right side of graph
      if (sign === 0) {
        // limit from left
        ans = functions[i].f(qX);
      } else if (sign === 2) {
        // limit from both sides
        const currVal = Math.round(functions[i].f(qX));
        const nextVal = Math.round(functions[i + 1].f(qX));
        ans = currVal === nextVal ? currVal : 'dne';
      }
    } else if (qX > functions[i].min && qX < functions[i].max) {
      // qX in the middle
      ans = Math.round(functions[i].f(qX));
    }
  }

  // set all other question stuff
  const type = 'math'
  ans = String(ans);

  const question = <div className="flex vertical center medium-gap">
    <div className="flex vertical center">
      <h2>Evaluate the limit.</h2>
      <div>Enter "dne" if the limit doesn't exist.</div>
    </div>
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={functions} size={GRAPH_SIZE} />
  </div>

  const signText = sign === 0 ? `^{\\footnotesize\\texttt{-}}` : sign === 1 ? `^{\\footnotesize\\texttt{+}}` : ``;

  const nextToInput = <span>
    <Latex classes="bold" expression={`\\lim_{x \\to ${qX + signText}}g(x)`} inline={true} /> =
  </span>

  const hintsAnsComponent = <div className="hint-ans input correct ans">
    {ans}
  </div>

  const hints = [
    <div>
      First, look at the value we are trying to find. Are we interested in the limit from the left, right, or both directions?
    </div>,
    <div>
      In this case, since we {sign === 2 ? "don't" : ""} see a {sign === 2 ? "plus or minus" : sign === 1 ? "plus" : "minus"} sign on the top right of the number <Latex expression="x" /> is approaching, we are interested in the limit from {sign === 2 ? <strong>both sides</strong> : sign === 1 ? <>the <strong>right</strong></> : <>the <strong>left</strong></>}.
    </div>,
    <div>
      Now, focus on <Latex expression={`x = ${qX}`} /> on the graph.
    </div>
  ]

  if (sign === 2) {
    if (ans === "dne") {
      hints.push(
        <div>
          At <Latex expression={`x = ${qX}`} />, is the limit the same from the left and the right side?
        </div>,
        <>
          <div>
            Since the limits aren't the same from both sides, the limit doesn't exist. Thus, the correct answer is:
          </div>
          {hintsAnsComponent}
        </>
      )
    } else {
      hints.push(
        <>
          <div>
            At <Latex expression={`x = ${qX}`} />, we can see the graph approaching <Latex classes="bold" expression={ans} /> from both sides. Thus, the correct answer is:
          </div>
          {hintsAnsComponent}
        </>
      )
    }
  } else {
    hints.push(
      <>
        <div>
          From the {sign === 1 ? "right" : "left"} of <Latex expression={`x = ${qX}`} />, we can see the graph is approaching <Latex classes="bold" expression={ans} />. Thus, the correct answer is:
        </div>
        {hintsAnsComponent}
      </>
    )
  }

  return { question, ans, type, nextToInput, hints }
}

/**
 * generates random question that shows a graph of an oscillating function
 * asks users to find limit where graph is oscillating
 * @returns question, answer, text next to input, hints
 */
const oscillatingGraphQuestion = (): any => {
  // transformation variables
  const horizShift = getRandomNumber(-8, 8);
  const verticalShift = getRandomNumber(-7, 7)
  const f = `(${getRandomWithExclusions(-3, 3, [0])}/${getRandomWithExclusions(-2, 2, [0])})sin(1/(x - ${horizShift})) + ${verticalShift}`

  // set function
  const node = math.parse(f);
  const functions: GraphFunction[] = [{
    f: (x: number) => node.evaluate({ x }),
    min: -11,
    max: 11,
    includeLeft: false,
    includeRight: true,
    leftArrow: true,
    rightArrow: true,
    classes: 'f',
    leftCircle: false,
    rightCircle: false
  }]

  // set all other question stuff
  const question = <div className="flex vertical center medium-gap">
    <div className="flex vertical center">
      <h2>Evaluate the limit.</h2>
      <div>Enter "dne" if the limit doesn't exist.</div>
    </div>
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={functions} size={GRAPH_SIZE} />
  </div>

  const ans = 'dne'
  const type = 'math'

  const nextToInput = <span>
    <Latex classes="bold" expression={`\\lim_{x \\to ${horizShift}} g(x)`} inline={true} /> =
  </span>

  const hints = [
    <div>
      Focus on <Latex expression={`x = ${horizShift}`} /> on the graph.
    </div>,
    <>
      <div>
        Recall that there are 3 cases when a limit doesn't exist:
      </div>
      <div>
        <ol className="start">
          <li>
            When the limit from the left does not equal the right.
          </li>
          <li>
            When the graph is approaching positive or negative infinity at the point.
          </li>
          <li>
            When the graph is oscillating at the point.
          </li>
        </ol>
      </div>
    </>,
    <>
      <div>
        In this case, it is clear that the graph is oscillating at <Latex expression={`x = ${horizShift}`} />. Thus, the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        dne
      </div>
    </>
  ]

  return { question, ans, type, nextToInput, hints }
}

const generateRandomQuestion = (): Question => {
  // determine type of question to generate
  const rand = getRandomNumber(1, 10)
  let q = null;
  if (rand <= 2) {
    q = oscillatingGraphQuestion();
  } else if (rand <= 5) {
    q = asymptoticGraphQuestion();
  } else {
    q = jumpGraphQuestion();
  }

  q.title = <></>

  // set color of graph
  document.documentElement.style.setProperty('--random-color',
    COLORS[getRandomNumber(0, COLORS.length - 1)])

  return q;
}

export default generateRandomQuestion