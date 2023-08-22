import * as math from 'mathjs'
import { build, derivative, simplify } from './calculus';
import { extractCoeffs } from './polynomial';
import { generateFunctionData } from './graph-helpers';

/**
 * Shuffles an array
 * @param {array} array array to be shuffled
 * @returns shuffled array
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * generates a random number
 * @param {number} min minimum value of random number
 * @param {number} max maximum value of random number
 * @returns random number in the range [min, max]
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * generates a random number with exclusions
 * @param {number} min minimum value of random number
 * @param {number} max maximum value of random number
 * @param {array} exclusions numbers to be excluded from generation
 * @returns random number in the range [min, max] excluding exclusions
 */
function getRandomWithExclusions(min, max, exclusions) {
  const validValues = [];
  for (let i = min; i <= max; i++) {
    if (!exclusions.includes(i)) {
      validValues.push(i);
    }
  }

  if (validValues.length === 0) {
    return max;
  }

  const randomIndex = getRandomNumber(0, validValues.length - 1);
  return validValues[randomIndex];
}

/**
 * Compresses polynomial so it fits on 10 by 10 graph
 * @param {string} expression polynomial to compress
 * @param {number} max max (and min) value of local min/max
 * @param {array} values other values that should be within [-max, max]
 * @param {number} constant number to further compress polynomial by
 * @returns math.js node representing scaled polynomial
 */
function compressPolynomial(expression, max, values, constant) {
  const node = math.parse(expression);

  const vars = ['x'];
  let n = build(`(${expression})`, ['x']);

  // find zeros of the derivative for local mins/maxs
  const deriv = derivative(n, 'x', vars);
  const simplified = simplify(deriv, vars);

  // extract and format coefficients
  let { coeffs } = extractCoeffs(simplified);
  if (coeffs.length === 1) return node;
  coeffs = coeffs.reverse();
  for (let i = coeffs.length; i < 4; i++) coeffs.push(0);

  // find real roots
  const roots = math.polynomialRoot(...coeffs);
  const realRoots = roots.filter((r) => math.typeOf(r) !== 'Complex')

  // find min/max value at local mins/maxs of function
  let maxabs = Math.max(max, ...values);
  for (let i = 0; i < realRoots.length; i++) {
    maxabs = Math.max(Math.abs(node.evaluate({ x: realRoots[i] })), maxabs);
  }

  // find scale factor for function and modify
  const scale = Math.ceil(maxabs / max);
  const scaledNode = math.parse(`(1/${scale * constant})(${expression})`);
  return scaledNode;
}

/**
 * modifies expression to have whole number at a point
 * @param {node} node math.js node with current function
 * @returns modified node, x: modified math.js node that has a whole number value at x
 */
function modifyForWholeNumber(node) {
  const f = (x) => node.evaluate({ x });
  let data = generateFunctionData(f);

  // filter out values where y is > 8 or < -8
  data = data.filter(d => Math.abs(d.y) < 7 && Math.abs(d.x) < 8);

  const minx = Math.ceil(data[0].x);
  const maxx = Math.floor(data[data.length - 1].x);

  const x = getRandomWithExclusions(minx, maxx, [-1, 0, 1]);
  const y = f(x);

  let move = (Math.ceil(y) === 0 ? Math.floor(y) : Math.ceil(y)) - y;
  if (Math.round(y) < 0) {
    move = Math.min(-2, Math.round(y)) - y;
  } else {
    move = Math.max(2, Math.round(y)) - y;
  }

  let expression = `(${node.toString()} + ${move})`
  const modifiedNode = math.parse(expression);
  return { node: modifiedNode, x };
}

/**
 * Generates ready to graph random polynomial function
 * @param {number} degree degree of polynomial to be generated
 * @returns ready to graph polynomial function
 */
function generateRandomPolynomial(degree) {
  const expression = getPolynomialFunction(degree);
  const scaledNode = compressPolynomial(expression, 9, [], 50);
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
  let expression = getPolynomialFunction(degree);
  let node = math.parse(expression);
  let max = 9;
  node = compressPolynomial(node.toString(), max, [], 50);
  let yval = node.evaluate({ x });
  let move = y - yval;

  while (Math.abs(move) > 10 - max) {
    max--;
    node = compressPolynomial(node.toString(), max, [Math.abs(yval)], 1);
    yval = node.evaluate({ x });
    move = y - yval;
  }
  expression = `(${node.toString()} + ${move})`
  const modifiedNode = math.parse(expression);
  return modifiedNode;
}
export { generateRandomPolynomial, getRandomNumber, getRandomWithExclusions, shuffleArray, generateRandomPolynomialWithPoint }