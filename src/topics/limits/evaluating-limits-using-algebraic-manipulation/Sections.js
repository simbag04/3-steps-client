import Latex from "../../../components/latex/Latex";

const Section1 =
  <>
    <div>
      We've established that directly plugging in values is a great first step towards  evaluating limits, but what if the function is undefined or has a hole at the point?
    </div>
    <div>
      As an example, consider <Latex expression={`\\lim_{x \\to 3} \\left(\\frac{x^2 - 8x + 15}{x - 3}\\right)`} />
    </div>
  </>

const Section2 =
  <>
    <div>
      Directly substituting in <Latex expression={`x = 3`} />, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 3} \\left(\\frac{x^2 - 8x - 15}{x - 3}\\right) = `} /> <Latex expression={`\\left(\\frac{(3)^2 - 8(3) + 15}{(3) - 3}\\right) = `} />
      <Latex expression={`\\frac{0}{0}`} />
    </div>
  </>

const Section3 =
  <>
    <div>
      This means that the function isn't defined at <Latex expression={`x = 3`} />. However, this does <strong>not</strong> mean that the limit doesn't exist!
    </div>
  </>

const Section4 =
  <>
    <div>
      Let's try to simplify the expression. We can try factoring the numerator:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 3} \\left(\\frac{x^2 - 8x - 15}{x - 3}\\right) =~ `} />
      <Latex expression={`\\lim_{x \\to 3} \\left(\\frac{(x - 3)(x - 5)}{x - 3}\\right) `} />
    </div>
  </>

const Section5 =
  <>
    <div>
      Now, we can cancel the <Latex expression={`x - 3`} /> from both top and bottom, so we are left with:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 3} (x - 5) = (3) - 5 = -2`} />
    </div>
  </>

const Section6 =
  <>
    <div>
      Thus, even though there is a hole at <Latex expression={`x = 3`} />, the limit still exists as <Latex expression={`x`} /> approaches 3. This method of evaluating limits is known as <strong>limits by factoring</strong>
    </div>
  </>

const Section7 =
  <>
    <div>
      Another method that we can use is <strong>limits by rationalizing</strong>.
    </div>
    <div>
      For example, consider <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{x - 2}{\\sqrt{(x - 1)} - 1}\\right)`} />
    </div>
  </>

const Section8 =
  <>
    <div>
      When we attempt to solve the limit with direct substitution, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{x - 2}{\\sqrt{(x - 1)} - 1}\\right) = `} /> <Latex expression={`\\left(\\frac{(2) - 2}{\\sqrt{((2) - 1)} - 1}\\right) = \\frac{0}{0}`} />
    </div>
  </>

const Section9 =
  <>
    <div>
      To solve this, we can <strong>rationalize</strong> the denominator, which basically means getting rid of the root.
    </div>
    <div>
      To do this, first we multiply the top and bottom of the fraction with the <strong>conjugate</strong>. Remember the formula <Latex expression={`(a + b)(a - b) = a^2 - b^2`} />?
    </div>
    <div>
      A conjugate uses this idea to get rid of a root: in this example, <Latex expression={`a = \\sqrt{x - 1}`} /> and <Latex expression={`b = 1`} />. Since we already have <Latex expression={`a - b`} />, we need to multiply top and bottom by <Latex expression={`a + b`} />, or <Latex expression={`\\sqrt{x - 1} + 1`} />
    </div>
  </>

const Section10 =
  <>
    <div>
      This gives us:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{x - 2}{\\sqrt{(x - 1)} - 1}\\right) =~ `} />
      <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{(x - 2) (\\sqrt{x - 1} + 1)}{(\\sqrt{(x - 1)} - 1)(\\sqrt{x - 1} + 1)}\\right) =~ `} />

    </div>
    <div>
      FOILing the bottom and simplifying, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{(x - 2) (\\sqrt{x - 1} + 1)}{((x - 1) - 1)}\\right) =~ `} />
      <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{(x - 2) (\\sqrt{x - 1} + 1)}{(x - 2)}\\right) =~ `} />
      <Latex expression={`\\lim_{x \\to 2} \\left(\\sqrt{x - 1} + 1\\right) =~ `} />
      <Latex expression={`\\sqrt{(2) - 1} + 1 =~ 2`} />
    </div>
  </>

const Section11 =
  <>
    <div>
      You may see variations of this problem, such as having the root on the numerator instead of the denominator, or more complex polynomials. However, the key idea will still be to remove the root using rationalization.
    </div>
  </>

const Section12 =
  <>
    <div>
      Let's move on to our last technique: using trig identities! Consider this example:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\cos^2{\\theta}}{1 - \\sin{\\theta}}\\right)`} />
    </div>
  </>

