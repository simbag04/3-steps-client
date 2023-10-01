"use strict";(self.webpackChunklearn_and_run=self.webpackChunklearn_and_run||[]).push([[10],{5079:function(e,s,i){i(9043);var t=i(8832),r=i(184);s.Z=function(e){var s=e.classes,i=e.expression,n=e.display;return(0,r.jsx)("span",{className:s,children:n?(0,r.jsx)(t.BlockMath,{math:i}):(0,r.jsx)(t.InlineMath,{math:i})})}},4010:function(e,s,i){i.r(s),i.d(s,{default:function(){return n}});var t=i(5079),r=i(184),n=[(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"We've established that directly plugging in values is a great first step towards  evaluating limits, but what if the function is undefined or has a hole at the point?"}),(0,r.jsxs)("div",{children:["As an example, consider ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 3} \\left(\\frac{x^2 - 8x + 15}{x - 3}\\right)"})]})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Directly substituting in ",(0,r.jsx)(t.Z,{expression:"x = 3"}),", we get:"]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 3} \\left(\\frac{x^2 - 8x - 15}{x - 3}\\right) = "})," ",(0,r.jsx)(t.Z,{expression:"\\left(\\frac{(3)^2 - 8(3) + 15}{(3) - 3}\\right) = "}),(0,r.jsx)(t.Z,{expression:"\\frac{0}{0}"})]})]}),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{children:["This means that the function isn't defined at ",(0,r.jsx)(t.Z,{expression:"x = 3"}),". However, this does ",(0,r.jsx)("strong",{children:"not"})," mean that the limit doesn't exist!"]})}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"Let's try to simplify the expression. We can try factoring the numerator:"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 3} \\left(\\frac{x^2 - 8x - 15}{x - 3}\\right) =~ "}),(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 3} \\left(\\frac{(x - 3)(x - 5)}{x - 3}\\right) "})]})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Now, we can cancel the ",(0,r.jsx)(t.Z,{expression:"x - 3"})," from both top and bottom, so we are left with:"]}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 3} (x - 5) = (3) - 5 = -2"})})]}),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{children:["Thus, even though there is a hole at ",(0,r.jsx)(t.Z,{expression:"x = 3"}),", the limit still exists as ",(0,r.jsx)(t.Z,{expression:"x"})," approaches 3. This method of evaluating limits is known as ",(0,r.jsx)("strong",{children:"limits by factoring"})]})}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Another method that we can use is ",(0,r.jsx)("strong",{children:"limits by rationalizing"}),"."]}),(0,r.jsxs)("div",{children:["For example, consider ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 2} \\left(\\frac{x - 2}{\\sqrt{(x - 1)} - 1}\\right)"})]})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"When we attempt to solve the limit with direct substitution, we get:"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 2} \\left(\\frac{x - 2}{\\sqrt{(x - 1)} - 1}\\right) = "})," ",(0,r.jsx)(t.Z,{expression:"\\left(\\frac{(2) - 2}{\\sqrt{((2) - 1)} - 1}\\right) = \\frac{0}{0}"})]})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["To solve this, we can ",(0,r.jsx)("strong",{children:"rationalize"})," the denominator, which basically means getting rid of the root."]}),(0,r.jsxs)("div",{children:["To do this, first we multiply the top and bottom of the fraction with the ",(0,r.jsx)("strong",{children:"conjugate"}),". Remember the formula ",(0,r.jsx)(t.Z,{expression:"(a + b)(a - b) = a^2 - b^2"}),"?"]}),(0,r.jsxs)("div",{children:["A conjugate uses this idea to get rid of a root: in this example, ",(0,r.jsx)(t.Z,{expression:"a = \\sqrt{x - 1}"})," and ",(0,r.jsx)(t.Z,{expression:"b = 1"}),". Since we already have ",(0,r.jsx)(t.Z,{expression:"a - b"}),", we need to multiply top and bottom by ",(0,r.jsx)(t.Z,{expression:"a + b"}),", or ",(0,r.jsx)(t.Z,{expression:"\\sqrt{x - 1} + 1"})]})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"This gives us:"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 2} \\left(\\frac{x - 2}{\\sqrt{(x - 1)} - 1}\\right) =~ "}),(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 2} \\left(\\frac{(x - 2) (\\sqrt{x - 1} + 1)}{(\\sqrt{(x - 1)} - 1)(\\sqrt{x - 1} + 1)}\\right) =~ "})]}),(0,r.jsx)("div",{children:"FOILing the bottom and simplifying, we get:"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 2} \\left(\\frac{(x - 2) (\\sqrt{x - 1} + 1)}{((x - 1) - 1)}\\right) =~ "}),(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 2} \\left(\\frac{(x - 2) (\\sqrt{x - 1} + 1)}{(x - 2)}\\right) =~ "}),(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 2} \\left(\\sqrt{x - 1} + 1\\right) =~ "}),(0,r.jsx)(t.Z,{expression:"\\sqrt{(2) - 1} + 1 =~ 2"})]})]}),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{children:"You may see variations of this problem, such as having the root on the numerator instead of the denominator, or more complex polynomials. However, the key idea will still be to remove the root using rationalization."})}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"Let's move on to our last technique: using trig identities! Consider this example:"}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\cos^2{\\theta}}{1 - \\sin{\\theta}}\\right)"})})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"Evaluating with direct substitution, we get:"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\cos^2{\\theta}}{1 - \\sin{\\theta}}\\right) = "}),(0,r.jsx)(t.Z,{expression:"\\left(\\frac{\\cos^2{\\frac{\\pi}{2}}}{1 - \\sin{\\frac{\\pi}{2}}}\\right) = "}),(0,r.jsx)(t.Z,{expression:"\\left(\\frac{0}{1 - 1}\\right) = \\frac{0}{0}"})]})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["We can use the trig identity ",(0,r.jsx)(t.Z,{expression:"\\sin^2{\\theta} + \\cos^2{\\theta} = 1"})," to simplify this."]}),(0,r.jsxs)("div",{children:["Rearranging the identity, we get ",(0,r.jsx)(t.Z,{expression:"\\cos^2{\\theta} = 1 - \\sin^2{\\theta}"}),". Factoring this, we get ",(0,r.jsx)(t.Z,{expression:"\\cos^2{\\theta} = (1 - \\sin{\\theta})(1 + \\sin{\\theta})"})]})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"Plugging this back into our limit expression, we get:"}),(0,r.jsxs)("div",{children:[(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{\\cos^2{\\theta}}{1 - \\sin{\\theta}}\\right) = "}),(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to \\frac{\\pi}{2}} \\left(\\frac{(1 - \\sin{\\theta})(1 + \\sin{\\theta})}{1 - \\sin{\\theta}}\\right) = "})]}),(0,r.jsxs)("div",{children:["Now, we can cancel the ",(0,r.jsx)(t.Z,{expression:"1 - \\sin{\\theta}"}),", so we get:"]}),(0,r.jsxs)("div",{children:[(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to \\frac{\\pi}{2}} \\left(1 + \\sin{\\theta}\\right) = "}),(0,r.jsx)(t.Z,{expression:"1 + \\sin{\\frac{\\pi}{2}} = 1 + 1 = 2"})]})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"There can be other trig identities that are needed to simplify a limit, but the idea is the same."}),(0,r.jsx)("div",{children:"Like factoring and rationalization, we need to simplify the limit so that we remove the hole in the function. Then, we can use direct substitution to evaluate the limit."})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["The last thing to keep in mind is that these techniques are helpful when the limit is initially ",(0,r.jsx)(t.Z,{expression:"\\frac{0}{0}"}),". In cases where the limit evaluates to ",(0,r.jsx)(t.Z,{expression:"\\frac{c}{0}"}),", where ",(0,r.jsx)(t.Z,{expression:"c"})," is a non-zero constant, the limit ",(0,r.jsx)("strong",{children:"does not exist"})]}),(0,r.jsxs)("div",{children:["For example, consider ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 3} \\left(\\frac{3}{x - 3}\\right)= "})," ",(0,r.jsx)(t.Z,{expression:"\\frac{3}{(3) - 3}= \\frac{3}{0}"}),"."]}),(0,r.jsxs)("div",{children:["In this case, the limit ",(0,r.jsx)("strong",{children:"does not exist"})," because there is an asymptote at ",(0,r.jsx)(t.Z,{expression:"x = 3"})]})]}),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["To summarize, there are 3 ways we can evaluate a limit if we get ",(0,r.jsx)(t.Z,{expression:"\\frac{0}{0}"}),":",(0,r.jsxs)("ol",{className:"start",children:[(0,r.jsx)("li",{children:"Factoring"}),(0,r.jsx)("li",{children:"Rationalizing the root"}),(0,r.jsx)("li",{children:"Using trig identities"})]})]}),(0,r.jsxs)("div",{children:["In cases where the limit evaluates to ",(0,r.jsx)(t.Z,{expression:"\\frac{c}{0}"}),", where ",(0,r.jsx)(t.Z,{expression:"c"})," is a non-zero constant, the limit ",(0,r.jsx)("strong",{children:"does not exist"}),"."]})]})]}}]);
//# sourceMappingURL=10.79a4be0a.chunk.js.map