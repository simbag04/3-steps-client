import * as math from 'mathjs'
import { generateFunctionData } from './graph-helpers';
import { getRandomWithExclusions, getRandomNumber, convertArrayToObject, findLCM, convertToDecimal } from './functions';
import { GraphPoint } from '../@types/GraphPoint';
import { FunctionValue } from '../@types/FunctionValue';

/**
 * Compresses polynomial so it fits on 10 by 10 graph
 * @param {string} expression polynomial to compress
 * @param {number} max max (and min) value of local min/max
 * @param {array} values other values that should be within [-max, max]
 * @returns math.js node representing scaled polynomial
 */
const compressPolynomial = (expression: string, max: number, values: number[]): math.MathNode => {
  const node = math.parse(expression);

  /// Makes all values within expression fit in graph range
  // find most extreme value
  let maxabs = Math.max(max, ...values);
  for (let i = -11; i < 11; i += 0.01) {
    maxabs = Math.max(Math.abs(node.evaluate({ x: i })), maxabs);
  }

  // scale to make graph fit
  const scale = Math.ceil(maxabs / max);
  const scaledNode = math.parse(`(1/${scale})(${expression})`);
  return scaledNode;
}

/**
 * modifies expression to have whole number at a point
 * @param {node} node math.js node with current function
 * @returns modified node, x: modified math.js node that has a whole number value at x
 */
const modifyForWholeNumber = (node: math.MathNode): { x: number, node: math.MathNode } => {
  const f = (x: number) => node.evaluate({ x });
  let data = generateFunctionData(f, -11, 11);

  // filter out values where y is > 7 or < -7, x is > 8 or < -8
  data = data.filter(d => Math.abs(d.y) < 7 && Math.abs(d.x) < 8);

  // random x value in domain
  const minx = Math.ceil(data[0].x);
  const maxx = Math.floor(data[data.length - 1].x);

  const x = getRandomWithExclusions(minx, maxx, [-1, 0, 1]);
  const y = f(x);

  // find constant by which to move graph up or down to get integer y
  let move: number;
  if (Math.round(y) < 0) {
    move = Math.min(-2, Math.round(y)) - y; // y must be <= -2
  } else {
    move = Math.max(2, Math.round(y)) - y; // int y must be >= 2
  }

  let expression = `(${node.toString()} + ${move})`
  const modifiedNode = math.parse(expression);
  return { node: modifiedNode, x };
}

/**
 * Generates ready to graph random polynomial function
 * @param {number} degree degree of polynomial to be generated
 * @returns ready to graph polynomial function with integer point at x
 */
const generateRandomPolynomial = (degree: number): { x: number, node: math.MathNode } => {
  const expression = getPolynomialFunction(degree);
  const scaledNode = compressPolynomial(expression, 9, []);
  return modifyForWholeNumber(scaledNode);
}

/**
 * generates random polynomial function with random whole number coefficients 
 * @param {number} degree degree of polynomial to generate
 * @param {boolean} [skipConstant=false] boolean whether to not generate constant 
 * @param {boolean} [guaranteedTermAtDegree=false] whether there must be a term at the specified degree (eg. if degree is 2, there must be an x^2 term)
 * @returns random polynomial function with random coefficients
 */
const getPolynomialFunction = (degree: number,
  skipConstant: boolean = false,
  guaranteedTermAtDegree: boolean = false): string => {

  // generate random coefficients
  const coefficients = [];
  for (let i = 0; i <= degree; i++) {
    if (guaranteedTermAtDegree && degree === i) {
      coefficients.push(getRandomWithExclusions(-5, 5, [0]));
    } else {
      coefficients.push(getRandomNumber(-5, 5));
    }
  }

  // create each term 
  let terms = coefficients.map((coef, exp) => {
    if (exp === 0) {
      if (skipConstant || coef === 0) return "";
      return coef < 0 ? `${coef}` : `+${coef}`;
    } else if (exp === 1) {
      if (coef === 0) return "";
      let t = `${Math.abs(coef) === 1 ? "" : `${Math.abs(coef)}*`}x`
      return coef < 0 ? `-${t}` : `+${t}`;
    } else {
      if (coef === 0) return "";
      let t = `${coef === 1 ? "" : coef === -1 ? "-" : `${Math.abs(coef)}*`}x^${exp}`
      return (coef < 0 || exp === coefficients.length - 1) ? `-${t}` : `+${t}`;
    }
  });

  terms = terms.filter(t => t !== "");

  // join each term
  const expression = terms.reverse().join('').replace(/\s+/g, '');
  if (expression.length < 2) return '(2*x)'; // default if all terms were ""
  return expression;
}

/**
 * generates polynomial with point (not necessarily for a graph)
 * @param {Number} degree of polynomial
 * @param {Number} x value of point
 * @param {Number} y value of point
 * @param {boolean} [guaranteedTermAtDegree=false] whether there must be a term at the specified degree (eg. if degree is 2, there must be an x^2 term)
 * @returns string expression of polynomial
 */
