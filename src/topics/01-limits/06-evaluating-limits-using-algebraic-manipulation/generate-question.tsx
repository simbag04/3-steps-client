import * as math from "mathjs";
import Latex from "../../../components/latex/Latex";
import { getPolynomialFunction } from "../../../helpers/expression-generators";
import { formatPolynomialToLatex, getRandomNumber, getRandomWithExclusions, getStringFactorFromXval, nerdamerFormatToLatex, sortPolynomialByDegree } from "../../../helpers/functions"; 
import React from "react"
import { Question } from "../../../types/Question"

const nerdamer = require("nerdamer/all.min")

// helpful constants for trig questions
const normalTrig = ["sin(x)", "cos(x)"]
const otherTrig = [["csc(x)", "sec(x)"], ["cot(x)", "tan(x)"]]
const xvals = [["0", "pi"], ["pi/2", "3pi/2"]];

/**
 * generates random 0/0 limit question involving factoring and removing roots.
 * @returns relevant question components
 */
const limitByFactoring = () => {
  const holeX: number = getRandomNumber(-5, 5); // xvalue to ask about
  const holeFactor: string = getStringFactorFromXval(holeX); // xval hole factor

  // generate the other factor(s) on top and bottom
  let topFactor: string = getRandomNumber(0, 1) === 0 ? getPolynomialFunction(1) : "1";
  let bottomFactor: string = topFactor;

  // evaluate values for top and bottom factor
  const topValue: number = math.evaluate(topFactor, { x: holeX });
  let bottomValue: number = math.evaluate(bottomFactor, { x: holeX });

  // make sure bottom factor is different from top factor and both top and bottom aren't 0
  while (bottomFactor === topFactor || (topValue === 0 && topValue === bottomValue)) {
    bottomFactor = (getRandomNumber(0, 1) === 0 || topFactor === "1") ? getPolynomialFunction(1) : "1";
    bottomValue = math.evaluate(bottomFactor, { x: holeX });
  }

  // find numerator and denominator for limit function
  let numerator: string = 
    sortPolynomialByDegree(nerdamer(`${holeFactor}(${topFactor})`).expand());
  let denominator: string = 
    sortPolynomialByDegree(nerdamer(`${holeFactor}(${bottomFactor})`).expand());

  // evaluate ans
  let ans: any = 0;
  let radical = getRandomNumber(0, 1);
  let modified: any = null;
  if (radical) {
    const numeratorWithRoot: number = 
      getRandomNumber(0, 1); // 0 if numerator has root, 1 if denominator

    // add root to either numerator or denominator
    if (numeratorWithRoot) {
      modified = modifyToMakeRoot(numerator, holeX)
      numerator = formatPolynomialToLatex(`sqrt(${modified.root})${modified.b}`)
      ans = math.simplify( // evaluate ans
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
    ans = (ans.toString() === "Infinity" || ans.toString() === "-Infinity") 
      ? "dne" : ans.toString();
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

  const expression: string = 
    `\\lim_{x \\to ${holeX}}\\left(\\frac{${numerator}}{${denominator}}\\right)`

  const nextToInput: React.JSX.Element =
    <Latex expression={`${expression} = `} display={true} />

  const hints: React.JSX.Element[] = [
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
const limitByTrig = (): any => {
  const topVar: number = getRandomNumber(0, 1); // what the top is (cos^2x or sin^2x)
  const bottomVar: number = !topVar ? 1 : 0;
  const toExpand: number = getRandomNumber(0, 1); // whether top should be in 1 - form or trig^2
  let ans: any = 0;
  let numerator: string = "";

  const plus = getRandomNumber(0, 1); // whether factor is 1 + [trig] or 1 - trig
  let denominator: string = `1 ${plus ? '+' : '-'} ${normalTrig[bottomVar]}`

  // decide xval so top/bottom are 0/0
  let xVal: string = math.parse(xvals[topVar][plus]).toTex(); 

  // constants to multiply by
  const nconstant = getRandomWithExclusions(-4, 4, [0]);
  const dconstant = getRandomWithExclusions(-4, 4, [0]);

  let toMultiply: number;
  let first: string;
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

  const expression: string = `\\lim_{x \\to ${xVal}} 
  \\left(\\frac{${numerator}}{${denominator}}\\right)`

  const nextToInput: React.JSX.Element =
    <Latex expression={`${expression} = `} display={true} />

  // generate hints
  const hints: React.JSX.Element[] = [
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

const limitByTrigSpecialCases = (): any => {
  const numeratorDegree: number = getRandomNumber(0, 3); // total degree for numerator
  const hints: React.JSX.Element[] = []

  // initialization
  let numerator: string = "1"; 
  let denominator: string = "1";
  let ans = "dne";

  let multipliedAns = "1)/(1"; // expanded ans based on coeffs of problem
  let denDegree = numeratorDegree;
  
  // generate random denominator degree occasionally
  const same = getRandomNumber(0, 9); // whether degree is the same
  if (numeratorDegree === 0 || same < 1) { 
    denDegree = getRandomNumber(1, 3);
  }

  hints.push(
    <div>
      <div>
        Evaluating this with direct substitution, we get <Latex expression={`\\frac{0}{0}`} />. However, this doesn't look like factoring or rationalization. What is another technique that we learned?
      </div>
    </div>
  )

  hints.push(
    <div>
      Remember <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\lim_{x \\to 0} \\frac{x}{\\sin x} = 1, \\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 1?`} display={true} />
    </div>
  )

  hints.push(
    <div>
      In order to use these, rememember that the <Latex expression={`x`} /> in the equations can be anything. Also rememember that we can manipulate the fractions to apply these limits.
    </div>
  )

  hints.push(
    <div>
      For example, we can multiply the fraction by <Latex expression={`\\frac{x}{x}`} /> or <Latex expression={`\\frac{2}{2}`} /> to try to fit the formulas we have!
    </div>
  )

  hints.push(
    <div>
      After simplifying the whole thing, what is left? If there is still an expression left, try using direct substitution, and see if it still gives <Latex expression={`\\frac{0}{0}`} />. If not, you should have an answer! Otherwise, keep simplifying. 
    </div>
  )

  // generate terms based on degree
  let obj = generateSpecialTrig(numeratorDegree, multipliedAns, false)
  numerator = obj.term
  multipliedAns = obj.multipliedAns

  obj = generateSpecialTrig(denDegree, multipliedAns, true)
  denominator = obj.term
  multipliedAns = obj.multipliedAns

  // decide ans
  if (denDegree < numeratorDegree) {
    ans = "0"
  } else if (denDegree > numeratorDegree) {
    ans = "dne"
  } else {
    multipliedAns = "(" + multipliedAns + ")"
    ans = math.simplify(multipliedAns).toString()
  }

  const expression = `\\lim_{x \\to ${0}}\\left(\\frac{${numerator}}{${denominator}}\\right)`

  const nextToInput =
    <Latex expression={`${expression} = `} display={true} />

  return { ans, type: 'math', nextToInput, hints }
}

const generateRandomQuestion = (): Question => {
  // determine type of question to generate
  const rand = getRandomNumber(1, 10);
  let q = null;
  if (rand <= 7) {
    q = limitByFactoring();
  } else if (rand <= 9) {
    q = limitByTrigSpecialCases();
  } else {
    q = limitByTrig()
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
 * Generates one side of the fraction in trig limit problem involving sinx/x, x/sinx, (1 - cos x)/x
 * @param {number} degree of side (ex. 3 could mean x^2 sin x)
 * @param {string} multipliedAns used to keep trace of the current answer in generation process
 * @param {boolean} denominator whether we are generating a denminator (important since we can't have (1 - cos x) in the denominator and denominator will have 1 trig term or 1 poly term and at least another trig term)
 * @returns generated term and updated multipliedAns
 */
const generateSpecialTrig = 
  (degree: number, multipliedAns: string, denominator: boolean): any => {
  let term = "1"; // initialize term
  let exclusions = []; // coeffs that have already been used

  // iterate over degree
  for (let i = 0; i < degree;) {
    // while we are less than degree, generate random term
    const trig = getRandomNumber(0, 9) > 7 || i > 0; // whether term is poly or trig
    const exp = getRandomNumber(1, denominator ? degree - i - 1 : degree - i) // exp of term
    const expText = exp > 1 ? `^${exp}` : "";

    // coeff of x in term, ex. 3 in sin(3x)
    const coeff = getRandomWithExclusions(1, 4, exclusions); 
    const coeffText = coeff !== 1 ? coeff : "";

    exclusions.push(coeff); // update coeff exclusions

    if (trig === true) {
      // update ans
      const add = `(${Math.pow(coeff, exp)})`
      multipliedAns = (denominator ? multipliedAns + add : add + multipliedAns)

      // term to generate
      if (getRandomNumber(0, 1) === 0 || denominator) {
        term += `\\sin${expText}(${coeffText}x)`
      } else {
        term += `(1 - \\cos(${coeffText}x))${expText}`
      }
    } else {
      // poly term
      multipliedAns = denominator ? multipliedAns + `(${coeff})` : `(${coeff})` + multipliedAns 
      term += `${coeffText}x${expText}`
    }
    // increment i by degree that we added
    i += exp;
  }

  // remove beginning 1 from term
  if (term.length > 1) {
    term = term.substring(1)
  }
  return { term, multipliedAns }
}

/**
 * @param {String} trigFunction like "sin(x)"
 * @returns squared notation, ex. sin^2(x)
 */
const makeSquaredForLatex = (trigFunction: string): string => {
  return `${trigFunction.substring(0, 3)}^2${trigFunction.substring(3)}`
}

/**
 * @param {String} expression to modify
 * @param {Number} x value at which root should be 0
 * @returns object containing both root and b value in (a - b)
 */
const modifyToMakeRoot = (expression: string, x: number): any => {
  // generate random linear function
  let b: string = 
    sortPolynomialByDegree(nerdamer(getPolynomialFunction(getRandomNumber(0, 1))).expand())

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