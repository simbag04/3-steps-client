import { getRandomNumber, shuffleArray } from "../../../helpers/functions";
import { Option } from "../../../types/Option";
import { Question } from "../../../types/Question";
import Latex from '../../../components/latex/Latex'
import React from "react";
import * as math from "mathjs"
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph";
import { GRAPH_SIZE } from "../../../helpers/constants";

const optionsForLimitSteps = (): Question => {
  const trig = `${getRandomNumber(0, 1) === 0 ? `\\sin` : `\\cos`}`
  const trigFunction = `${trig}\\left(\\frac{${getRandomNumber(1, 7)}}{x}\\right)`
  const toAdd = getRandomNumber(0, 7);
  const finalFunction = `${trigFunction}${toAdd === 0 ? `` : `+ ${toAdd}`}`
  const multiplyByNegative = Boolean(getRandomNumber(0, 1))


  const o1: Option = {
    component: <div className="flex vertical center medium-gap">
      <div className="flex vertical">
        Known fact:
        <Latex expression={`-1 \\leq ${trigFunction} \\leq 1`} display={true}></Latex>
      </div>
      <div className="flex vertical">
        <div>
          Multiply inequality by <Latex expression={`${multiplyByNegative ? "-" : ""}x^2:`}></Latex>
        </div>

        <Latex expression={`${multiplyByNegative ? `x^2 \\geq -x^2${trigFunction} \\geq -x^2` : `-x^2 \\leq x^2${trigFunction} \\leq x^2`}`} display={true}></Latex>
      </div>
      {toAdd === 0 ? null :
        <div className="flex vertical">
          <div>
            Add {toAdd} to all 3 sides of the inequality:
          </div>
          <Latex expression={`${multiplyByNegative ? `x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\geq -x^2${finalFunction} \\geq -x^2 ${toAdd === 0 ? `` : `+${toAdd}`}` : `-x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\leq x^2${finalFunction} \\leq x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`}`} display={true}></Latex>
        </div>}
      <div className="flex vertical">
        {multiplyByNegative ? `Flip and t` : `T`}ake limit on all 3 sides:
        <Latex expression={`\\lim_{x \\to 0} -x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} \\leq \\lim_{x \\to 0} x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`} display="display"></Latex>
        <Latex expression={`${toAdd} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} \\leq ${toAdd}`} display="display"></Latex>
      </div>
      <div className="flex vertical">
        Answer: <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} = ${toAdd}`} display="display"></Latex>
      </div>
    </div>,
    correct: true
  }

  const o2: Option = {
    component: <div className="flex vertical center medium-gap">
      <div className="flex vertical">
        Known fact:
        <Latex expression={`-1 \\leq ${trigFunction} \\leq 1`} display={true}></Latex>
      </div>
      <div className="flex vertical">
        <div>
          Multiply inequality by <Latex expression={`${multiplyByNegative ? "-" : ""}x^2:`}></Latex>
        </div>

        <Latex expression={`${!multiplyByNegative ? `-x^2 \\geq -x^2${trigFunction} \\geq x^2` : `x^2 \\leq x^2${trigFunction} \\leq -x^2`}`} display={true}></Latex>
      </div>
      {toAdd === 0 ? null :
        <div className="flex vertical">
          <div>
            Add {toAdd} to all 3 sides of the inequality:
          </div>
          <Latex expression={`${!multiplyByNegative ? `-x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\geq -x^2${finalFunction} \\geq x^2  ${toAdd === 0 ? `` : `+${toAdd}`}` : `x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\leq x^2${finalFunction} \\leq -x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`}`} display={true}></Latex>
        </div>}
      <div className="flex vertical">
        {!multiplyByNegative ? `Flip and t` : `T`}ake limit on all 3 sides:
        <Latex expression={`\\lim_{x \\to 0} x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} \\leq \\lim_{x \\to 0} -x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`} display="display"></Latex>
        <Latex expression={`${toAdd} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2 ${toAdd === 0 ? `` : `+${toAdd}`}` : `x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`}${finalFunction} \\leq ${toAdd}`} display="display"></Latex>
      </div>
      <div className="flex vertical">
        Answer: <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} = ${toAdd}`} display="display"></Latex>
      </div>
    </div>,
    correct: false
  }

  const title = <></>
  const question = <div className="flex vertical center small-gap">
    <h3>Select the option which correctly uses the Squeeze Theorem to evaluate:</h3>
    <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction}`}></Latex>.
  </div>
  const hints: JSX.Element[] = []
  hints.push(<div>
    Focus on the step where the inequality is multiplied. When we multiply by a {multiplyByNegative ? "negative" : "positive"} quantity, do we flip the inequality?
  </div>)
  return { type: 'mc', title, question, input: shuffleArray([o1, o2]), hints }
}

const evaluateLimit = (): Question => {
  const trig = `${getRandomNumber(0, 1) === 0 ? `\\sin` : `\\cos`}`
  const trigFunction = `${trig}\\left(\\frac{${getRandomNumber(1, 7)}}{x}\\right)`
  const toAdd = getRandomNumber(0, 7);
  const finalFunction = `${trigFunction}${toAdd === 0 ? `` : `+ ${toAdd}`}`
  const multiplyByNegative = Boolean(getRandomNumber(0, 1))

  const title = <></>
  const question = <div className="flex vertical center">
    <h2>Evaluate the limit.</h2>
    <div>Hint: Use the Squeeze Theorem</div>
  </div>
  const nextToInput = <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} =`}></Latex>
  const hints: JSX.Element[] = []
  hints.push(<div>
    We need to solve <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction}`}></Latex>. Here, we see a <Latex expression={trig}/> function. What do we know about the bounds of this function?
  </div>)

  hints.push(<div>
    Using these bounds, what can you multiply all 3 sides of the inequality by to make the middle of the inequality closer to the limit?
  </div>)

  if (toAdd !== 0) {
    hints.push(<div>
      You should be getting closer to the actual limit function now! What can you add to all sides of the inequality to make the middle inequality exactly the same as the limit function?
    </div>)
  }

  hints.push(<div>
    Now, the middle inequality should be exactly like the limit function. The next step is to take the limit of all 3 sides of the inequality.
  </div>)

  hints.push(<div>
    Now, you can directly apply the Squeeze Theorem to find the limit!
  </div>)

  return { type: 'math', title, question, ans: toAdd, hints, nextToInput }

}

