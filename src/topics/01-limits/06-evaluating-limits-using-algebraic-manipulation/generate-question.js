import * as math from "mathjs";
import Latex from "../../../components/latex/Latex";
import { getPolynomialFunction } from "../../../helpers/expression-generators";
import { formatPolynomialToLatex, getRandomNumber, getRandomWithExclusions, getStringFactorFromXval, nerdamerFormatToLatex, sortPolynomialByDegree } from "../../../helpers/functions";

const nerdamer = require("nerdamer/all.min")

// helpful constants for trig questions
const normalTrig = ["sin(x)", "cos(x)"]
const otherTrig = [["csc(x)", "sec(x)"], ["cot(x)", "tan(x)"]]
const xvals = [["0", "pi"], ["pi/2", "3pi/2"]];

/**
 * generates random 0/0 limit question involving factoring and removing roots.
 * @returns relevant question components
 */
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
  let modified;
  if (radical) {
    const numeratorWithRoot = getRandomNumber(0, 1); // 0 if numerator has root, 1 if denominator
    // add root to either numerator or denominator
    if (numeratorWithRoot) {
      modified = modifyToMakeRoot(numerator, holeX)
      numerator = formatPolynomialToLatex(`sqrt(${modified.root})${modified.b}`)
      ans = math.simplify(
        `(${topFactor})/((${bottomFactor})(sqrt(${modified.root}) - (${modified.b})))`,
        { x: holeX });
    } else {
      modified = modifyToMakeRoot(denominator, holeX)
      denominator = formatPolynomialToLatex(`sqrt(${modified.root})${modified.b}`)
      ans = math.simplify( // evaluate ans
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

  const expression = `\\lim_{x \\to ${holeX}}\\left(\\frac{${numerator}}{${denominator}}\\right)`

  const nextToInput =
    <Latex expression={`${expression} = `} display={true} />

  const hints = [
    <div>
      First, evaluate the limit: <Latex expression={expression} /> with direct substitution. Do you get <Latex expression={`\\frac{0}{0}`} /> ?
    </div>
  ]
  if (radical) {
    hints.push(
      <div>
        This is a question with a radical, so the first thing we should do is get rid of the radical! We can rewrite the radical as <Latex expression={`${formatPolynomialToLatex(`sqrt(${modified.root})`)} + (${formatPolynomialToLatex(`${modified.b}`)})`} />, which gives us an expression in the form <Latex expression={`a + b`} />
      </div>
    )
    hints.push(
      <div>
        Remember <Latex expression={`(a + b)(a - b) = a^2 - b^2`} />? We can multiply top and bottom by <Latex expression={`(a - b)`} />, and that will remove the radical!
      </div>
    )
    hints.push(
      <div>
        Try evaluating the limit again. Do you still get <Latex expression={`\\frac{0}{0}`} />?
      </div>
    )
  }

  hints.push(
    <div>
      That's ok! There is a hole in the function that we need to remove. The next logical step is to factor both the top and bottom of the fraction.
    </div>
  )

  hints.push(
    <div>
      You should see where the hole is coming from now! Cancel these factors, and now try evaluating the limit. What do you get now?
    </div>
  )

  return { type: 'math', ans, nextToInput, hints }
}

/**
 * generates 0/0 limit problems involving trig functions. User is asked to evaluate limit.
 * @returns relevant question components
 */
function limitByTrig() {
  const topVar = getRandomNumber(0, 1); // what the top is (cos^2x or sin^2x)
  const bottomVar = !topVar ? 1 : 0;
  const toExpand = getRandomNumber(0, 1); // whether top should be in 1 - form or just trig^2
  let ans = 0;
  let numerator;

  const plus = getRandomNumber(0, 1); // whether factor is 1 + [trig] or 1 - trig
  let denominator = `1 ${plus ? '+' : '-'} ${normalTrig[bottomVar]}`
  let xVal = math.parse(xvals[topVar][plus]).toTex(); // decide xval so top/bottom are 0/0

  // constants to multiply by
  const nconstant = getRandomWithExclusions(-4, 4, [0]);
  const dconstant = getRandomWithExclusions(-4, 4, [0]);

  let toMultiply;
  let first;
  if (toExpand) { // numerator will be 1 - bottomVar^2
    toMultiply = getRandomNumber(0, 1); // multiply inverses or tans
    first = otherTrig[toMultiply][bottomVar] // pick something that cancels with bottomvar
    if (toMultiply) { // multiplying tans
      numerator = `(${makeSquaredForLatex(first)} - 
      ${makeSquaredForLatex(normalTrig[topVar])})`;
      ans = 0;
    } else {
      numerator = `(${makeSquaredForLatex(first)} - 1)`;
      ans = 2;
    }
  } else {
    numerator = `${makeSquaredForLatex(normalTrig[topVar])}` // no change as top will be trig^2
    ans = 2
  }

  // format numerator/denominator
  numerator = nerdamer(`${nconstant}(${numerator})`).expand();
  numerator = nerdamerFormatToLatex(numerator);
  denominator = nerdamer(`${dconstant}(${denominator})`).expand();
  denominator = nerdamerFormatToLatex(denominator);

  // fix ans
  ans = math.simplify(`${nconstant}(${ans})/${dconstant}`).toString()

  const expression = `\\lim_{x \\to ${xVal}} 
  \\left(\\frac{${numerator}}{${denominator}}\\right)`

  const nextToInput =
    <Latex expression={`${expression} = `} display={true} />

  // generate hints
  const hints = [
    <div>
      First, evaluate the limit: <Latex expression={expression} /> with direct substitution. Do you get <Latex expression={`\\frac{0}{0}`} /> ?
    </div>
  ]

  if (toExpand) {
    hints.push(
      <div>
        Try factoring out <Latex expression={nerdamerFormatToLatex(makeSquaredForLatex(first))} /> on the top.
      </div>
    )
  } else {
    hints.push(
      <div>
        Remember <Latex expression={`sin^2(x) + cos^2(x) = 1`} />? How can we use that to rewrite the top?
      </div>
    )
  }

  hints.push(
    <div>
      Can you factor the numerator now, and cancel a factor from top and bottom? Once you do that, try evaluating the limit again!
    </div>
  )

  return { nextToInput, type: 'math', ans, hints }
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

/**
 * @param {String} trigFunction like "sin(x)"
 * @returns squared notation, ex. sin^2(x)
 */
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