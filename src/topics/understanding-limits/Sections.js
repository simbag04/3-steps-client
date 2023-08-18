import './styles.css'
import LimitExampleGraph from "./LimitExampleGraph"
import Latex from '../../helpers/Latex'
import * as math from 'mathjs'


const Section1 = () => {
  return (
    <div>
      In Calculus, a limit describes how a function behaves <strong>near</strong> a point, instead of <strong>at</strong> that point
  </div>
  )
}

const Section2 = () => {
  return (
    <div>
      A limit is written as
      <span dangerouslySetInnerHTML={{__html: ` \\( \\color{var(--color1)}{\\lim}_\\color{var(--color2)}{{x \\to a}} \\color{var(--color3)}{f(x)} = \\color{var(--color4)}L \\)`}}></span>
    </div>
  )
}

const Section3 = () => {
  return (
    <div>
      This is read as "the
      <span className="c1"> limit</span> of 
      <span className="c3" dangerouslySetInnerHTML={{__html: `\\(f(x)\\)`}}/>
      <span className="c2"> as  
        <span dangerouslySetInnerHTML={{__html: ` \\(x\\) `}} />
        approaches  
        <span dangerouslySetInnerHTML={{__html: ` \\(a\\) `}} />
      </span> 
      is <span className="c4" dangerouslySetInnerHTML={{__html: `\\(L\\)`}}></span>".
  </div>
  )
}

const Section4 = () => {
  return (
    <div>
    To understand this, let’s look at an example: 
    <span dangerouslySetInnerHTML={{__html: ` \\( \\color{var(--color1)}{\\lim}_\\color{var(--color2)}{{x \\to 2}} \\color{var(--color3)}{x^2} = \\color{var(--color4)}4 \\)`}} />
  </div>
  )
}


const Section5 = () => {
  const expression = 'x^2';
  const node = math.parse(expression);
  const f = x => node.evaluate({x});
  const xval = 2;
  const fColor = 'c3';
  const xColor = 'c2';
  const yColor = 'c4';

  return (
    <>
      <div>
        Conceptually, this means that the value of the 
        <span className="c3"> function </span> 
        (in this case <Latex classes={'c3'} expression={`\\(${node.toTex()}\\)`}/>) gets closer and closer to <span className="c4">4</span> as the x-value gets closer and closer to <span className="c2">2</span>.
      </div>
      <div className='flex vertical center'>
        <h3>Graph of <Latex expression={`\\(${node.toTex()}\\)`} /></h3>
        <LimitExampleGraph f={f} xval={xval} y={f(xval)} fColor={fColor} xColor={xColor} yColor={yColor} size={300}/>
      </div>
    </>
  )
}

const Section6 = () => {
  return (
    <div>
      This does not necessarily mean that the value of <Latex classes={'c3'} expression={`\\(f(x) = x^2\\)`} /><strong> at </strong> <Latex classes={'c2'} expression={`\\(x = 2\\)`}/> is <Latex classes={'c4'} expression={`\\(4\\)`}/>
    </div>
  )
}

const Section7 = () => {
  const expression = 'x^2';
  const node = math.parse(expression);
  const f = x => node.evaluate({x});
  const xval = 2;
  const fColor = 'c3';
  const xColor = 'c2';
  const yColor = 'c4';
  return (
    <>
      <div>As an example, let's look at a function <Latex expression={
        `\\(g(x) = \\begin{cases}
          x^2, x \\neq 2 \\\\
          6, x = 2 \\\\
        \\end{cases}\\)`
      } /></div>
      <div className='flex vertical center'>
        <h3>Graph of <Latex expression={`\\(g(x)\\)`} /></h3>
        <LimitExampleGraph f={f} xval={xval} y={6} fColor={fColor} xColor={xColor} yColor={yColor} size={300}/>
      </div>
    </>
  )
}

const Section8 = () => {
  return (
    <div>
      In this case, <Latex expression={` \\( \\color{var(--color1)}{\\lim}_\\color{var(--color2)}{{x \\to 2}} \\color{var(--color3)}{x^2} \\)`} /> is <strong>still </strong><Latex expression={`\\(\\color{var(--color4)}4 \\)`} />, because <strong>near</strong> <Latex classes='c2' expression={`\\(x = 2\\)`} />, <Latex classes='c3' expression={`\\(g(x)\\)`} /> is getting closer and closer to <Latex classes='c4' expression={`\\(4\\)`} />.
    </div>
  )
}

export {Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8}



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