const getPolynomialFunctionWithPoint = (degree: number, x: number, y: number, guaranteedTermAtDegree: boolean = false): string => {
  let expression = getPolynomialFunction(degree, true, guaranteedTermAtDegree);

  // add constant to function to make (x, y) on graph
  let currVal = math.evaluate(expression, { x });
  const diff = y - Math.round(currVal);
  expression = `${expression} ${diff < 0 ? diff : diff > 0 ? `+ ${diff}` : ''}`;
  return expression;
}

/**
 * Generates a random polynomial that passes through a point and fits on 10 by 10 graph
 * @param {number} degree degree of polynomial to generate
 * @param {number} x x value of point
 * @param {number} y y value of point
 * @returns math.js node representing polynomial expression
 */
const generateRandomPolynomialWithPoint = (degree: number, x: number, y: number): math.MathNode => {
  // generate polynomial
  let expression = getPolynomialFunction(degree);
  let node = math.parse(expression);

  // initialize variables
  let max = 9;
  node = compressPolynomial(node.toString(), max, []);
  let yval = node.evaluate({ x });
  let move = y - yval;

  // compress polynomial enough that constant by which graph moves up or down is still within [-10, 10]
  while (Math.abs(move) > 10 - max) {
    max--;
    node = compressPolynomial(node.toString(), max, [Math.abs(yval)]);
    yval = node.evaluate({ x });
    move = y - yval;
  }
  expression = `(${node.toString()} + ${move})`
  const modifiedNode = math.parse(expression);
  return modifiedNode;
}


/**
 * 
 * @param {Array} points array of 3 points ({x, y}) to fit quadratic to
 * @returns math.js node representing polynomial expression
 */
