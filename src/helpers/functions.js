import * as math from 'mathjs'
import { build, derivative, simplify } from './calculus';
import { extractCoeffs } from './polynomial';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  const scaledNode = math.parse(`(1/${scale})(${expression})`);
  return scaledNode;

  //const f = x => scaledNode.evaluate({x});

  //return f;

}

export { generateRandomPolynomial, getRandomNumber }