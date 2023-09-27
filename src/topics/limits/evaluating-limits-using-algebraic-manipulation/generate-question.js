import * as math from "mathjs";
import Latex from "../../../components/latex/Latex";
import { getPolynomialFunction } from "../../../helpers/expression-generators";
import { findLCM, getRandomNumber, getStringFactorFromXval, sortPolynomialByDegree } from "../../../helpers/functions";

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
    // ensure answer is a whole number by multiplying top to evaluate to lcm
    let lcm = findLCM(Math.abs(topValue), Math.abs(bottomValue));
    topFactor = sortPolynomialByDegree(nerdamer(`(${Math.round(lcm / topValue)})(${topFactor})`).expand());
    ans = Math.round(math.evaluate(topFactor, { x: holeX }) / bottomValue);
  }

  // find numerator and denominator for limit function
  let numerator = sortPolynomialByDegree(nerdamer(`${holeFactor}(${topFactor})`).expand());
  numerator = nerdamer(numerator).toTeX().replaceAll(`\\cdot`, '')

  let denominator = sortPolynomialByDegree(nerdamer(`${holeFactor}(${bottomFactor})`).expand());
  denominator = nerdamer(denominator).toTeX().replaceAll(`\\cdot`, '')

  const nextToInput =
    <Latex expression={`\\lim_{x \\to ${holeX}} 
      \\left(\\frac{${numerator}}{${denominator}}\\right)`} />

  return { type: 'frq', ans, nextToInput }
}

function limitByRationalization() {

}

function limitByTrig() {

}

function generateRandomQuestion() {
  // determine type of question to generate
  //const rand = getRandomNumber(1, 10);
  const rand = 2;
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

export default generateRandomQuestion