import * as math from "mathjs";
import Latex from "../../../components/latex/Latex";
import { getPolynomialFunction, generateSpecialTrig } from "../../../helpers/expression-generators";
import { formatPolynomialToLatex, getRandomNumber, getRandomWithExclusions, getStringFactorFromXval, nerdamerFormatToLatex, sortPolynomialByDegree } from "../../../helpers/functions";
import React from "react"
import { Question } from "../../../@types/Question"

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
  let originalNumerator: string =
    sortPolynomialByDegree(nerdamer(`${holeFactor}(${topFactor})`).expand());
  let denominator: string =
    sortPolynomialByDegree(nerdamer(`${holeFactor}(${bottomFactor})`).expand());
  let originalDenominator: string =
    sortPolynomialByDegree(nerdamer(`${holeFactor}(${bottomFactor})`).expand());

  // evaluate ans
  let ans: any = 0;
  let radical = getRandomNumber(0, 1);
  let modified: any = null;
  const numeratorWithRoot: number =
    getRandomNumber(0, 1); // 0 if numerator has root, 1 if denominator
  if (radical) {
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
    <>
      <div>
        First, evaluate the limit with direct substitution:
      </div>
      <div>
        <Latex expression={`${expression} = \\frac{0}{0}`} display={true} />
      </div>
    </>,
  ]

  const tempRadical = modified ? `(\\sqrt{${modified.root}} - (${formatPolynomialToLatex(modified.b)}))` : ''
  if (radical) {
    hints.push(
      <>
        <div>
          This is a question with a radical, so the first thing we should do is get rid of the radical! We can rewrite the radical as
        </div>
        <div>
          <Latex expression={`${formatPolynomialToLatex(`sqrt(${modified.root})`)} + (${formatPolynomialToLatex(`${modified.b}`)})`} display={true} />
        </div>
        <div>
          This gives us an expression in the form <Latex expression={`a + b`} />.
        </div>
      </>


    )
    hints.push(
      <>
        <div>
          Remember <Latex expression={`(a + b)(a - b) = a^2 - b^2`} />? We can multiply top and bottom by <Latex expression={`(a - b)`} /> and simplify. This should give you:
        </div>
        <div>
          <Latex expression={`\\lim_{x \\to ${holeX}}\\frac{(${originalNumerator})${!numeratorWithRoot ? tempRadical : ''}}{(${originalDenominator})${numeratorWithRoot ? tempRadical : ''}}`} display={true} />
        </div>
      </>
    )
    hints.push(
      <div>
        However, try evaluating the limit again, and you will still get <Latex expression={`\\frac{0}{0}`} />.
      </div>
    )
  }

  hints.push(
    <div>
      Next, try factoring the top and bottom to see if we can cancel any factors.
    </div>,
    <>
      <div>
        This should give you:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${holeX}}\\frac{${holeFactor}(${formatPolynomialToLatex(topFactor)})${!numeratorWithRoot ? tempRadical : ''}}{${holeFactor}(${formatPolynomialToLatex(bottomFactor)})${numeratorWithRoot ? tempRadical : ''}}`} display={true} />
      </div>
    </>
  )

  hints.push(
    <div>
      Now we see that <Latex expression={holeFactor} /> is on the top and bottom! Cancel this, and evaluate the limit again.
    </div>,
    <>
      <div>
        Evaluating again, you will find that the correct answer is{ans === "dne" ? " a number over 0, which means" : ''}:
      </div>
      <div className="hint-ans input correct ans">
        {ans}
      </div>
    </>
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
  let latexNumerator: string = ""

  const plus = getRandomNumber(0, 1); // whether factor is 1 + [trig] or 1 - trig
  let denominator: string = `1 ${plus ? '+' : '-'} ${normalTrig[bottomVar]}`
  let latexDenominator: string = `1 ${plus ? '+' : '-'} \\${normalTrig[bottomVar]}`
  const otherDenominator: string = `1 ${plus ? '-' : '+'} \\${normalTrig[bottomVar]}`

  // decide xval so top/bottom are 0/0
  let xVal: string = math.parse(xvals[topVar][plus]).toTex().replaceAll('~', "");

  // constants to multiply by
  const nconstant = getRandomWithExclusions(-4, 4, [-1, 0, 1]);
  const dconstant = getRandomWithExclusions(-4, 4, [-1, 0, 1]);

  let toMultiply: number;
  let first: string;
  if (toExpand) { // numerator will be 1 - bottomVar^2
    toMultiply = getRandomNumber(0, 1); // multiply inverses or tans
    first = otherTrig[toMultiply][bottomVar] // pick something that cancels with bottomvar
    if (toMultiply) { // multiplying tans
      numerator = `(${makeSquaredForLatex(first)} - 
      ${makeSquaredForLatex(normalTrig[topVar])})`;
      latexNumerator = `(\\${makeSquaredForLatex(first)} - 
      \\${makeSquaredForLatex(normalTrig[topVar])})`;
      ans = 0;
    } else {
      numerator = `(${makeSquaredForLatex(first)} - 1)`;
      latexNumerator = `(\\${makeSquaredForLatex(first)} - 1)`;
      ans = 2;
    }
  } else {
    numerator = `${makeSquaredForLatex(normalTrig[topVar])}` // no change as top will be trig^2
    latexNumerator = `\\${makeSquaredForLatex(normalTrig[topVar])}`
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
    <>
      <div>
        First, evaluate the limit with direct substitution:
      </div>
      <div>
        <Latex expression={`${expression} = \\frac{0}{0}`} display={true} />
      </div>
    </>,
  ]

  let numeratorPrefix = ""
  const limText = `\\lim_{x \\to ${xVal}}`
  if (toExpand) {
    hints.push(
      <>
        <div>
          In order to make things more convenient, first factor out the constants on the top and bottom:
        </div>
        <div>
          <Latex expression={`${expression} = ${limText} 
          \\left(\\frac{${nconstant}${latexNumerator}}{${dconstant}(${latexDenominator})}\\right)`} display={true} />
        </div>
      </>,
      <>
        <div>
          Now, focus on the numerator. Rewrite it with <Latex expression={`\\sin`} /> and <Latex expression={`\\cos`} />.
        </div>
        <div>
          We want to somehow get the expression into <Latex expression={`1 - \\${makeSquaredForLatex(normalTrig[bottomVar])}`} />.
        </div>

      </>,
      <>
        <div>
          In order to do this, we can factor out <Latex expression={nerdamerFormatToLatex(makeSquaredForLatex(first))} /> on the top. This should give you:
        </div>
        <div>
          <Latex expression={`${limText} 
          \\left(\\frac{${nconstant}${latexNumerator}}{${dconstant}(${latexDenominator})}\\right) = ${limText} \\left(\\frac{${`${nconstant}${nerdamerFormatToLatex(makeSquaredForLatex(first))}(1 - \\${makeSquaredForLatex(normalTrig[1 - topVar])})}`}{${dconstant}(${latexDenominator})}\\right)`} display={true} />
        </div>
      </>,
      <>
        <div>
          Now, we can factor the numerator:
        </div>
        <div>
          <Latex expression={`${limText} \\left(\\frac{${`${nconstant}${nerdamerFormatToLatex(makeSquaredForLatex(first))}(1 - \\${makeSquaredForLatex(normalTrig[1 - topVar])})}`}{${dconstant}(${latexDenominator})}\\right) = 
          ${limText} \\left(\\frac{${nconstant}${nerdamerFormatToLatex(makeSquaredForLatex(first))}(1 - \\${normalTrig[1 - topVar]})(1 + \\${normalTrig[1 - topVar]})}{${dconstant}(${latexDenominator})}\\right)`} display={true} />
        </div>
      </>
    )
    numeratorPrefix = `${nconstant}${nerdamerFormatToLatex(makeSquaredForLatex(first))}`
  } else {
    hints.push(
      <>
        <div>
          Remember, we can use <Latex expression={`\\sin^2(x) + \\cos^2(x) = 1`} /> to rewrite the top like this:
        </div>
        <div>
          <Latex expression={`${expression} = ${limText} \\left(\\frac{${nconstant}(1 - \\${makeSquaredForLatex(normalTrig[1 - topVar])})}{${dconstant}(${latexDenominator})}\\right)`} display={true} />
        </div>
      </>,
      <>
        <div>
          Now, we can factor the numerator:
        </div>
        <div>
          <Latex expression={`${limText} \\left(\\frac{${nconstant}(1 - \\${makeSquaredForLatex(normalTrig[1 - topVar])})}{${dconstant}(${latexDenominator})}\\right) = 
          ${limText} \\left(\\frac{${nconstant}(1 - \\${normalTrig[1 - topVar]})(1 + \\${normalTrig[1 - topVar]})}{${dconstant}(${latexDenominator})}\\right)`} display={true} />
        </div>
      </>
    )
    numeratorPrefix = `${nconstant}`
  }

  hints.push(
    <>
      <div>
        Now, we can cancel out the factors on the numerator and denominator to get:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to ${xVal}} \\left(\\frac{${numeratorPrefix}(${otherDenominator})}{${dconstant}}\\right)`} display={true} />
      </div>
    </>,
    <>
      <div>
        Lastly, evaluating the limit, the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        {ans}
      </div>
    </>
  )

  return { nextToInput, type: 'math', ans, hints }
}

