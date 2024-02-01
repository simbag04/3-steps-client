import { inorder } from "./calculus";

/**
 * Polynomial Term class which represents a polynomial term
 */
class PolynomialTerm {
  constructor(node) {
    this.coefficient = null;
    this.degree = null;
    this.base = null;
    this.treenode = node;
  }
}

/**
 * parses expression tree node into a polynomial term object
 * @param {node} node custom expression tree node to be parsed into a polynomial node
 * @returns PolynomialTerm object
 */
function newPolynomialTerm(node) {
  const term = new PolynomialTerm(node);
  if (node.constantNode) {
    term.coefficient = Number(node.data);
    term.degree = 0;
    term.base = null;
    return term;
  }

  let nodeToParse = node;
  if (node.data === '*') {
    if (node.right.constantNode) {
      let temp = node.left;
      node.left = node.right;
      node.right = temp;
    }
    term.coefficient = Number(node.left.data);
    nodeToParse = node.right;

  } else {
    term.coefficient = 1;
  }

  if (nodeToParse.data === '^') {
    term.degree = Number(nodeToParse.right.data);
    term.base = nodeToParse.left;
  } else if (nodeToParse.variableNode) {
    term.degree = 1;
    term.base = nodeToParse;
  }

  return term;
}

/**
 * extracts coefficients of polynomial from custom expression tree root
 * @param {node} root custom expression tree root node of polynomial function
 * @returns exp: string of simplified polynomial, coeffs: array of coefficients of polynomial
 */
function extractCoeffs(root) {
  // extract terms
  const terms = [];
  const coeffs = [];
  extractTerms(root, terms);
  terms.sort((a, b) => b.degree - a.degree)
  let current = 0;
  for (let i = terms[0].degree; i >= 0; i--) {
    if (current < terms.length && terms[current].degree === i) {
      coeffs.push(terms[current].coefficient);
      current++;
    } else {
      coeffs.push(0);
    }
  }

  let text = terms.map((t) => inorder(t.treenode))
  let exp = text.join('+').replace(/\s+/g, '');
  return {
    exp,
    coeffs
  }
}

/**
 * extracts terms from root node into an array
 * @param {node} root root node from which terms are to be extracted
 * @param {Array} terms list of terms that have currently been extracted from root
 */
function extractTerms(root, terms) {
  if (!root) return;
  if (root.data !== '+') {
    terms.push(newPolynomialTerm(root));
  } else {
    extractTerms(root.left, terms);
    extractTerms(root.right, terms);
  }
}

export { extractCoeffs }