// asymptotic graph
// jump graph (multiple jumps, limits at different points, limits from left, limits from right)
// oscillating graphs

import Latex from "../../helpers/Latex";
import { fitPointsToQuadratic, generateRandomPolynomialWithPoint, getRandomNumber, getRandomWithExclusions } from "../../helpers/functions";
import * as math from 'mathjs'
import AsymptoticGraph from "./AsymptoticGraph";
import { COLORS } from "../../helpers/constants";
import FunctionGraph from "./FunctionGraph";

function asymptoticGraphQuestion() {
  const randomNumbers = getRandomNumber(1, 2);
  const xValues = [];
  let f = `(${getRandomNumber(0, 1) === 0 ? "-" : ""}1/`;


  for (let i = 0; i < randomNumbers; i++) {
    const num = getRandomWithExclusions(-7, 7, [-1, 0, 1, ...xValues]);
    xValues[i] = num;
    f = f + `(x ${num < 0 ? '+' : '-'} ${Math.abs(num)})`;
  }
  const verticalShift = getRandomNumber(-5, 5)
  f = f + `) ${verticalShift > 0 ? '+' : '-'} ${Math.abs(verticalShift)}`


  xValues.sort((a, b) => a - b);
  const node = math.parse(f);

  // generate functions array
  const functions = [];
  for (let i = 0; i <= xValues.length; i++) {
    let curr = {
      f: x => node.evaluate({ x }),
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

  const ans = "dne";
  const type = 'frq';
  const val = xValues[getRandomNumber(0, xValues.length - 1)];

  const question = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <AsymptoticGraph functions={functions} size={400} x={xValues} y={[verticalShift]} />
  </div>

  const nextToInput = <span>
    <Latex expression={`\\lim_{x \\to ${val}} g(x)`} inline={true} /> =
  </span>

  const hints = [
    <div className="flex vertical center small-gap">
      <span>{nextToInput} ?</span>
      Focus on x = {val} on the graph.
      {question}
    </div>,
    <div>
      What can we say about the limit at a point where the function appears to be boundless?
    </div>
  ]

  return { question, ans, type, nextToInput, hints }

}

function jumpGraphQuestion() {
  const numFunctions = getRandomNumber(2, 3);
  const xValues = [];
  const exclusions = [];

  for (let i = 1; i < numFunctions; i++) {
    const num = getRandomWithExclusions(-8, 8, exclusions);
    xValues[i - 1] = num;
    exclusions.push(num - 2, num - 1, num, num + 1, num + 2)
  }

  xValues.sort((a, b) => a - b);

  const possibleXs = [...xValues];

  const functions = [];
  let min = -11;
  let max = xValues[0] ? xValues[0] : 11;

  // generate functions array
  for (let i = 0; i < numFunctions; i++) {
    let x = null;
    let node;

    if (i === 0) {
      x = xValues[i] !== undefined ? xValues[i] : getRandomNumber(-8, 8);
      node = generateRandomPolynomialWithPoint(
        getRandomNumber(1, 4), x, getRandomNumber(-7, 7))
    } else if (i === numFunctions - 1) {
      x = xValues[i - 1]
      node = generateRandomPolynomialWithPoint(
        getRandomNumber(1, 4), x, getRandomNumber(-7, 7))
    } else {
      x = xValues[i];
      const midx = Math.round((xValues[i - 1] + xValues[i]) / 2)
      const points = [
        { x: xValues[i - 1], y: getRandomNumber(-7, 7) },
        { x: midx, y: getRandomNumber(-7, 7) },
        { x: xValues[i], y: getRandomNumber(-7, 7) }
      ]
      possibleXs.push(midx);
      node = fitPointsToQuadratic(points)
    }

    max = xValues[i] !== undefined ? xValues[i] : 11;
    let curr = {
      f: x => node.evaluate({ x }),
      min,
      max,
      includeLeft: i !== 0 ? !functions[i - 1].includeRight : false,
      includeRight: getRandomNumber(0, 1) === 0,
      leftArrow: i === 0,
      rightArrow: i === numFunctions - 1,
      classes: 'f',
      leftCircle: i !== 0,
      rightCircle: i !== numFunctions - 1
    }

    min = xValues[i];
    functions[i] = curr;
  }

  const qX = possibleXs[getRandomNumber(0, possibleXs.length - 1)];
  let ans;

  // 0: left, 1: right, 2: 2-sided
  const sign = getRandomNumber(0, 2);

  for (let i = 0; i < functions.length; i++) {
    if (qX === functions[i].min) {
      if (sign === 1) {
        ans = Math.round(functions[i].f(functions[i].min));
      }
    } else if (qX === functions[i].max) {
      if (sign === 0) {
        ans = functions[i].f(qX);
      } else if (sign === 2) {
        const currVal = Math.round(functions[i].f(qX));
        const nextVal = Math.round(functions[i + 1].f(qX));
        ans = currVal === nextVal ? currVal : 'dne';
      }
    } else if (qX > functions[i].min && qX < functions[i].max) {
      ans = Math.round(functions[i].f(qX));
    }
  }

  const type = 'frq'
  ans = String(ans);

  const question = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={functions} size={400} />
  </div>

  const signText = sign === 0 ? `^{-}` : sign === 1 ? `^{+}` : ``;

  const nextToInput = <span>
    <Latex expression={`\\lim_{x \\to ${qX + signText}}g(x)`} inline={true} /> =
  </span>

  const hints = [
    <div className="flex vertical center small-gap">
      <span>{nextToInput} ?</span>
      Focus on x = {qX} on the graph.
      {question}
    </div>,
    <div>
      Are we interested in the limit from the left, right, or both directions?
    </div>,
    <div>
      {ans === 'dne' ? "What do we know about limits at point where there is a jump in the graph?" :
        sign === 2 ? `Looking at the graph, what do we know about the asked limit?` :
          "Which sub-function graph should we look at to get our answer?"}
    </div>
  ]

  return { question, ans, type, nextToInput, hints }
}

function oscillatingGraphQuestion() {
  const horizShift = getRandomNumber(-8, 8);
  const verticalShift = getRandomNumber(-7, 7)
  const f = `(${getRandomWithExclusions(-4, 4, [0])}/${getRandomWithExclusions(-2, 2, [0])})sin(1/(x - ${horizShift})) + ${verticalShift}`
  const node = math.parse(f);
  const functions = [{
    f: x => node.evaluate({ x }),
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

  const question = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={functions} size={400} />
  </div>

  const ans = 'dne'
  const type = 'frq'
  const nextToInput = <span>
    <Latex expression={`\\lim_{x \\to ${horizShift}} g(x)`} inline={true} /> =
  </span>

  const hints = [
    <div className="flex vertical center small-gap">
      <span>{nextToInput} ?</span>
      Focus on x = {horizShift} on the graph.
      {question}
    </div>,
    <div>
      What can we say about the limit of a function at a point where the function is oscillating?
    </div>
  ]

  return { question, ans, type, nextToInput, hints }
}

function generateRandomQuestion() {
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

  // set title since it's the same for everything
  q.title = <div className="flex vertical center">
    <h2>Evaluate the limit.</h2>
    <div>Enter "dne" if the limit doesn't exist</div>
  </div>

  document.documentElement.style.setProperty('--random-color',
    COLORS[getRandomNumber(0, COLORS.length - 1)])

  return q;
}

export default generateRandomQuestion