import * as math from 'mathjs'
import { build, derivative, simplify } from './calculus';
import { extractCoeffs } from './polynomial';
import { generateFunctionData } from './graph-helpers';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i

    // Swap elements at i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function compressPolynomial(expression) {
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
  let maxabs = 9;
  for (let i = 0; i < realRoots.length; i++) {
    maxabs = Math.max(Math.abs(node.evaluate({x: realRoots[i]})), maxabs);
  }

  // find scale factor for function and modify
  const scale = Math.ceil(maxabs / 9);
  const scaledNode = math.parse(`(1/${scale * 50})(${expression})`);
  return scaledNode;
}

function modifyForWholeNumber(node) {
  const f = (x) => node.evaluate({x});
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
  return {node: modifiedNode, x};
}

function generateRandomPolynomial(degree) {
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
  const scaledNode = compressPolynomial(expression);
  return modifyForWholeNumber(scaledNode);
}

export { generateRandomPolynomial, getRandomNumber, getRandomWithExclusions, shuffleArray }