const fitPointsToQuadratic = (points: GraphPoint[]): math.MathNode => {
  // Ensure we have at least 3 points
  if (points.length < 3) {
    console.error('At least 3 points are required for quadratic regression.');
    return null;
  }

  // get points
  const x1 = points[0].x;
  const y1 = points[0].y;
  const x2 = points[1].x;
  const y2 = points[1].y;
  const x3 = points[2].x;
  const y3 = points[2].y;

  // formula
  const det = (x1 - x2) * (x1 - x3) * (x2 - x3);
  const a = ((x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / det);
  const b = ((x3 * x3 * (y1 - y2) + x2 * x2 * (y3 - y1) + x1 * x1 * (y2 - y3)) / det);
  const c = ((x2 * x3 * (x2 - x3) * y1 + x3 * x1 * (x3 - x1) * y2 + x1 * x2 * (x1 - x2) * y3) / det);

  // Return math.js node
  return math.parse(`${a === 0 ? `` : `${a}x^2`} + ${b === 0 ? `` : `${b}x`} + ${c}`)
}

/**
 * 
 * @param {Array} points array of 3 points ({x, y}) to fit quadratic to
 * @returns math.js node representing polynomial expression with fractional coefficients
 */
const fitPointsToQuadraticFractions = (points: GraphPoint[]): math.MathNode => {
  // Ensure we have at least 3 points
  if (points.length < 3) {
    console.error('At least 3 points are required for quadratic regression.');
    return null;
  }

  // get points
  const x1 = points[0].x;
  const y1 = points[0].y;
  const x2 = points[1].x;
  const y2 = points[1].y;
  const x3 = points[2].x;
  const y3 = points[2].y;

  // Calculating coefficients a, b, and c
  const denominatorA = (x1 - x2) * (x1 - x3);
  const denominatorB = (x2 - x1) * (x2 - x3);
  const denominatorC = (x3 - x1) * (x3 - x2);

  const a = math.simplify(`(${y1} / ${denominatorA}) + (${y2} / ${denominatorB}) + (${y3} / ${denominatorC})`).toString();

  const b = math.simplify(`-(
    (${y1 * (x2 + x3)} / ${denominatorA}) +
    (${y2 * (x1 + x3)} / ${denominatorB}) +
    (${y3 * (x1 + x2)} / ${denominatorC})
  )`).toString();

  const c = math.simplify(`(
    (${y1 * x2 * x3} / ${denominatorA}) +
    (${y2 * x1 * x3} / ${denominatorB}) +
    (${y3 * x1 * x2} / ${denominatorC})
  )`).toString();

  // Return math.js node
  return createPolynomialFromCoefficients(a, b, c)
}

/**
 * creates formatted polynomial math.js node from potentially fractional coefficients
 * @param {string} a coefficient of quadratic
 * @param {string} b coefficient of quadratic
 * @param {string} c coefficient of quadratic
 * @returns math.js formatted polynomial node
 */
const createPolynomialFromCoefficients = (a: string, b: string, c: string) => {
  const newA = Number(convertToDecimal(a))
  const newB = Number(convertToDecimal(b))
  const newC = Number(convertToDecimal(c))
  const expression = `${newA === 0 ? `` : `${a}x^2`} 
    ${newB === 0 ? `` : `${newB < 0 ? `${b}` : `+${b}`}x`} 
    ${newC === 0 ? `` : `${newC < 0 ? `${c}` : `+${c}`}`}`

  return math.parse(expression)
}

/**
 * @param {Array} functions: array of variables with their corresponding values to be used in term
 * @param {Array} operators: possible operators, such as '+', '-', etc.
 * @param {Number} depth of equation, i.e. how many levels of nesting in terms
 * @returns random term that uses functions variables and operators
 */
const generateLimitPropertyTerm = (functions: FunctionValue[], operators: string[], depth: number = 2): string => {
  if (depth === 0) {
    // base case
    const coefficient = getRandomNumber(2, 3); // coefficient of variable
    const f = functions[getRandomNumber(0, functions.length - 1)].f // variable
    return `(${coefficient}${f})`;
  } else {
    // recursive case
    const operator = operators[getRandomNumber(0, operators.length - 1)]; // random operator
    let leftOperand = generateLimitPropertyTerm(functions, operators, depth - 1);
    let rightOperand = generateLimitPropertyTerm(functions, operators, depth - 1);

    if (operator === "^") {
      // exponent operator
      const numerator = getRandomNumber(0, 1); // whether this will be a fractional exponent
      if (numerator) {
        // fractional exponent
        // make sure result is whole number
        const val = math.evaluate(leftOperand, convertArrayToObject(functions)); // evaluate
        const root = val < 0 ? 3 : getRandomNumber(2, 3); // odd root if val < 0
        const int = Math.round(math.evaluate(`nthRoot(${val}, ${root})`)); // evaluate what root should be

        // constant to add to make whole number result
        let add = math.evaluate(`${val} - ${int}^${root}`);
        add = add > 0 ? ` - ${add}` : `+ ${Math.abs(add)}`;
        return `nthRoot(${leftOperand}${add}, ${root})`
      }

      // normal power case
      let rightOperand = `${getRandomNumber(2, 3)}`;
      return `(${leftOperand}${operator}${rightOperand})`

    } else if (operator === "/") {
      // ensure whole number result 
      // evaluate operands
      let left = math.evaluate(leftOperand, convertArrayToObject(functions))
      let right = math.evaluate(rightOperand, convertArrayToObject(functions))

      // ensure operands aren't 0. this is to make sure no issues with finding lcm
      if (right === 0) {
        rightOperand = `(${rightOperand} + 1)`; // add 1 if 0
        right = math.evaluate(rightOperand, convertArrayToObject(functions));
      }
      if (left === 0) {
        leftOperand = `(${leftOperand} + 1)`; // add 1 if 0
        left = math.evaluate(leftOperand, convertArrayToObject(functions));
      }

      // find lcm and simplify node
      const lcm = findLCM(left, right);
      const l = math.simplify(`${Math.round(lcm / left)}*${leftOperand}`).toString().replaceAll(" * ", "")

      return `((${l})${operator}${rightOperand})`
    } else {
      // normal operand
      return `(${leftOperand}${operator}${rightOperand})`
    }
  }
}

/**
 * Generates one side of the fraction in trig limit problem involving sinx/x, x/sinx, (1 - cos x)/x
 * @param {number} degree of side (ex. 3 could mean x^2 sin x)
 * @param {string} multipliedAns used to keep trace of the current answer in generation process
 * @param {boolean} denominator whether we are generating a denminator (important since we can't have (1 - cos x) in the denominator and denominator will have 1 trig term or 1 poly term and at least another trig term)
 * @returns generated term and updated multipliedAns
 */
const generateSpecialTrig =
  (degree: number, multipliedAns: string, denominator: boolean): { term: string, multipliedAns: string, functions: Array<any> } => {
    let term = "1"; // initialize term
    let exclusions = []; // coeffs that have already been used
    let functions = []

    // iterate over degree
    for (let i = 0; i < degree;) {
      // while we are less than degree, generate random term
      const trig = getRandomNumber(0, 9) >= 0 || i > 0; // whether term is poly or trig
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
          const t = `\\sin${expText}(${coeffText}x)`
          term += t
          functions.push({ term: t, coeff, exp })
        } else {
          const t = `(1 - \\cos(${coeffText}x))${expText}`
          term += t
          functions.push({ term: t, coeff, exp })
        }
      } else {
        // poly term
        multipliedAns = denominator ? multipliedAns + `(${coeff})` : `(${coeff})` + multipliedAns
        const t = `${coeffText}x${expText}`
        term += t
        functions.push({ term: t, coeff, exp })
      }
      // increment i by degree that we added
      i += exp;
    }

    // remove beginning 1 from term
    if (term.length > 1) {
      term = term.substring(1)
    }
    return { term, multipliedAns, functions }
  }

export { generateRandomPolynomial, generateRandomPolynomialWithPoint, fitPointsToQuadratic, generateLimitPropertyTerm, getPolynomialFunctionWithPoint, getPolynomialFunction, fitPointsToQuadraticFractions, generateSpecialTrig }