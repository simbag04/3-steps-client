import { getRandomNumber, getRandomWithExclusions, shuffleArray } from "../../../helpers/functions";
import { fitPointsToQuadratic, generateRandomPolynomialWithPoint } from "../../../helpers/expression-generators"
import { GraphFunction } from "../../../types/GraphFunction";
import React from "react";
import Latex from "../../../components/latex/Latex";
import FunctionGraph from "../../../components/content-components/graphs/FunctionGraph";
import AsymptoticGraph from "../../../components/content-components/graphs/AsymptoticGraph";
import { GRAPH_SIZE } from "../../../helpers/constants";
import { Option } from "../../../types/Option";
import { Question } from "../../../types/Question";
import * as math from "mathjs"
import { COLORS } from "../../../helpers/constants";
import { GraphPoint } from "../../../types/GraphPoint";


const generateRandomJumpQuestion = (): any => {
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
      includeLeft: !includeLeft,
      includeRight: false,
      leftArrow: false,
      rightArrow: true,
      classes: 'f',
      leftCircle: true,
      rightCircle: true
    }
  ];

  let question: React.JSX.Element = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={functions} size={GRAPH_SIZE} />
  </div>

  let title: React.JSX.Element;
  let options: Option[];

  if (y1 === y2 || getRandomNumber(0, 1) === 0) {
    title = <h3>
      Is the graph below continuous?
    </h3>

    options = [
      {
        component: <div>Yes</div>,
        correct: y1 === y2
      },
      {
        component: <div>No</div>,
        correct: y1 !== y2
      },
    ]
  } else {
    title = <h3>
      What type  of discontinuity is shown in the graph below?
    </h3>

    options = [
      {
        component: <div>Jump Discontinuity</div>,
        correct: true
      },
      {
        component: <div>Infinite Discontinuity</div>,
        correct: false
      },
      {
        component: <div>Removable Discontinuity</div>,
        correct: false
      }
    ]
  }

  const hints = []
  return { question, title, input: options, hints }
}

const infiniteGraphQuestion = () => {
  const xVal = getRandomNumber(-7, 7); // values at which there will be an asymptote
  let f = `(${getRandomNumber(0, 1) === 0 ? "-" : ""}1/
    (x ${xVal > 0 ? `-${xVal}`: `+${Math.abs(xVal)}`})`; // function

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

  const question = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <AsymptoticGraph functions={functions} size={GRAPH_SIZE} x={[xVal]} y={[verticalShift]} />
  </div>

  let title: React.JSX.Element;
  let options: Option[];

  if (getRandomNumber(0, 1) === 0) {
    title = <h3>
      Is the graph below continuous?
    </h3>

    options = [
      {
        component: <div>Yes</div>,
        correct: false
      },
      {
        component: <div>No</div>,
        correct: true
      },
    ]
  } else {
    title = <h3>
      What type  of discontinuity is shown in the graph below?
    </h3>
    options = [
      {
        component: <div>Jump Discontinuity</div>,
        correct: false
      },
      {
        component: <div>Infinite Discontinuity</div>,
        correct: true
      },
      {
        component: <div>Removable Discontinuity</div>,
        correct: false
      }
    ]
  }

  const hints = []
  return { question, title, input: options, hints }
}

const removableGraphQuestion = (): any => {
  const xVal: number = getRandomNumber(-8, 8); // xval where there is a potential discontinuity
  const y1 = getRandomNumber(-7, 7);
  const y2 = getRandomNumber(0, 10) <= 5 ? y1 : getRandomWithExclusions(-7, 7, [y1])
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

  let question: React.JSX.Element = <div className="flex vertical center medium-gap">
    <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
    <FunctionGraph functions={functions} size={GRAPH_SIZE} points={points} />
  </div>

  let title: React.JSX.Element;
  let options: Option[];

  if (y1 === y2 || getRandomNumber(0, 1) === 0) {
    title = <h3>
      Is the graph below continuous?
    </h3>

    options = [
      {
        component: <div>Yes</div>,
        correct: y1 === y2
      },
      {
        component: <div>No</div>,
        correct: y1 !== y2
      },
    ]
  } else {
    title = <h3>
      What type  of discontinuity is shown in the graph below?
    </h3>

    options = [
      {
        component: <div>Jump Discontinuity</div>,
        correct: false
      },
      {
        component: <div>Infinite Discontinuity</div>,
        correct: false
      },
      {
        component: <div>Removable Discontinuity</div>,
        correct: true
      }
    ]
  }

  const hints = []
  return { question, title, input: options, hints }
}

const generateRandomQuestion = (): Question => {
  let question: any;
  const rand = getRandomNumber(0, 9);
  if (rand <= 9) {
    question = removableGraphQuestion();
  }

  question.type = 'mc'

  document.documentElement.style.setProperty('--random-color',
  COLORS[getRandomNumber(0, COLORS.length - 1)])

  return question
}

export default generateRandomQuestion