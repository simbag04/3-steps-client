import { FunctionTable } from "../../../components/content-components/tables/FunctionTable";
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph";
import { generateLimitPropertyTerm, generateRandomPolynomialWithPoint } from "../../../helpers/expression-generators";
import { convertArrayToObject, generateLimitTableData, generateOrderedValues, getRandomNumber, getRandomWithExclusions } from "../../../helpers/functions";
import Latex from "../../../components/latex/Latex";
import * as math from "mathjs"
import { GRAPH_SIZE, COLORS } from "../../../helpers/constants";
import { LimitPropertyRules } from "./LimitPropertyRules";
import React from "react";
import { Question } from "../../../@types/Question";
import { GraphFunction } from "../../../@types/GraphFunction";

/**
 * generates random question that presents a table and a graph from which some limits can be evaluated, then generates expression with limit properties and asks user to solve
 */
const limitPropertyQuestion = (): Question => {
  const functions = []; // functions in expression, ex: {f: f(x), value: 2}
  const xVal = getRandomWithExclusions(-9, 9, [-1, 0, 1]); // where to eval limit

  // generate table
  const tableValues = generateOrderedValues(5, Boolean(getRandomNumber(0, 1))); // values in table
  const { data } = generateLimitTableData(xVal, tableValues, xVal - 2, xVal + 2);
  const table = <FunctionTable xTitle={'x'} yTitle={'f(x)'} data={data} />

  // generate graph with point at xVal
  const graphFunction =
    generateRandomPolynomialWithPoint(3, xVal, getRandomWithExclusions(-7, 7, [-1, 0, 1]));

  // function to graph
  let f: GraphFunction[] = [{
    f: (x: number) => graphFunction.evaluate({ x }),
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

  // create graph
  const graph = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={f} size={GRAPH_SIZE} />
  </div>

  // question
  const question = <div className="flex vertical center medium-gap">
    {table}
    {graph}
  </div>

  // populate functions array
  functions.push({ f: 'x', value: tableValues[2] });
  functions.push({ f: 'y', value: Math.round(graphFunction.evaluate({ x: xVal })) });

  // get expression and answer
  let expression = generateLimitPropertyTerm(functions, ['^', '+', '-', '*', '/']);
  const ans = String(Math.round(math.evaluate(expression, convertArrayToObject(functions))));

  // format expression
  expression = math.simplifyCore(expression).toTex({ parenthesis: 'auto' });
  expression = expression.replaceAll('x', 'f(x)')
  expression = expression.replaceAll('y', 'g(x)')
  expression = expression.replaceAll('~', '')
  expression = expression.replaceAll("~{ ", "{")

  // other question info
  const title = <>
    <h2>Evaluate the limit using the figures provided. </h2>
  </>

  const nextToInput = <Latex expression={`\\lim_{x \\to ${xVal}}\\left[${expression}\\right] = `} display={true} />

  // hints
  const hints = [
    <div className="flex vertical center medium-gap">
      <span>First, evaluate <Latex expression={`\\lim_{x \\to ${xVal}} f(x)`} /> using the table and <Latex expression={`\\lim_{x \\to ${xVal}} g(x)`} /> using the graph. </span>
      {table} 
      {graph}
    </div>,
    <div className="flex vertical center medium-gap">
      Now, what is the easiest way to evaluate the limit, knowing the below list of properties? 
      <LimitPropertyRules />
    </div>
  ]
  
  return { question, title, ans, type: 'math', nextToInput, hints }

}

const generateRandomQuestion = (): Question => {
  // set color of graph
  document.documentElement.style.setProperty('--random-color',
    COLORS[getRandomNumber(0, COLORS.length - 1)])

  return limitPropertyQuestion();
}

export default generateRandomQuestion