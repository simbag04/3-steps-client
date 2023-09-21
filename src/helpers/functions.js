import * as math from 'mathjs'
import { generateFunctionData } from './graph-helpers';
const nerdamer = require("nerdamer/all.min")

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
 * @param {Number} n number of values to generate
 * @param {boolean} increasing true if values should be increasing, false if decreasing
 * @returns array of n ordered numbers 
 */
function generateOrderedValues(n, increasing) {
  if (n <= 0) {
    return [];
  }

  const values = [Math.floor(Math.random() * 10) + 1]; // Initialize with a random value

  while (values.length < n) {
    // generate a value greater than the last one
    const nextDiff = getRandomNumber(1, 4) * (increasing ? 1 : -1);
    const nextValue = values[values.length - 1] + nextDiff; 
    values.push(nextValue);
  }

  return values;
}

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
 * @param {String} polynomial string with a polynomial
 * @returns polynomial sorted in order of degree
 */
function sortPolynomialByDegree (polynomial) {
  // get coefficients with nerdamer
  const coefficients = nerdamer.coeffs(polynomial, 'x');
  let ans = "";
  const coeffs = [];
  coefficients.each(function(e) {
    coeffs.push(nerdamer(e).toString());
  })

  // build expression
  for (let i = coeffs.length - 1; i >= 0; i--) {
    if (coeffs[i] === "0") continue; // skip 0 terms

    // add "+" before positive coefficient terms
    if (i !== coeffs.length - 1) {
      if (Number(coeffs[i]) > 0) {
        ans += "+"
      } 
    }

    if (coeffs[i] !== "1") {
      ans += coeffs[i];
    }

    if (i > 1) {
      ans += `x^${i}`;
    } else if (i === 1) {
      ans += 'x';
    }
  }
  return ans;
}

/**
 * 
 * @param {String} xval xvalue from which to create factor
 * @returns String in form (x - p), where p is the xval
 */
function getStringFactorFromXval (xval) {
  const x = Number(xval);
  if (x < 0) {
    return `(x + ${Math.abs(x)})`
  } else if (x > 0) {
    return `(x - ${x})`
  } else {
    return `(x)`
  }
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

export { generateRandomPolynomial, getRandomNumber, getRandomWithExclusions, generateOrderedValues, shuffleArray, generateRandomPolynomialWithPoint, fitPointsToQuadratic, sortPolynomialByDegree, getStringFactorFromXval }