const checkTheoremApplication = (): Question => {
  const incorrectBorderFunctions = Boolean(getRandomNumber(0, 1))
  const constant1 = getRandomNumber(-4, 4) / 20;
  const constant2 = (incorrectBorderFunctions || getRandomNumber(0, 5) < 1) ? 0 : getRandomNumber(0, 4) / 20;
  const n1 = math.parse(`x^2* sin(1/x) + ${getRandomNumber(0, 1) === 0 ? constant1 : constant1 - constant2}`);
  const n2 = math.parse(`${incorrectBorderFunctions ? `x` : `x^2`} + ${constant1}`);
  const n3 = math.parse(`${incorrectBorderFunctions ? `-x` : `-x^2`} + ${constant1 - constant2}`);
  const functions = [
    {
      f: (x: number) => n2.evaluate({ x }),
      min: -0.5,
      max: 0.5,
      includeLeft: false,
      includeRight: false,
      leftArrow: true,
      rightArrow: true,
      classes: 'c3',
      leftCircle: false,
      rightCircle: false,
    },
    {
      f: (x: number) => n3.evaluate({ x }),
      min: -0.5,
      max: 0.5,
      includeLeft: false,
      includeRight: false,
      leftArrow: true,
      rightArrow: true,
      classes: 'c1',
      leftCircle: false,
      rightCircle: false,
    },
    {
      f: (x: number) => n1.evaluate({ x }),
      min: -0.5,
      max: 0,
      includeLeft: false,
      includeRight: false,
      leftArrow: true,
      rightArrow: false,
      classes: 'c2',
      leftCircle: false,
      rightCircle: false,
      dataGap: 0.001
    },
    {
      f: (x: number) => n1.evaluate({ x }),
      min: 0,
      max: 0.5,
      includeLeft: false,
      includeRight: false,
      leftArrow: false,
      rightArrow: true,
      classes: 'c2',
      leftCircle: false,
      rightCircle: false,
      dataGap: 0.001
    },
  ]

  const title = <></>
  const question = <div className="flex vertical center small-gap">
    <h3>Can the squeeze theorem be applied to find <Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="g(x)" classes="c2" />?</h3>
    <div className="flex vertical center medium-gap">
      <h3>Graph of <Latex expression="f(x)" classes="c1" />, <Latex expression="g(x)" classes="c2" />, <Latex expression="h(x)" classes="c3" /></h3>
      <FunctionGraph functions={functions} size={GRAPH_SIZE} minx={-0.3} maxx={0.3} miny={-0.3} maxy={0.3} />
    </div>
  </div>

  const o1: Option = {
    component: <div>
      Yes, because <Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} /> near <Latex expression={`x = 0`} /> and <Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="f(x)" classes="c1" /><Latex expression={`=`} /><Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="h(x)" classes="c3" />
    </div>,
    correct: !incorrectBorderFunctions && constant2 === 0
  }

  const o2: Option = {
    component: <div>
      Yes, because {!incorrectBorderFunctions ? <><Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} /> near <Latex expression={`x = 0`} /></> : <><Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="f(x)" classes="c1" /><Latex expression={`=`} /><Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="h(x)" classes="c3" /></>}
    </div>,
    correct: false
  }

  const o3: Option = {
    component: <div>
      No, because it is not true that <><Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} /> near <Latex expression={`x = 0`} /></>
    </div>,
    correct: incorrectBorderFunctions
  }

  const o4: Option = {
    component: <div>
      No, because it is not true that <> <Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="f(x)" classes="c1" /><Latex expression={`=`} /><Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="h(x)" classes="c3" />
      </>
    </div>,
    correct: constant2 !== 0
  }

  const hints: JSX.Element[] = []
  hints.push(<div className="flex vertical center">
    <div>
      Recall that there are two conditions that need to be satisified to apply the Squeeze Theorem for a function <Latex classes={'c2'} expression={`g(x)`} />:
    </div>
    <div>
      <ul className="text-start">
        <li>
          <Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} />
        </li>
        <li>
          <Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="f(x)" classes="c1" /><Latex expression={`=`} /><Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="h(x)" classes="c3" />
        </li>
      </ul>
    </div>
  </div>)

  hints.push(<div className="flex vertical center medium-gap">
    <div>
      Are both of these conditions satisfied in the graph?
    </div>
    <div>
      <h3>Graph of <Latex expression="f(x)" classes="c1" />, <Latex expression="g(x)" classes="c2" />, <Latex expression="h(x)" classes="c3" /></h3>
      <FunctionGraph functions={functions} size={GRAPH_SIZE} minx={-0.3} maxx={0.3} miny={-0.3} maxy={0.3} />
    </div>
  </div>)

  return { type: 'mc', title, question, input: [o1, o2, o3, o4], hints }

}

const generateRandomQuestion = (): Question => {
  const rand = getRandomNumber(1, 10);
  let q: Question = null;
  if (rand <= 2) {
    q = optionsForLimitSteps();
  } else if (rand <= 6) {
    q = evaluateLimit();
  } else {
    q = checkTheoremApplication();
  }
  return q;
}

export default generateRandomQuestion