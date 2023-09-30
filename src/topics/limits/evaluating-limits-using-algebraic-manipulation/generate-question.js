import * as math from "mathjs";
import Latex from "../../../components/latex/Latex";
import { getPolynomialFunction } from "../../../helpers/expression-generators";
import { formatPolynomialToLatex, getRandomNumber, getStringFactorFromXval, sortPolynomialByDegree } from "../../../helpers/functions";

const nerdamer = require("nerdamer/all.min")

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

  // evaluate ans
  let ans;
  if (topValue === 0) {
    ans = 0;
  } else if (bottomValue === 0) {
    ans = 'dne'
  } else {
    ans = math.simplify(`(${topFactor})/${bottomValue}`, { x: holeX }).toString();
  }

  // find numerator and denominator for limit function
  let numerator = sortPolynomialByDegree(nerdamer(`${holeFactor}(${topFactor})`).expand());
  numerator = nerdamer(numerator).toTeX().replaceAll(`\\cdot`, '')

  let denominator = sortPolynomialByDegree(nerdamer(`${holeFactor}(${bottomFactor})`).expand());
  denominator = nerdamer(denominator).toTeX().replaceAll(`\\cdot`, '')

  const nextToInput =
    <Latex expression={`\\lim_{x \\to ${holeX}} 
      \\left(\\frac{${numerator}}{${denominator}}\\right) = `} display={true} />

  return { type: 'math', ans, nextToInput }
}

function limitByRationalization() {
  const holeX = getRandomNumber(-7, 7); // xvalue to ask about
  const numeratorWithRoot = getRandomNumber(0, 1); // 0 if numerator has root, 1 if denominator

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

  // get numerator/denominator
  let numerator = sortPolynomialByDegree(nerdamer(`${holeFactor}(${topFactor})`).expand());
  let denominator = sortPolynomialByDegree(nerdamer(`${holeFactor}(${bottomFactor})`).expand());
  let ans = 0;

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

  const nextToInput =
    <Latex classes={'xl-font'} expression={`\\lim_{x \\to ${holeX}}\\left(\\frac{${numerator}}{${denominator}}\\right) =`} display={true} />

  return { ans, nextToInput, type: 'math' }
}

function limitByTrig() {

}

function generateRandomQuestion() {
  // determine type of question to generate
  const rand = getRandomNumber(1, 8);
  let q = null;
  if (rand <= 3) {
    q = limitByFactoring();
  } else if (rand <= 8) {
    q = limitByRationalization();
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