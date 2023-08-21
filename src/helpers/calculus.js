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

  if (c.length === 2 || /[0-9]/.test(c)) {
    n.numberNode = true;
  } else {
    n.numberNode = false;
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

function simplify(root, rootVars) {
  if (!root) return root;
  root.left = simplify(root.left, rootVars);
  root.right = simplify(root.right, rootVars);

  if (root.data === '+') {
    if (root.right.data === '0') return root.left;
    if (root.left.data === '0') return root.right;
    root = simplifyAddMultiply(root, rootVars, '+')

  } else if (root.data === '-') {
    if (root.left.numberNode && root.right.numberNode) {
      return newNode(String(Number(root.left.data) - Number(root.right.data)), rootVars);
    }

  } else if (root.data === '*') {
    if (root.right.data === '1') return root.left;
    if (root.left.data === '1') return root.right;
    if (root.right.data === '0') return root.right;
    if (root.left.data === '0') return root.left;
    root = simplifyAddMultiply(root, rootVars, '*');

  } else if (root.data === '^') {
    if (root.right.data === '1'){
      return root.left;
    } 

  }
  return root;

}

function add(x, y) {
  return String(Number(x) + Number(y));
}

function multiply(x, y) {
  return String(Number(x) * Number(y));
}

function simplifyAddMultiply(root, rootVars, operator) {
  const f = operator === '+' ? add : multiply;
  if (root.left.numberNode && root.right.numberNode) {
    return newNode(f(root.left.data, root.right.data), rootVars);
  } else if (root.left.numberNode) {
    if (root.right.data === operator) {
      if (root.right.left.numberNode) {
        let n = newNode(f(root.left.data, root.right.left.data), rootVars);
        root.left = n;
        root.right = root.right.right;
      } else if (root.right.right.numberNode) {
        let n = newNode(f(root.left.data, root.right.right.data), rootVars);
        root.left = n;
        root.right = root.right.left;
      }
    }
  } else if (root.right.numberNode) {
    if (root.left.data === operator) {
      if (root.left.left.numberNode) {
        let n = newNode(f(root.right.data, root.left.left.data), rootVars);
        root.right = n;
        root.left = root.left.right;
      } else if (root.left.right.numberNode) {
        let n = newNode(f(root.right.data, root.left.right.data), rootVars);
        root.right = n;
        root.left = root.left.left;
      }
    }
  }
  return root;
}

function derivative(root, variable, rootVars) {
  if (!root) return root;
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
    return newNode(1, rootVars);

  } else {
    return newNode(0, rootVars)
  }
}

function inorder(root) {
  return inorderHelper(root, "");
}

function inorderHelper(root, string) {
  if (root !== null) {
    string = inorderHelper(root.left, string);
    string += root.data;
    string = inorderHelper(root.right, string);
  }
  return string;

}

export { build, inorder, derivative, simplify }