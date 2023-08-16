class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function newNode(c) {
  let n = new Node(c);
  return n;
}

function build(s) {
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

    if (s[i] == '(') {
      stC.push(s[i]);
    }

    else if ((/[a-zA-Z0-9]/).test(s[i])) {
      if (unaryNegation) {
        t = newNode(s[i - 1] + s[i]);
        unaryNegation = false;
      } else t = newNode(s[i]);
      stN.push(t);
    }
    else if (p[s[i].charCodeAt()] > 0) {
      if (s[i] === '-' && (i === 0 || s[i - 1] === '(' || /[+\-*/^]/.test(s[i - 1]))) {
        unaryNegation = true;
        continue;
      }
      while (stC.length != 0 && stC[stC.length - 1] != '('
        && ((s[i] != '^' &&
          p[stC[stC.length - 1].charCodeAt()] >=
          p[s[i].charCodeAt()])
          || (s[i] == '^' &&
            p[stC[stC.length - 1].charCodeAt()] >
            p[s[i].charCodeAt()]))) {

        t = newNode(stC[stC.length - 1]);
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
    else if (s[i] == ')') {
      while (stC.length != 0 &&
        stC[stC.length - 1] != '(') {
        t = newNode(stC[stC.length - 1]);
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

function inorder(root) {
  return inorderHelper(root, "");
}
function inorderHelper(root, string) {
  if (root != null) {
    string = inorderHelper(root.left, string);
    string += root.data;
    string = inorderHelper(root.right, string);
  } 
  return string;

}

export { build, inorder }