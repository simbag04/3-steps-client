import Graph from "./Graph"
import './styles.css'
import BlankCanvas from "./BlankCanvas"

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
      This means that the 
      <span className="c1"> limit</span> of 
      <span className="c3" dangerouslySetInnerHTML={{__html: `\\(f(x)\\)`}}/>
      <span className="c2"> as  
        <span dangerouslySetInnerHTML={{__html: ` \\(x\\) `}} />
        approaches  
        <span dangerouslySetInnerHTML={{__html: ` \\(a\\) `}} />
      </span> 
      is <span className="c4" dangerouslySetInnerHTML={{__html: `\\(L\\)`}}></span>.
  </div>
  )
}

const Section4 = () => {
  return (
    <div>
    To understand this, let’s look at an example: 
    <span dangerouslySetInnerHTML={{__html: ` \\( \\color{var(--color1)}{\\lim}_\\color{var(--color2)}{{x \\to 3}} \\color{var(--color3)}{x^2} = \\color{var(--color4)}9 \\)`}} />
  </div>
  )
}

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
        <span dangerouslySetInnerHTML={{__html: ` \\(3\\) `}} /> 
      </span> is 
      <span className="c4" dangerouslySetInnerHTML={{__html: ` \\(9\\) `}} />
    </div>
  )
}

const Section7 = () => {
  return (
    <>
      <div>
        Conceptually, this means that the value of the 
        <span className="c3"> function </span> 
        (in this case <span className="c3" dangerouslySetInnerHTML={{__html: ` \\(x^2\\)`}} />) gets closer and closer to <span className="c4">9</span> as the x-value gets closer and closer to <span className="c2">3</span>.
      </div>
      <div>
        <BlankCanvas />
      </div>
    </>
  )
}

export {Section1, Section2, Section3, Section4, Section5, Section6, Section7}