import * as math from 'mathjs'
import { build, inorder, derivative, simplify } from './calculus';
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

  const vars = ['x'];
  let n = build(`(${expression})`, ['x']);

  // find zeros of the derivative for local mins/maxs
  const deriv = derivative(n, 'x', vars);
  const simplified = simplify(deriv, vars);
  let { exp, coeffs } = extractCoeffs(simplified);
  coeffs = coeffs.reverse();
  const roots = math.polynomialRoot(coeffs[0], coeffs[1], coeffs[2], coeffs[3]);
  console.log(roots)
  const mathexp = math.parse(exp);


}

export { generateRandomPolynomial, getRandomNumber }