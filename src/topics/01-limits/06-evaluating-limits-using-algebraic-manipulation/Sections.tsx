import Latex from "../../../components/latex/Latex";
import React from "react";

const Section1 =
  <>
    <div>
      We've established that directly plugging in values is a great first step towards  evaluating limits, but what if the function is undefined or has a hole at the point?
    </div>
    <div>
      As an example, consider:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 3} \\left(\\frac{x^2 - 8x + 15}{x - 3}\\right)`} display={true} />
    </div>
  </>

const Section2 =
  <>
    <div>
      Directly substituting in <Latex expression={`x = 3`} />, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 3} \\left(\\frac{x^2 - 8x - 15}{x - 3}\\right) = \\left(\\frac{(3)^2 - 8(3) + 15}{(3) - 3}\\right) = \\frac{0}{0}`} display={true} />
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
      <Latex expression={`\\lim_{x \\to 3} \\left(\\frac{x^2 - 8x - 15}{x - 3}\\right) = \\lim_{x \\to 3} \\left(\\frac{(x - 3)(x - 5)}{x - 3}\\right) `} display={true} />
    </div>
  </>

const Section5 =
  <>
    <div>
      Now, we can cancel the <Latex expression={`x - 3`} /> from both top and bottom, so we are left with:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 3} (x - 5) = (3) - 5 = -2`} display={true} />
    </div>
  </>

const Section6 =
  <>
    <div>
      Thus, even though there is a hole at <Latex expression={`x = 3`} />, the limit still exists as <Latex expression={`x`} /> approaches 3. This method of evaluating limits is known as <strong>limits by factoring</strong>.
    </div>
  </>

const Section7 =
  <>
    <div>
      Another method that we can use is <strong>limits by rationalizing</strong>.
    </div>
    <div>
      For example, consider:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{x - 2}{\\sqrt{(x - 1)} - 1}\\right)`} display={true} />
    </div>
  </>

const Section8 =
  <>
    <div>
      When we attempt to solve the limit with direct substitution, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{x - 2}{\\sqrt{(x - 1)} - 1}\\right) = \\left(\\frac{(2) - 2}{\\sqrt{((2) - 1)} - 1}\\right) = \\frac{0}{0}`} display={true} />
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
      A conjugate uses this idea to get rid of a root: in this example, <Latex expression={`a = \\sqrt{x - 1}`} /> and <Latex expression={`b = 1`} />. Since we already have <Latex expression={`a - b`} />, we need to multiply top and bottom by <Latex expression={`a + b`} />, or <Latex expression={`\\sqrt{x - 1} + 1`} />.
    </div>
  </>

const Section10 =
  <>
    <div>
      This gives us:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{x - 2}{\\sqrt{(x - 1)} - 1}\\right) = \\lim_{x \\to 2} \\left(\\frac{(x - 2) (\\sqrt{x - 1} + 1)}{(\\sqrt{(x - 1)} - 1)(\\sqrt{x - 1} + 1)}\\right)`} display={true} />

    </div>
    <div>
      FOILing the bottom and simplifying, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 2} \\left(\\frac{(x - 2) (\\sqrt{x - 1} + 1)}{((x - 1) - 1)}\\right) = \\lim_{x \\to 2} \\left(\\frac{(x - 2) (\\sqrt{x - 1} + 1)}{(x - 2)}\\right)`} display={true} />
    </div>
    <div>
      Finally, we see a factor we can cancel: <Latex expression="x - 2" />! Then, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 2} \\left(\\sqrt{x - 1} + 1\\right) = \\sqrt{(2) - 1} + 1 =~ 2`} display={true} />
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
      <Latex expression={`\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\cos^2{\\theta}}{1 - \\sin{\\theta}}\\right)`} display={true} />
    </div>
  </>

const Section13 =
  <>
    <div>
      Evaluating with direct substitution, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\cos^2{\\theta}}{1 - \\sin{\\theta}}\\right) = \\left(\\frac{\\cos^2{\\frac{\\pi}{2}}}{1 - \\sin{\\frac{\\pi}{2}}}\\right) = \\left(\\frac{0}{1 - 1}\\right) = \\frac{0}{0}`} display={true} />
    </div>
  </>

const Section14 =
  <>
    <div>
      We can use the trig identity <Latex expression={`\\sin^2{\\theta} + \\cos^2{\\theta} = 1`} /> to simplify this.
    </div>
    <div>
      Rearranging the identity, we get: <Latex expression={`\\cos^2{\\theta} = 1 - \\sin^2{\\theta}`} display={true} />
    </div>
    <div>
      Factoring, we get <Latex expression={`\\cos^2{\\theta} = (1 - \\sin{\\theta})(1 + \\sin{\\theta})`} display={true} />
    </div>
  </>

const Section15 =
  <>
    <div>
      Plugging this back into our limit expression, we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\cos^2{\\theta}}{1 - \\sin{\\theta}}\\right) = \\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{(1 - \\sin{\\theta})(1 + \\sin{\\theta})}{1 - \\sin{\\theta}}\\right)`} display={true} />
    </div>
    <div>
      Now, we can cancel the <Latex expression={`1 - \\sin{\\theta}`} />, so we get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to \\frac{\\pi}{2}} \\left(1 + \\sin{\\theta}\\right) = 1 + \\sin{\\frac{\\pi}{2}} = 1 + 1 = 2`} display={true} />
    </div>
  </>

const Section16 =
  <>
    <div>
      We can also use some other limit identities:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\lim_{x \\to 0} \\frac{x}{\\sin x} = 1, \\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 1`} display={true} />
    </div>
    <div>
      These are also extremely useful for solving problems!
    </div>
  </>

