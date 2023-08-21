import { generateRandomPolynomial, getRandomNumber, getRandomWithExclusions, generateRandomPolynomialWithPoint } from "../../helpers/functions";
import Latex from "../../helpers/Latex";
import LimitExampleGraph from "./LimitExampleGraph";

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
  const question = <div>
    <h3>Graph of <Latex expression={`\\( g(x) \\)`}></Latex></h3>
    <LimitExampleGraph f={f} xval={x} y={y}
      fColor={"f"} xColor={"x"} yColor={"y"} size={400} />
  </div>

  // generate options
  const o1 = {
    component: <Latex expression={`\\( {\\lim}_{{x \\to ${x}}}{g(x)} = ${realY} \\)`} />,
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
  o2.component = <Latex expression={`\\( ${ex} \\)`} />

  const options = [o1, o2];

  return { title, question, options }
}

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
    <Latex expression={`\\( {\\lim}_{{x \\to ${x1}}}{g(x)} = ${realY1} \\)`} />

  // generate options
  const o1 = {
    component: <div>
      <h3>Graph of <Latex expression={`\\( g(x) \\)`} /></h3>
      <LimitExampleGraph f={f1} xval={x1} y={y1} fColor={"f"} xColor={"x"} yColor={"y"} size={300} />
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
    component: <div>
      <h3>Graph of <Latex expression={`\\( g(x) \\)`} /></h3>
      <LimitExampleGraph f={f2} xval={x2} y={y2} fColor={"f"} xColor={"x"} yColor={"y"} size={300} />
    </div>,
    correct: false
  }

  const options = [o1, o2];

  return { title, question, options }
}

export { graphToLimit, limitToGraph }