import * as math from 'mathjs'
import { build, inorder } from './calculus';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomPolynomial(degree) {
  const coefficients = [];
  for (let i = 0; i <= degree; i++) {
    coefficients.push(getRandomNumber(-5, 5)); // Adjust the range as needed
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

  let n = build(`(${expression})`);
  console.log(n);
  console.log(inorder(n));

  const simplified = math.simplifyCore(node);
  let derivative = math.derivative(simplified, 'x');
  derivative = math.simplify(`expand(${derivative.toString()})`)
  return { simplified, derivative };

}

export { generateRandomPolynomial, getRandomNumber }