const Section17 =
  <>
    <div>
      For example, consider:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin 3x }{\\sin 5x}`} display={true} />
    </div>
    <div>
      In order to use our identities, it would be convenient to have an <Latex expression={`x`} /> on the top and bottom. In order to do this, we can multiply the fraction by <Latex expression={`\\frac{x}{x}`} /> to get:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 0} \\frac{x \\sin 3x}{x \\sin 5x}`} display={true} />
    </div>
  </>

const Section18 =
  <>
    <div>
      Now, let's start with the <Latex expression={`\\sin 3x`} /> on the top. To apply the identity, we need a <Latex expression={`3x`} /> on the bottom to simplify the limit.
    </div>
    <div>
      We can do this by multiplying the whole fraction by <Latex expression={`\\frac{3}{3}`} /> to get: <Latex expression={`\\lim_{x \\to 0} \\frac{3x \\sin 3x}{3x \\sin 5x}`} display={true} />
    </div>
  </>

const Section19 =
  <>
    <div>
      Now, we can apply our identity <Latex expression={`\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1`} /> to the <Latex expression={`\\frac{\\sin 3x}{3x}`} />, and simplify it to just 1. This gives us:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 0} \\frac{3x}{\\sin 5x}`} display={true} />
    </div>
    <div>
      Notice how we did not need just <Latex expression={`x`} /> on the top and bottom to simplify this - as long as we have the same thing inside the <Latex expression={`\\sin`} /> and the other side of the fraction, we can simplify it.
    </div>
  </>

const Section20 =
  <>
    <div>
      Repeating this process for the <Latex expression={`\\sin 5x`} /> on the bottom, we can multiply the whole fraction by <Latex expression={`\\frac{5}{5}`} /> to get <Latex expression={`5x`} /> on the top, and simplify that with <Latex expression={`\\lim_{x \\to 0} \\frac{x}{\\sin x} = 1`} />
    </div>
    <div>
      This gives us
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 0} \\frac{3x}{\\sin 5x} = \\lim_{x \\to 0} \\frac{3 \\cdot 5x}{5 \\sin 5x} = \\frac{3}{5}`} display={true} />
    </div>
  </>

const Section21 =
  <>
    <div>
      These are very commonly used trig identities to simplify limits. The idea is always to simplify the function enough to remove the <Latex expression={`\\frac{0}{0}`} /> and then evaluate the limit with direct substitution.
    </div>
  </>

const Section22 =
  <>
    <div>
      The last thing to keep in mind is that these techniques are helpful when the limit is initially <Latex expression={`\\frac{0}{0}`} />. In cases where the limit evaluates to <Latex expression={`\\frac{c}{0}`} />, where <Latex expression={`c`} /> is a non-zero constant, the limit <strong>does not exist</strong>.
    </div>
    <div>
      For example, consider:
    </div>
    <div>
      <Latex expression={`\\lim_{x \\to 3} \\left(\\frac{3}{x - 3}\\right)= \\frac{3}{(3) - 3}= \\frac{3}{0}`} display={true} />
    </div>
    <div>
      In this case, the limit <strong>does not exist</strong> because there is an asymptote at <Latex expression={`x = 3`} />.
    </div>
  </>

const Section23 =
  <>
    <div>
      To summarize, there are 3 ways we can evaluate a limit if we get <Latex expression={`\\frac{0}{0}`} />:
      <ol className="start">
        <li>
          Factoring.
        </li>
        <li>
          Rationalizing the root.
        </li>
        <li>
          Using trig identities.
        </li>
      </ol>
    </div>
    <div>
      In cases where the limit evaluates to <Latex expression={`\\frac{c}{0}`} />, where <Latex expression={`c`} /> is a non-zero constant, the limit <strong>does not exist</strong>.
    </div>
  </>
export { Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10, Section11, Section12, Section13, Section14, Section15, Section16, Section17, Section18, Section19, Section20, Section21, Section22, Section23 }