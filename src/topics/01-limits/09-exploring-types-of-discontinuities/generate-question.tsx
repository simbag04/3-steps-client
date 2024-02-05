import { getRandomNumber, getRandomWithExclusions } from "../../../helpers/functions";
import { generateRandomPolynomialWithPoint } from "../../../helpers/expression-generators"
import { GraphFunction } from "../../../@types/GraphFunction";
import React from "react";
import Latex from "../../../components/latex/Latex";
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph";
import AsymptoticGraph from "../../../components/content-components/graphs/AsymptoticGraph";
import { GRAPH_SIZE } from "../../../helpers/constants";
import { Option } from "../../../@types/Option";
import { Question } from "../../../@types/Question";
import * as math from "mathjs"
import { COLORS } from "../../../helpers/constants";
import { GraphPoint } from "../../../@types/GraphPoint";


const jumpGraphQuestion = (): any => {
  const xVal: number = getRandomNumber(-8, 8); // xval where there is a jump
  const y1 = getRandomNumber(-7, 7);
  const y2 = getRandomNumber(0, 10) <= 2 ? y1 : getRandomWithExclusions(-7, 7, [y1])
  const includeLeft = getRandomNumber(0, 1) === 0
  const f1 = generateRandomPolynomialWithPoint(getRandomNumber(1, 4), xVal, y1)
  const f2 = generateRandomPolynomialWithPoint(getRandomNumber(1, 4), xVal, y2)
  const functions: GraphFunction[] = [
    {
      f: (x: number) => f1.evaluate({ x }),
      min: -11,
      max: xVal,
      includeLeft: false,
      includeRight: includeLeft,
      leftArrow: true,
      rightArrow: false,
      classes: 'f',
      leftCircle: false,
      rightCircle: true
    },
    {
      f: (x: number) => f2.evaluate({ x }),
      min: xVal,
      max: 11,
      includeLeft: y1 === y2 || !includeLeft,
      includeRight: false,
      leftArrow: false,
      rightArrow: true,
      classes: 'f',
      leftCircle: true,
      rightCircle: true
    }
  ];

  let tempQuestion: React.JSX.Element = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={functions} size={GRAPH_SIZE} />
  </div>

  const { title, options, hints } = generateOptionsAndHints("jump", tempQuestion, y1 === y2)
  const question = <div className="flex vertical center medium-gap">
    {title}
    {tempQuestion}
  </div>

  return { question, title: <></>, input: options, hints }
}

const infiniteGraphQuestion = () => {
  const xVal = getRandomNumber(-7, 7); // values at which there will be an asymptote
  let f = `(${getRandomNumber(0, 1) === 0 ? "-" : ""}1/
    (x ${xVal > 0 ? `-${xVal}` : `+${Math.abs(xVal)}`})`; // function

  const verticalShift = getRandomNumber(-5, 5)
  f = f + `) ${verticalShift > 0 ? '+' : '-'} ${Math.abs(verticalShift)}`

  const node = math.parse(f);
  const functions: GraphFunction[] = [
    {
      f: (x: number) => node.evaluate({ x }),
      min: -11,
      max: xVal,
      includeLeft: false,
      includeRight: false,
      leftArrow: true,
      rightArrow: true,
      classes: 'f',
      leftCircle: false,
      rightCircle: false,
      type: "asymptotic"
    },
    {
      f: (x: number) => node.evaluate({ x }),
      min: xVal,
      max: 11,
      includeLeft: false,
      includeRight: false,
      leftArrow: true,
      rightArrow: true,
      classes: 'f',
      leftCircle: false,
      rightCircle: false,
      type: "asymptotic"
    },
  ]

  const tempQuestion = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <AsymptoticGraph functions={functions} size={GRAPH_SIZE} x={[xVal]} y={[verticalShift]} />
  </div>

  const { title, options, hints } = generateOptionsAndHints("infinite", tempQuestion, false)

  const question = <div className="flex vertical center medium-gap">
    {title}
    {tempQuestion}
  </div>

  return { question, title: <></>, input: options, hints }
}

