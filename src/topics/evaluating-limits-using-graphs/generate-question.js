// asymptotic graph
// jump graph (multiple jumps, limits at different points, limits from left, limits from right)
// oscillating graphs

import Latex from "../../helpers/Latex";
import { getRandomNumber, getRandomWithExclusions } from "../../helpers/functions";
import * as math from 'mathjs'
import AsymptoticGraph from "./AsymptoticGraph";
import { COLORS } from "../../helpers/constants";

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

  const input = [];
  const type = 'mc';
  const val = xValues[getRandomNumber(0, xValues.length - 1)];

  const question = <div className="flex vertical center medium-gap">
    <Latex expression={`\\lim_{x \\to ${val}} g(x)`} inline={true}/>
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <AsymptoticGraph functions={functions} size={400} x={xValues} y={[verticalShift]} />
  </div>

  return { question, input, type }

}

function jumpGraphQuestion() {

}

function oscillatingGraphQuestion() {

}

function generateRandomQuestion() {
  // determine type of question to generate
  const rand = 0
  let q = null;
  if (rand === 0) {
    q = asymptoticGraphQuestion();
  }
  q.title = <h2>Evaluate the limit.</h2>
  document.documentElement.style.setProperty('--random-color',
    COLORS[getRandomNumber(0, COLORS.length - 1)])

  return q;
}

export default generateRandomQuestion