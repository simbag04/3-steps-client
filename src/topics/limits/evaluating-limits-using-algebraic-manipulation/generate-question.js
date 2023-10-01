import * as math from "mathjs";
import Latex from "../../../components/latex/Latex";
import { getPolynomialFunction } from "../../../helpers/expression-generators";
import { formatPolynomialToLatex, getRandomNumber, getRandomWithExclusions, getStringFactorFromXval, nerdamerFormatToLatex, sortPolynomialByDegree } from "../../../helpers/functions";

const nerdamer = require("nerdamer/all.min")
const normalTrig = ["sin(x)", "cos(x)"]
const otherTrig = [["csc(x)", "sec(x)"], ["cot(x)", "tan(x)"]]
const xvals = [["0", "pi"], ["pi/2", "3pi/2"]];

function limitByFactoring() {
  const holeX = getRandomNumber(-5, 5); // xvalue to ask about
  const holeFactor = getStringFactorFromXval(holeX);

  // generate the other factor(s) on top and bottom
  let topFactor = getRandomNumber(0, 1) === 0 ? getPolynomialFunction(1) : "1";
  let bottomFactor = topFactor;

  // evaluate values for top and bottom factor
  const topValue = math.evaluate(topFactor, { x: holeX });
  let bottomValue = math.evaluate(bottomFactor, { x: holeX });

  // make sure bottom factor is different from top factor and both top and bottom aren't 0
  while (bottomFactor === topFactor || (topValue === 0 && topValue === bottomValue)) {
    bottomFactor = getRandomNumber(0, 1) === 0 || topFactor === "1" ? getPolynomialFunction(1) : "1";
    bottomValue = math.evaluate(bottomFactor, { x: holeX });
  }

  // find numerator and denominator for limit function
  let numerator = sortPolynomialByDegree(nerdamer(`${holeFactor}(${topFactor})`).expand());
  let denominator = sortPolynomialByDegree(nerdamer(`${holeFactor}(${bottomFactor})`).expand());

  // evaluate ans
  let ans = 0;
  let radical = getRandomNumber(0, 1);
  if (radical) {
    const numeratorWithRoot = getRandomNumber(0, 1); // 0 if numerator has root, 1 if denominator
    // add root to either numerator or denominator
    if (numeratorWithRoot) {
      const modified = modifyToMakeRoot(numerator, holeX)
      numerator = formatPolynomialToLatex(`sqrt(${modified.root})${modified.b}`)
      ans = math.simplify(
        `(${topFactor})/((${bottomFactor})(sqrt(${modified.root}) - (${modified.b})))`,
        { x: holeX });
    } else {
      const modified = modifyToMakeRoot(denominator, holeX)
      denominator = formatPolynomialToLatex(`sqrt(${modified.root})${modified.b}`)
      ans = math.simplify(
        `(${topFactor})(sqrt(${modified.root}) - (${modified.b}))/(${bottomFactor})`,
        { x: holeX });
    }

    // fix ans if it should be dne
    ans = ans.toString() === "Infinity" || ans.toString() === "-Infinity" ? "dne" : ans.toString();
  } else {
    if (topValue === 0) {
      ans = 0;
    } else if (bottomValue === 0) {
      ans = 'dne'
    } else {
      ans = math.simplify(`(${topFactor})/${bottomValue}`, { x: holeX }).toString();
    }

    numerator = nerdamer(numerator).toTeX().replaceAll(`\\cdot`, '')
    denominator = nerdamer(denominator).toTeX().replaceAll(`\\cdot`, '')
  }

  const nextToInput =
    <Latex expression={`\\lim_{x \\to ${holeX}} 
      \\left(\\frac{${numerator}}{${denominator}}\\right) = `} display={true} />

  return { type: 'math', ans, nextToInput }
}

function limitByTrig() {
  const topVar = getRandomNumber(0, 1); // what the top is (cos^2x or sin^2x)
  const bottomVar = !topVar ? 1 : 0;
  const toExpand = getRandomNumber(0, 1);
  let ans = 0;
  let numerator;

  const plus = getRandomNumber(0, 1);
  let denominator = `1 ${plus ? '+' : '-'} ${normalTrig[bottomVar]}`
  let xVal = math.parse(xvals[topVar][plus]).toTex();
  const nconstant = getRandomWithExclusions(-4, 4, [0]);
  const dconstant = getRandomWithExclusions(-4, 4, [0]);

  if (toExpand) { // it will be 1 - bottomVar^2
    const toMultiply = getRandomNumber(0, 1); // multiply inverses or tans
    let first = otherTrig[toMultiply][bottomVar] // pick something that cancels with bottomvar
    if (toMultiply) { // multiplying tans
      numerator = `(${makeSquaredForLatex(first)} - 
      ${makeSquaredForLatex(normalTrig[topVar])})`;
      ans = 0;
    } else {
      numerator = `(${makeSquaredForLatex(first)} - 1)`;
      ans = 2;
    }
  } else {
    numerator = `${makeSquaredForLatex(normalTrig[topVar])}`
    ans = 2
  }

  numerator = nerdamer(`${nconstant}${numerator}`).expand();
  numerator = nerdamerFormatToLatex(numerator);
  denominator = nerdamer(`${dconstant}(${denominator})`).expand();
  denominator = nerdamerFormatToLatex(denominator);

  ans = math.simplify(`${nconstant}(${ans})/${dconstant}`).toString()

  const nextToInput =
    <Latex expression={`\\lim_{x \\to ${xVal}} 
      \\left(\\frac{${numerator}}{${denominator}}\\right) = `} display={true} />

  return { nextToInput, type: 'math', ans }
}

function generateRandomQuestion() {
  // determine type of question to generate
  const rand = getRandomNumber(1, 10);
  let q = null;
  if (rand <= 8) {
    q = limitByFactoring();
  } else {
    q = limitByTrig();
  }

  // set title and question as they are the same for everything
  q.title = <></>
  q.question = <div className="flex vertical center">
    <h2>Evaluate the limit.</h2>
    <div>Enter "dne" if the limit doesn't exist</div>
  </div>

  return q;
}

function makeSquaredForLatex(trigFunction) {
  return `${trigFunction.substring(0, 3)}^2${trigFunction.substring(3)}`
}

/**
 * @param {String} expression to modify
 * @param {Number} x value at which root should be 0
 * @returns 
 */
function modifyToMakeRoot(expression, x) {
  // generate random linear function
  let b = sortPolynomialByDegree(nerdamer(getPolynomialFunction(getRandomNumber(0, 1))).expand())

  // make b negative to ensure root evaluates to 0
  if (math.evaluate(b, { x }) > 0) {
    b = sortPolynomialByDegree(nerdamer(`-1(${b})`).expand())
  }

  const node = math.simplify(`${expression} + (${b})^2`); // evaluate node
  return {
    root: sortPolynomialByDegree(nerdamer(`(${node.toString()})`).expand()), // expand and format
    b: b.charAt(0) !== '-' ? `+${b}` : b
  }
}

export default generateRandomQuestion