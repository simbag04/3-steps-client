/**
 * List of all properties of limits
 */

import Latex from "../../../helpers/Latex"
export const LimitPropertyRules = () => {
  return (
    <div className="important">
      <h3>Rules</h3>
      <ol className="text-start display">
        <li>
          <Latex expression={`{\\lim}_{x \\to a}[c f(x)] = c \\cdot {\\lim}_{x \\to a} f(x)`} display={true} />
        </li>
        <li>
          <Latex expression={`{\\lim}_{x \\to a}[f(x) \\pm g(x)] = {\\lim}_{x \\to a} f(x) \\pm {\\lim}_{x \\to a} g(x)`} display={true} />
        </li>
        <li>
          <Latex expression={`{\\lim}_{x \\to a}[f(x) \\cdot g(x)] = {\\lim}_{x \\to a} f(x) \\cdot {\\lim}_{x \\to a} g(x)`} display={true} />
        </li>
        <li>
          <Latex expression={`{\\lim}_{x \\to a}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{{\\lim}_{x \\to a} f(x)}{{\\lim}_{x \\to a} g(x)}, \\text{given } {{\\lim}_{x \\to a} g(x)} \\neq 0`} display={true} />
        </li>
        <li>
          <Latex expression={`{\\lim}_{x \\to a}[f(x)]^n = \\left[{\\lim}_{x \\to a} f(x)\\right]^n`} display={true} />
        </li>
        <li>
          <Latex expression={`{\\lim}_{x \\to a}\\left[\\sqrt[n]{f(x)}\\right] = \\sqrt[n]{{\\lim}_{x \\to a} f(x)}`} display={true} />
        </li>
        <li>
          <Latex expression={`{\\lim}_{x \\to a} c = c`} display={true} />
        </li>
      </ol>
    </div>
  )
}