const Section13 =
  <>
    <div>
      Evaluating with direct substitution, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\cos^2{\\theta}}{1 - \\sin{\\theta}}\\right) = `} />
      <Latex expression={`\\left(\\frac{\\cos^2{\\frac{\\pi}{2}}}{1 - \\sin{\\frac{\\pi}{2}}}\\right) = `} />
      <Latex expression={`\\left(\\frac{0}{1 - 1}\\right) = \\frac{0}{0}`} />
    </div>
  </>

const Section14 =
  <>
    <div>
      We can use the trig identity <Latex expression={`\\sin^2{\\theta} + \\cos^2{\\theta} = 1`} /> to simplify this.
    </div>
    <div>
      Rearranging the identity, we get <Latex expression={`\\cos^2{\\theta} = 1 - \\sin^2{\\theta}`} />. Factoring this, we get <Latex expression={`\\cos^2{\\theta} = (1 - \\sin{\\theta})(1 + \\sin{\\theta})`} />
    </div>
  </>

const Section15 =
  <>
    <div>
      Plugging this back into our limit expression, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\cos^2{\\theta}}{1 - \\sin{\\theta}}\\right) = `} />
      <Latex expression={`\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{(1 - \\sin{\\theta})(1 + \\sin{\\theta})}{1 - \\sin{\\theta}}\\right) = `} />
    </div>
    <div>
      Now, we can cancel the <Latex expression={`1 - \\sin{\\theta}`} />, so we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to \\frac{\\pi}{2}} \\left(1 + \\sin{\\theta}\\right) = `} />
      <Latex expression={`1 + \\sin{\\frac{\\pi}{2}} = 1 + 1 = 2`} />
    </div>
  </>

const Section16 =
  <>
    <div>
      There can be other trig identities that are needed to simplify a limit, but the idea is the same.
    </div>
    <div>
      Like factoring and rationalization, we need to simplify the limit so that we remove the hole in the function. Then, we can use direct substitution to evaluate the limit.
    </div>
  </>

const Section17 =
  <>
    <div>
      The last thing to keep in mind is that these techniques are helpful when the limit is initially <Latex expression={`\\frac{0}{0}`} />. In cases where the limit evaluates to <Latex expression={`\\frac{c}{0}`} />, where <Latex expression={`c`} /> is a non-zero constant, the limit <strong>does not exist</strong>
    </div>
    <div>
      For example, consider <Latex expression={`\\lim_{x \\to 3} \\left(\\frac{3}{x - 3}\\right)= `} /> <Latex expression={`\\frac{3}{(3) - 3}= \\frac{3}{0}`} />.
    </div>
    <div>
      In this case, the limit <strong>does not exist</strong> because there is an asymptote at <Latex expression={`x = 3`} />
    </div>
  </>

const Section18 =
  <>
    <div>
      To summarize, there are 3 ways we can evaluate a limit if we get <Latex expression={`\\frac{0}{0}`} />:
      <ol className="start">
        <li>
          Factoring
        </li>
        <li>
          Rationalizing the root
        </li>
        <li>
          Using trig identities
        </li>
      </ol>
    </div>
    <div>
      In cases where the limit evaluates to <Latex expression={`\\frac{c}{0}`} />, where <Latex expression={`c`} /> is a non-zero constant, the limit <strong>does not exist</strong>.
    </div>
  </>
export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13, Section14, Section15, Section16, Section17, Section18 }