const limitByTrigSpecialCases = (): any => {
  const numeratorDegree: number = getRandomNumber(1, 2); // total degree for numerator
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

  // generate terms based on degree
  let obj = generateSpecialTrig(numeratorDegree, multipliedAns, false)
  numerator = obj.term
  multipliedAns = obj.multipliedAns
  const numeratorFunctions = obj.functions

  obj = generateSpecialTrig(denDegree, multipliedAns, true)
  denominator = obj.term
  multipliedAns = obj.multipliedAns
  const denominatorFunctions = obj.functions

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

  hints.push(
    <>
      <div>
        Evaluating this with direct substitution, you should get
      </div>
      <div>
        <Latex expression={`${expression} = \\frac{0}{0}`} display={true} />
      </div>
    </>,
    <>
      <div>
        In order to solve this problem, we need to use these special trig limits:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\lim_{x \\to 0} \\frac{x}{\\sin x} = 1, \\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 1?`} display={true} />
      </div>
    </>,
    <>
      <div>
        Remember that we can always multiply the fraction by things equivalent to <Latex expression="1" /> (ex. <Latex expression={`\\frac{2x}{2x}`} />) to simplify the limit.
      </div>
      <div>
        To do this problem, we will examine each term and try to simplify it with the limits above.
      </div>
    </>
  )

  let oldNumerator = numerator
  let oldDenominator = denominator
  for (let i = 0; i < numeratorFunctions.length; i++) {
    let toMultiply = ''
    const termToMultiply = `${numeratorFunctions[i].coeff > 1 ? numeratorFunctions[i].coeff : ''}x`

    for (let j = 0; j < numeratorFunctions[i].exp; j++) {
      toMultiply += `(${termToMultiply})`
    }

    let newNumerator = oldNumerator.replace(numeratorFunctions[i].term, '')

    hints.push(
      <>
        <div>
          Let's focus on <Latex expression={numeratorFunctions[i].term} /> on the top.
        </div>
        {numeratorFunctions[i].exp > 1 ?
          <div>
            Since this term has an exponent of <strong>{numeratorFunctions[i].exp}</strong>, we need to have <strong>{numeratorFunctions[i].exp}</strong> terms that are <Latex expression={`${numeratorFunctions[i].coeff}x`} /> on the bottom.
          </div> :
          <div>
            In order to use our special limit properties, we need <Latex expression={`${termToMultiply}`} /> on the bottom.
          </div>}
      </>,
      <>
        <div>
          Thus, our new expression becomes:
        </div>
        <div>
          <Latex expression={`\\lim_{x \\to 0} \\left(\\frac{${oldNumerator}}{${oldDenominator}}\\right) = \\lim_{x \\to 0} \\left(\\frac{${toMultiply + oldNumerator}}{${toMultiply + oldDenominator}}\\right)`} display={true} />
        </div>
      </>,
      <>
        <div>
          Now, we can simplify <Latex expression={numeratorFunctions[i].term} /> on the top with <Latex expression={`${termToMultiply}`} /> on the bottom. This gives us:
        </div>
        <div>
          <Latex expression={`\\lim_{x \\to 0} \\left(\\frac{${toMultiply + oldNumerator}}{${toMultiply + oldDenominator}}\\right) = \\lim_{x \\to 0} \\left(\\frac{${toMultiply + newNumerator}}{${oldDenominator}}\\right)`} display={true} />
        </div>
      </>
    )

    oldNumerator = toMultiply + newNumerator
  }

  let bottomMultiply = ''
  for (let i = 0; i < denominatorFunctions.length; i++) {
    let toMultiply = ''
    const termToMultiply = `${denominatorFunctions[i].coeff > 1 ? denominatorFunctions[i].coeff : ''}x`

    for (let j = 0; j < denominatorFunctions[i].exp; j++) {
      toMultiply += `(${termToMultiply})`
    }
    bottomMultiply += toMultiply
  }

  hints.push(<>
    <div>
      Applying a very similar process to the bottom, you should get the expression to be:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to ${0}}\\left(\\frac{${oldNumerator}}{${bottomMultiply}}\\right)`} display={true} />
    </div>
  </>)

  hints.push(
    <>
      <div>
        Simplifying this and evaluating the limit, the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        {ans}
      </div>
    </>
  )

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