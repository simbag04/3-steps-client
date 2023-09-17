function compressPolynomial() {
  
  /*
  /////////////// ONLY FITS LOCAL MINS/MAXS WITHIN RANGE /////////////////////
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
  */
}