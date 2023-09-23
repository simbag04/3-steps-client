import * as math from 'mathjs'
import { generateFunctionData } from './graph-helpers';
import { getRandomWithExclusions, getRandomNumber } from './functions';

/**
 * Compresses polynomial so it fits on 10 by 10 graph
 * @param {string} expression polynomial to compress
 * @param {number} max max (and min) value of local min/max
 * @param {array} values other values that should be within [-max, max]
 * @returns math.js node representing scaled polynomial
 */
function compressPolynomial(expression, max, values) {
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
function modifyForWholeNumber(node) {
  const f = (x) => node.evaluate({ x });
  let data = generateFunctionData(f, -11, 11);

  // filter out values where y is > 7 or < -7, x is > 8 or < -8
  data = data.filter(d => Math.abs(d.y) < 7 && Math.abs(d.x) < 8);

  // random x value in domain
  const minx = Math.ceil(data[0].x);
  const maxx = Math.floor(data[data.length - 1].x);

  const x = getRandomWithExclusions(minx, maxx, [-1, 0, 1]);
  const y = f(x);

  // find constant by which to move graph up or down to get integer y
  let move;
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
function generateRandomPolynomial(degree) {
  const expression = getPolynomialFunction(degree);
  const scaledNode = compressPolynomial(expression, 9, []);
  return modifyForWholeNumber(scaledNode);
}

/**
 * generates random polynomial function with random whole number coefficients 
 * @param {number} degree degree of polynomial to generate
 * @returns random polynomial function with random coefficients
 */
function getPolynomialFunction(degree) {
  const coefficients = [];
  for (let i = 0; i <= degree; i++) {
    coefficients.push(getRandomNumber(-5, 5));
  }

  let terms = coefficients.map((coef, exp) => {
    if (exp === 0) {
      return coef === 0 ? "" : `(${coef})`;
    } else if (exp === 1) {
      return coef === 0 ? "" : `(${coef}*x)`;
    } else {
      return coef === 0 ? "" : `(${coef}*(x^${exp}))`;
    }
  });

  terms = terms.filter(t => t !== "");

  const expression = terms.reverse().join(' + ').replace(/\s+/g, '');
  return expression;
}

/**
 * Generates a random polynomial that passes through a point and fits on 10 by 10 graph
 * @param {number} degree degree of polynomial to generate
 * @param {number} x x value of point
 * @param {number} y y value of point
 * @returns math.js node representing polynomial expression
 */
function generateRandomPolynomialWithPoint(degree, x, y) {
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
function fitPointsToQuadratic(points) {
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

export { generateRandomPolynomial, generateRandomPolynomialWithPoint, fitPointsToQuadratic }