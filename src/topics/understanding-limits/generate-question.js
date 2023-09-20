import { COLORS } from "../../helpers/constants";
import { generateRandomPolynomial, getRandomNumber, getRandomWithExclusions, generateRandomPolynomialWithPoint, shuffleArray } from "../../helpers/functions";
import Latex from "../../helpers/Latex";
import LimitExampleGraph from "../../components/content-components/graphs/LimitExampleGraph";
import { GRAPH_SIZE } from "../../helpers/constants";

/**
 * generates random question that asks users to select the limit that best matches the graph
 * @returns title, question, options for question type
 */

function graphToLimit() {
  // title for question
  const title = <h2>Which limit best represents the graph?</h2>

  // generate random graph function
  const { node, x } = generateRandomPolynomial(getRandomNumber(1, 4))
  const f = (x) => node.evaluate({ x });
  const realY = Math.round(f(x));

  // generate yval - function undefined, hole, or function continuous at x val
  const yvalNum = getRandomNumber(0, 2);
  let y = null;
  if (yvalNum === 0) {
    y = getRandomNumber(-7, 7);
  } else if (yvalNum === 1) {
    y = realY;
  }

  // question content
  const question = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={` g(x) `} inline={true}></Latex></h3>
    <LimitExampleGraph f={f} xval={x} y={y}
      fColor={"f"} xColor={"x"} yColor={"y"} size={GRAPH_SIZE} />
  </div>

  // generate options
  const o1 = {
    component: <Latex expression={` {\\lim}_{{x \\to ${x}}}{g(x)} = ${realY} `} inline={true} />,
    correct: true
  }

  const o2 = {
    component: null,
    correct: false
  }

  let ex = "";
  const o2Num = getRandomNumber(0, 1);
  if (o2Num === 0 && yvalNum === 0 && y !== realY) {
    ex = `{\\lim}_{{x \\to ${x}}}{g(x)} = ${y}`;
  } else if (x !== realY) {
    ex = `{\\lim}_{{x \\to ${realY}}}{g(x)} = ${x}`;
  } else {
    const rand = getRandomWithExclusions(-7, 7, [realY])
    ex = `{\\lim}_{{x \\to ${x}}}{g(x)} = ${rand}`;
  }
  o2.component = <Latex expression={` ${ex} `} inline={true} />

  const input = shuffleArray([o1, o2]);
  const type = 'mc'

  const hints1 = <div>Recall the definition of a limit:
    <Latex expression={`\\ {\\lim}`} inline={true} />
    <Latex expression={`_{x \\to a}`} inline={true} />
    <Latex expression={`f(x)`} inline={true} />
    <Latex expression={`\\ =\\ `} inline={true} />
    <Latex expression={`\\ L `} inline={true} />
  </div>


  const hints2 = <div>In this graph, what is <Latex expression={`x`} inline={true}/> approaching? What is <Latex expression={`y`} inline={true}/> approaching?</div>

  const hints = [hints1, hints2];

  return { title, question, input, type, hints }
}

/**
 * generates random question that asks users to select the graph that best matches the limit
 * @returns title, question, options for question type
 */
function limitToGraph() {
  // title for question
  const title = <h2>Which graph best represents the limit?</h2>

  // random graph function
  const g1 = generateRandomPolynomial(getRandomNumber(1, 4));
  const node1 = g1.node;
  const x1 = g1.x;
  const f1 = x => node1.evaluate({ x });
  const realY1 = Math.round(f1(x1));

  // generate yval
  let yvalNum = getRandomNumber(0, 2);
  let y1 = null;
  if (yvalNum === 0) {
    y1 = getRandomNumber(-7, 7);
  } else if (yvalNum === 1) {
    y1 = realY1;
  }

  const question =
    <Latex expression={` {\\lim}_{{x \\to ${x1}}}{g(x)} = ${realY1} `} inline={true} />

  // generate options
  const o1 = {
    component: <div className="flex vertical center medium-gap">
      <h3>Graph of <Latex expression={` g(x) `} inline={true} /></h3>
      <LimitExampleGraph f={f1} xval={x1} y={y1} fColor={"f"} xColor={"x"} yColor={"y"} size={GRAPH_SIZE} />
    </div>,
    correct: true
  }

  let x2 = realY1;
  let y2 = x1;

  if (x2 === y2) {
    const n = getRandomNumber(0, 1);
    if (n === 0) {
      x2 = getRandomWithExclusions(-7, 7, [x2, -1, 0, 1]);
    } else {
      y2 = getRandomWithExclusions(-7, 7, [y2, -1, 0, 1]);
    }
  }

  const g2 = generateRandomPolynomialWithPoint(getRandomNumber(1, 4), x2, y2);
  const f2 = x => g2.evaluate({ x });

  const o2 = {
    component: <div className="flex vertical center medium-gap">
      <h3>Graph of <Latex expression={` g(x) `} inline={true} /></h3>
      <LimitExampleGraph f={f2} xval={x2} y={y2} fColor={"f"} xColor={"x"} yColor={"y"} size={GRAPH_SIZE} />
    </div>,
    correct: false
  }

  const input = shuffleArray([o1, o2]);
  const type = 'mc'

  const hints1 = <div>Recall the definition of a limit:
    <Latex expression={`\\ {\\lim}`} inline={true} />
    <Latex expression={`_{x \\to a}`} inline={true} />
    <Latex expression={`f(x)`} inline={true} />
    <Latex expression={`\\ =\\ `} inline={true} />
    <Latex expression={`\\ L `} inline={true} />
  </div>


  const hints2 = <div>Which graph accurately shows the correct <Latex expression={`x`} inline={true}/> value approaching the correct <Latex expression={`y`} inline={true}/> value?</div>

  const hints = [hints1, hints2];

  return { title, question, input, type, hints }
}

function generateRandomQuestion() {
  // determine type of question to generate
  const rand = getRandomNumber(0, 1);
  let q = null;
  if (rand === 0) {
    q = graphToLimit();
  } else {
    q = limitToGraph();
  }
  document.documentElement.style.setProperty('--random-color',
    COLORS[getRandomNumber(0, COLORS.length - 1)])
  return q;
}

export default generateRandomQuestion;