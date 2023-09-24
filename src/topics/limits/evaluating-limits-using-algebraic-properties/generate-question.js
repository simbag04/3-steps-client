import { FunctionTable } from "../../../components/content-components/tables/FunctionTable";
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph";
import { generateLimitPropertyTerm, generateRandomPolynomialWithPoint } from "../../../helpers/expression-generators";
import { convertArrayToObject, generateLimitTableData, generateOrderedValues, getRandomNumber, getRandomWithExclusions } from "../../../helpers/functions";
import Latex from "../../../helpers/Latex";
import * as math from "mathjs"
import { GRAPH_SIZE, COLORS } from "../../../helpers/constants";

function limitPropertyQuestion() {
  const functions = [];
  const xVal = getRandomWithExclusions(-9, 9, [-1, 0, 1]);
  const tableValues = generateOrderedValues(5, getRandomNumber(0, 1));
  const { data } = generateLimitTableData(xVal, tableValues, xVal - 2, xVal + 2);
  const table = <FunctionTable xTitle={'x'} yTitle={'f(x)'} data={data} />

  functions.push({ f: 'x', value: tableValues[2] });

  const graphFunction = generateRandomPolynomialWithPoint(3, xVal, getRandomWithExclusions(-7, 7, [-1, 0, 1]));

  let f = [{
    f: x => graphFunction.evaluate({ x }),
    min: -11,
    max: 11,
    includeLeft: false,
    includeRight: false,
    leftArrow: true,
    rightArrow: true,
    classes: 'f',
    leftCircle: false,
    rightCircle: false
  }]

  const graph = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={f} size={GRAPH_SIZE} />
  </div>

  functions.push({ f: 'y', value: Math.round(graphFunction.evaluate({ x: xVal })) });

  const question = <div className="flex vertical center medium-gap">
    {table}
    {graph}
  </div>

  let expression = generateLimitPropertyTerm(functions, ['^', '+', '-', '*', '/']);
  const ans = String(math.evaluate(expression, convertArrayToObject(functions)));
  expression = math.simplifyCore(expression).toTex({ parenthesis: 'auto' });
  expression = expression.replaceAll('x', 'f(x)')
  expression = expression.replaceAll('y', 'g(x)')
  expression = expression.replaceAll('~', '')
  expression = expression.replaceAll("~{ ", "{")

  const title = <>
    <h2>Evaluate the limit using the figures provided. </h2>
  </>

  const nextToInput = <Latex expression={`\\lim_{x \\to ${xVal}}\\left[${expression}\\right] = `} display={true} />

  return { question, title, ans, type: 'frq', nextToInput }

}

function generateRandomQuestion() {
  // set color of graph
  document.documentElement.style.setProperty('--random-color',
    COLORS[getRandomNumber(0, COLORS.length - 1)])

  return limitPropertyQuestion();
}

export default generateRandomQuestion