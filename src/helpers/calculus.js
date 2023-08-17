class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function newNode(c, vars) {
  let n = new Node(c);
  if (vars.includes(c)) {
    n.variableNode = true;
  } else {
    n.variableNode = false;
  }
  if (c.length === 2) {
    n.constantNode = true;
  } else if (/[-+*/^]/.test(c) || vars.includes(c)) {
    n.constantNode = false;
  } else {
    n.constantNode = true;
  }
  return n;
}

function build(s, vars) {
  let stN = [];
  let stC = [];
  let t, t1, t2;

  let p = new Array(123);
  p.fill(0)

  p['+'.charCodeAt()] = p['-'.charCodeAt()] = 1;
  p['/'.charCodeAt()] = p['*'.charCodeAt()] = 2;
  p['^'.charCodeAt()] = 3;
  p[')'.charCodeAt()] = 0;

  let unaryNegation = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') continue;

    if (s[i] === '(') {
      stC.push(s[i]);
    }

    else if ((/[a-zA-Z0-9]/).test(s[i])) {
      if (unaryNegation) {
        t = newNode(s[i - 1] + s[i], vars);
        unaryNegation = false;
      } else t = newNode(s[i], vars);
      stN.push(t);
    }
    else if (p[s[i].charCodeAt()] > 0) {
      if (s[i] === '-' && (i === 0 || s[i - 1] === '(' || /[+\-*/^]/.test(s[i - 1]))) {
        unaryNegation = true;
        continue;
      }
      while (stC.length !== 0 && stC[stC.length - 1] !== '('
        && ((s[i] !== '^' &&
          p[stC[stC.length - 1].charCodeAt()] >=
          p[s[i].charCodeAt()])
          || (s[i] === '^' &&
            p[stC[stC.length - 1].charCodeAt()] >
            p[s[i].charCodeAt()]))) {

        t = newNode(stC[stC.length - 1], vars);
        stC.pop();

        t1 = stN[stN.length - 1];
        stN.pop();

        t2 = stN[stN.length - 1];
        stN.pop();

        t.left = t2;
        t.right = t1;

        stN.push(t);
      }

      stC.push(s[i]);
    }
    else if (s[i] === ')') {
      while (stC.length !== 0 &&
        stC[stC.length - 1] !== '(') {
        t = newNode(stC[stC.length - 1], vars);
        stC.pop();
        t1 = stN[stN.length - 1];
        stN.pop();
        t2 = stN[stN.length - 1];
        stN.pop();
        t.left = t2;
        t.right = t1;
        stN.push(t);
      }
      stC.pop();
    }
  }
  t = stN[stN.length - 1];
  return t;
}


function derivative(root, variable, rootVars) {
  if (root === null) return root;
  if (root.data === '+' || root.data === '-') {
    root.left = derivative(root.left, variable, rootVars);
    root.right = derivative(root.right, variable, rootVars);
    return root;
  } else if (root.data === '*') {
    if (root.left.constantNode) {
      root.right = derivative(root.right, variable, rootVars);
      return root;
    } else if (root.right.constantNode) {
      root.left = derivative(root.left, variable, rootVars);
      return root;
    } else {
      // build node from derivative formula
      let curr = newNode('+', rootVars);
      curr.left = newNode('*', rootVars);
      curr.left.left = root.left;
      curr.left.right = derivative(root.right, variable, rootVars);
      curr.right = newNode('*', rootVars);
      curr.right.left = root.right;
      curr.right.right = derivative(root.left, variable, rootVars);
      return curr;
    }
  } else if (root.data === '^') {
    let curr = newNode('*', rootVars);
    curr.left = root.right;
    curr.right = newNode('^', rootVars);
    curr.right.left = root.left;
    curr.right.right = newNode('-', rootVars);
    curr.right.right.left = root.right;
    curr.right.right.right = newNode('1', rootVars);
    return curr;
  } else if (root.data === variable) {
    root.data = 1;
    return root;
  } else {
    root.data = 0;
    return root;
  }
}

function inorder(root) {
  return inorderHelper(root, "");
}
function inorderHelper(root, string) {
  if (root !== null) {
    string = inorderHelper(root.left, string);
    string += root.data;
    if (root.left !== null && root.right !== null) string += "(";
    string = inorderHelper(root.right, string);
    if (root.left !== null && root.right !== null) string += ")";
  }
  return string;

}

export { build, inorder, derivative }