const removableGraphQuestion = (): any => {
  const xVal: number = getRandomNumber(-8, 8); // xval where there is a potential discontinuity
  const y1 = getRandomNumber(-7, 7);
  const y2 = getRandomNumber(0, 10) <= 3 ? y1 : getRandomWithExclusions(-7, 7, [y1])
  const f1 = generateRandomPolynomialWithPoint(getRandomNumber(1, 4), xVal, y1)
  const f2 = generateRandomPolynomialWithPoint(getRandomNumber(1, 4), xVal, y1)
  const functions: GraphFunction[] = [
    {
      f: (x: number) => f1.evaluate({ x }),
      min: -11,
      max: xVal,
      includeLeft: false,
      includeRight: false,
      leftArrow: true,
      rightArrow: false,
      classes: 'f',
      leftCircle: false,
      rightCircle: true
    },
    {
      f: (x: number) => f2.evaluate({ x }),
      min: xVal,
      max: 11,
      includeLeft: false,
      includeRight: false,
      leftArrow: false,
      rightArrow: true,
      classes: 'f',
      leftCircle: true,
      rightCircle: true
    }
  ];

  const points: GraphPoint[] = [
    {
      x: xVal,
      y: y2,
      classes: 'f'
    }
  ]

  let tempQuestion: React.JSX.Element = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={functions} size={GRAPH_SIZE} points={points} />
  </div>

  const { title, options, hints } = generateOptionsAndHints("removable", tempQuestion, y1 === y2)
  const question = <div className="flex vertical center medium-gap">
    {title}
    {tempQuestion}
  </div>

  return { question, title: <></>, input: options, hints }
}

const generateOptionsAndHints =
  (graphType: string, question: React.JSX.Element, continuous?: boolean): any => {
    let title: React.JSX.Element;
    let options: Option[];
    const hints = []
    hints.push(
      <>
        <div>
          Recall our 3 types of discontinuities:
        </div>
        <div>
          <ul className="text-start">
            <li>
              <div>
                a <strong>removable</strong> discontinuity - when only the value of the function
                is inconsistent with the rest of the graph
              </div>
            </li>
            <li>
              a <strong>jump</strong> discontinuity - when there is a jump in the graph
            </li>
            <li>
              an <strong>infinite</strong> discontinuity - when a graph has asymptotes
            </li>
          </ul>
        </div>
      </>)

    if (continuous || getRandomNumber(0, 1) === 0) {
      title = <h3>
        Is the graph below continuous?
      </h3>

      options = [
        {
          component: <div>Yes</div>,
          correct: continuous
        },
        {
          component: <div>No</div>,
          correct: !continuous
        },
      ]

      hints.push(
        <>
          <div>
            Looking at the graph, {continuous ? "none of these discontinuities are present" : `we see a${graphType === "infinite" ? 'n' : ''} ${graphType} discontinuity.`}
          </div>
        </>,
        <>
          <div>
            Thus, the correct answer is:
          </div>
          <div className="hint-ans input correct ans">
            {continuous ? options[0].component : options[1].component}
          </div>
        </>
      )
    } else {
      title = <h3>
        What type  of discontinuity is shown in the graph below?
      </h3>

      options = [
        {
          component: <div>Jump Discontinuity</div>,
          correct: graphType === "jump"
        },
        {
          component: <div>Infinite Discontinuity</div>,
          correct: graphType === "infinite"
        },
        {
          component: <div>Removable Discontinuity</div>,
          correct: graphType === "removable"
        }
      ]

      hints.push(
        <>
          <div>
            Looking at the graph, {`we see a${graphType === "infinite" ? 'n' : ''} ${graphType} discontinuity.`}
          </div>
        </>,
        <>
          <div>
            Thus, the correct answer is:
          </div>
          <div className="hint-ans input correct ans">
            {graphType === "jump" ? options[0].component : graphType === "infinite" ? options[1].component : options[2].component}
          </div>
        </>
      )
    }

    return { title, options, hints }
  }

const generateRandomQuestion = (): Question => {
  let question: any;
  const rand = getRandomNumber(0, 11);
  if (rand <= 3) {
    question = removableGraphQuestion();
  } else if (rand <= 7) {
    question = infiniteGraphQuestion();
  } else {
    question = jumpGraphQuestion();
  }

  question.type = 'mc'

  document.documentElement.style.setProperty('--random-color',
    COLORS[getRandomNumber(0, COLORS.length - 1)])

  return question
}

export default generateRandomQuestion