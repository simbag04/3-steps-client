import { getRandomNumber, shuffleArray } from "../../../helpers/functions";
import { Option } from "../../../@types/Option";
import { Question } from "../../../@types/Question";
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
    <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction}`} display={true}></Latex>
  </div>

  const hints: JSX.Element[] = []
  hints.push(
    <>
      <div>
        Focus on the step in both options where the inequality is multiplied.
      </div>
      <div>
        In one option, the inequality is flipped, and in the other option, it is not flipped:
      </div>
      <div>
        <Latex expression={`${multiplyByNegative ? `x^2 \\geq -x^2${trigFunction} \\geq -x^2` : `-x^2 \\leq x^2${trigFunction} \\leq x^2`}`} display={true}></Latex>
        <Latex expression={`${!multiplyByNegative ? `-x^2 \\geq -x^2${trigFunction} \\geq x^2` : `x^2 \\leq x^2${trigFunction} \\leq -x^2`}`} display={true}></Latex>
      </div>
    </>,
    <>
      <div>
        We know <Latex expression={`-x^2 \\leq x^2`} />. Looking at both of the options, the one that is consistent with this is:
      </div>
      <div>
        <Latex expression={`${multiplyByNegative ? `x^2 \\geq -x^2${trigFunction} \\geq -x^2` : `-x^2 \\leq x^2${trigFunction} \\leq x^2`}`} display={true}></Latex>
      </div>
    </>,
    <>
      <div>
        Thus, the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        {o1.component}
      </div>
    </>)
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
    <div>Hint: Use the Squeeze Theorem.</div>
  </div>

  const nextToInput = <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} =`}></Latex>

  const hints: JSX.Element[] = []
  hints.push(
    <>
      <div>
        In this problem, we see a <Latex expression={trig} /> function. We know that:
      </div>
      <div>
        <Latex expression={`-1 \\leq ${trigFunction} \\leq 1`} display={true} />
      </div>
    </>
  )

  hints.push(
    <>
      <div>
        Now, we want to get the middle expression to be exactly the function we are finding the limit of.
      </div>
      <div>
        To do this, first we can multiply all 3 sides of the inequality by <Latex expression={`${multiplyByNegative ? `-x^2` : `x^2`}`} />.
      </div>
      {multiplyByNegative ?
        <div>
          However, remember that when we multiply by a negative quantity like <Latex expression="-x^2" />, we need to flip the inequality.
        </div> :
        null
      }
    </>,
    <>
      <div>
        Thus, we get:
      </div>
      <div>
        <Latex expression={`${multiplyByNegative ? `x^2 \\geq -x^2${trigFunction} \\geq -x^2` : `-x^2 \\leq x^2${trigFunction} \\leq x^2`}`} display={true}></Latex>
      </div>
    </>
  )

  if (toAdd !== 0) {
    hints.push(
      <>
        <div>
          Now, we can add <Latex expression={`${toAdd}`} /> to all 3 sides of the limit to get:
        </div>
        <div>
          <Latex expression={`${multiplyByNegative ?
            `x^2 + ${toAdd} \\geq -x^2${trigFunction} + ${toAdd} \\geq -x^2 + ${toAdd}` :
            `-x^2 + ${toAdd} \\leq x^2${trigFunction} + ${toAdd} \\leq x^2 + ${toAdd}`}`} display={true}></Latex>
        </div>
      </>
    )
  }

  hints.push(
    <>
      <div>
        Now, the middle inequality should be exactly like the limit function. The next step is to {multiplyByNegative ? "flip the inequality and " : ""}take the limit of all 3 sides of the inequality.
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to 0} -x^2 ${toAdd === 0 ? `` : `+${toAdd}`} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} \\leq \\lim_{x \\to 0} x^2 ${toAdd === 0 ? `` : `+${toAdd}`}`} display="display"></Latex>
        <Latex expression={`${toAdd} \\leq \\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} \\leq ${toAdd}`} display="display"></Latex>
      </div>
    </>
  )

  hints.push(
    <>
      <div>
        Now, directly applying the Squeeze Theorem, we know:
      </div>
      <div>
        <Latex expression={`\\lim_{x \\to 0} ${multiplyByNegative ? `-x^2` : `x^2`}${finalFunction} = ${toAdd}`} display={true} />
      </div>
    </>,
    <>
      <div>
        Thus, the correct answer is:
      </div>
      <div className="hint-ans input correct ans">
        {toAdd}
      </div>
    </>
  )

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
      Yes, because {!incorrectBorderFunctions ? <><Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} /> near <Latex expression={`x = 0`} /></> : <><Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="f(x)" classes="c1" /><Latex expression={` = `} /><Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="h(x)" classes="c3" /></>}
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
      No, because it is not true that <> <Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="f(x)" classes="c1" /><Latex expression={` = `} /><Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="h(x)" classes="c3" />
      </>
    </div>,
    correct: constant2 !== 0
  }

  const hints: JSX.Element[] = []
  hints.push(<>
    <div>
      Recall that there are two conditions that need to be satisified to apply the Squeeze Theorem for a function <Latex classes={'c2'} expression={`g(x)`} />:
    </div>
    <div>
      <ul className="text-start">
        <li>
          <Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} />
        </li>
        <li>
          <Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="f(x)" classes="c1" /><Latex expression={` = `} /><Latex expression={`\\lim_{x \\to 0}`} /><Latex expression="h(x)" classes="c3" />
        </li>
      </ul>
    </div>
  </>)

  if (incorrectBorderFunctions) {
    hints.push(
      <>
        <div>
          Looking at the graph, it is clear that <Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} /> does <strong>not</strong> hold.
        </div>
      </>,
      <>
        <div>
          Thus, we cannot apply the Squeeze Theorem. The correct answer is:
        </div>
        <div className="hint-ans input correct ans">
          {o3.component}
        </div>
      </>
    )
  } else {
    hints.push(
      <>
        <div>
          Looking at the graph, it is clear that <Latex classes={'c1'} expression={`f(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c2'} expression={`g(x)`} /> <Latex expression={`\\leq`} /> <Latex classes={'c3'} expression={`h(x)`} /> holds.
        </div>
        <div>
          Thus, the first condition is satisfied.
        </div>
      </>
    )

    if (constant2 !== 0) {
      hints.push(
        <>
          <div>
            While the first condition is satisfied, as <Latex expression="x" /> approaches 0, the limits of <Latex classes={'c1'} expression={`f(x)`} /> and <Latex classes={'c3'} expression={`h(x)`} /> are <strong>not</strong> equal.
          </div>
        </>,
        <>
          <div>
            Thus, we cannot apply the Squeeze Theorem. The correct answer is:
          </div>
          <div className="hint-ans input correct ans">
            {o4.component}
          </div>
        </>
      )
    } else {
      hints.push(
        <>
          <div>
            The graph shows that as <Latex expression="x" /> approaches 0, the limits of <Latex classes={'c1'} expression={`f(x)`} /> and <Latex classes={'c3'} expression={`h(x)`} /> are equal.
          </div>
        </>,
        <>
          <div>
            Thus, both conditions of the Squeeze Theorem are satisfied, and we can apply it. The correct answer is:
          </div>
          <div className="hint-ans input correct ans">
            {o1.component}
          </div>
        </>
      )
    }
  }

  return { type: 'mc', title, question, input: [o1, o2, o3, o4], hints }
}

const generateRandomQuestion = (): Question => {
  const rand = 9 // getRandomNumber(1, 10);
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