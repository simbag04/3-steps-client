import LimitExampleGraph from "../../../components/content-components/graphs/LimitExampleGraph"
import Latex from "../../../components/latex/Latex"
import * as math from 'mathjs'
import { GRAPH_SIZE } from "../../../helpers/constants"
import React from "react"
import { PiecewiseFunction } from "../../../@types/PiecewiseFunction"
import { Piecewise } from "../../../components/latex/Piecewise"

/**
 * All content for this topic's learn section
 * all these components represent content for the sections
 */
const Section1 = () => {
  return (
    <div>
      In Calculus, a limit describes how a function behaves <strong>near</strong> a point, instead of <strong>at</strong> that point.
    </div>
  )
}

const Section2 = () => {
  return (
    <div>
      A limit is written as <Latex expression={`\\ {\\lim}`} classes={'c1'} inline={true} />
      <Latex expression={`_{x \\to a}`} classes={'c2'} inline={true} />
      <Latex expression={`f(x)`} classes={'c3'} inline={true} />
      <Latex expression={`\\ =\\ `} inline={true} />
      <Latex expression={`\\ L `} classes={'c4'} inline={true} />.
    </div>
  )
}

const Section3 = () => {
  return (
    <div>
      This is read as "the
      <span className="c1"> limit</span> of
      <Latex expression={`f(x)`} classes={'c3'} inline={true} />
      <span className="c2"> as
        <Latex expression={`\\ x\\ `} inline={true} />
        approaches
        <Latex expression={`\\ a\\ `} inline={true} />
      </span>
      is <Latex classes="c4" expression={`\\ L\\ `} inline={true} />".
    </div>
  )
}

const Section4 = () => {
  return (
    <div>
      To understand this, let’s look at an example:
      <Latex expression={`\\ {\\lim}`} classes={'c1'} inline={true} />
      <Latex expression={`_{x \\to 2}`} classes={'c2'} inline={true} />
      <Latex expression={`x^2`} classes={'c3'} inline={true} />
      <Latex expression={`\\ =\\ `} inline={true} />
      <Latex expression={`\\ 4 `} classes={'c4'} inline={true} />.
    </div>
  )
}


const Section5 = () => {
  const expression = 'x^2';
  const node = math.parse(expression);
  const f = x => node.evaluate({ x });
  const xval = 2;
  const fColor = 'c3';
  const xColor = 'c2';
  const yColor = 'c4';

  return (
    <>
      <div>
        Conceptually, this means that the value of the
        <span className="c3"> function </span>
        (in this case <Latex classes={'c3'} expression={`${node.toTex()}`} inline={true} />) gets closer and closer to <span className="c4">4</span> as the x-value gets closer and closer to <span className="c2">2</span>.
      </div>
      <div className='flex vertical center'>
        <h3>Graph of <Latex expression={`${node.toTex()}`} inline={true} /></h3>
        <LimitExampleGraph f={f} xval={xval} y={f(xval)} fColor={fColor} xColor={xColor} yColor={yColor} size={GRAPH_SIZE} />
      </div>
    </>
  )
}

const Section6 = () => {
  return (
    <div>
      This does not necessarily mean that the value of <Latex classes={'c3'} expression={`f(x) = x^2`} inline={true} /><strong> at </strong> <Latex classes={'c2'} expression={`x = 2`} inline={true} /> is <Latex classes={'c4'} expression={`4`} inline={true} />!
    </div>
  )
}

const Section7 = () => {
  const expression = 'x^2';
  const node = math.parse(expression);
  const f = x => node.evaluate({ x });
  const xval = 2;
  const fColor = 'c3';
  const xColor = 'c2';
  const yColor = 'c4';
  const piecewiseFunctions: PiecewiseFunction[] = [
    { f: `x^2`, domain: `x \\neq 2` },
    { f: `6`, domain: `x = 2` }
  ]
  return (
    <>
      <div>As an example, let's look at this function:
      </div>
      <div>
        <Piecewise title="g(x)" functions={piecewiseFunctions} display={true}/>
      </div>
      <div className='flex vertical center'>
        <h3>Graph of <Latex expression={`g(x)`} inline={true} /></h3>
        <LimitExampleGraph f={f} xval={xval} y={6} fColor={fColor} xColor={xColor} yColor={yColor} size={GRAPH_SIZE} />
      </div>
    </>
  )
}

const Section8 = () => {
  return (
    <div>
      In this case,
      <Latex expression={`\\ {\\lim}`} classes={'c1'} inline={true} />
      <Latex expression={`_{x \\to 2}`} classes={'c2'} inline={true} />
      <Latex expression={`x^2`} classes={'c3'} inline={true} />
      <Latex expression={`\\ =\\ `} inline={true} />
      <Latex expression={`\\ 4\\ `} classes={'c4'} inline={true} />
      is <strong>still </strong><Latex expression={`4`} classes={`c4`} inline={true} />,
      because <strong>near </strong>
      <Latex classes='c2' expression={`x = 2`} inline={true} />,
      <Latex classes='c3' expression={`\\ g(x)`} inline={true} /> is getting closer and closer to <Latex classes='c4' expression={`4`} inline={true} />.
    </div>
  )
}

export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8 }



//////////////////// UNUSED  ///////////////////////////

/*
const Section5 = () => {
  return (
    <div>
      Can you guess what this means?
    </div>
  )
}

const Section6 = () => {
  return (
    <div>
      This means that the <span className="c1">limit</span> of 
      <span className="c3" dangerouslySetInnerHTML={{__html: ` \\(x^2\\) `}} />
      <span className="c2">as 
        <span dangerouslySetInnerHTML={{__html: ` \\(x\\) `}} /> approaches 
        <span dangerouslySetInnerHTML={{__html: ` \\(2\\) `}} /> 
      </span> is 
      <span className="c4" dangerouslySetInnerHTML={{__html: ` \\(4\\) `}} />
    </div>
  )
}
*/