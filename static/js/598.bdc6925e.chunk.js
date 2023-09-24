"use strict";(self.webpackChunklearn_and_run=self.webpackChunklearn_and_run||[]).push([[598],{3997:function(e,s,i){i(9043);var t=i(8832),n=i(184);s.Z=function(e){var s=e.classes,i=e.expression,r=e.display;return(0,n.jsx)("span",{className:s,children:r?(0,n.jsx)(t.BlockMath,{math:i}):(0,n.jsx)(t.InlineMath,{math:i})})}},7279:function(e,s,i){i.d(s,{d:function(){return r}});var t=i(3997),n=i(184),r=function(){return(0,n.jsxs)("div",{className:"important",children:[(0,n.jsx)("h3",{children:"Rules"}),(0,n.jsxs)("ol",{className:"text-start display",children:[(0,n.jsx)("li",{children:(0,n.jsx)(t.Z,{expression:"{\\lim}_{x \\to a}[c f(x)] = c \\cdot {\\lim}_{x \\to a} f(x)",display:!0})}),(0,n.jsx)("li",{children:(0,n.jsx)(t.Z,{expression:"{\\lim}_{x \\to a}[f(x) \\pm g(x)] = {\\lim}_{x \\to a} f(x) \\pm {\\lim}_{x \\to a} g(x)",display:!0})}),(0,n.jsx)("li",{children:(0,n.jsx)(t.Z,{expression:"{\\lim}_{x \\to a}[f(x) \\cdot g(x)] = {\\lim}_{x \\to a} f(x) \\cdot {\\lim}_{x \\to a} g(x)",display:!0})}),(0,n.jsx)("li",{children:(0,n.jsx)(t.Z,{expression:"{\\lim}_{x \\to a}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{{\\lim}_{x \\to a} f(x)}{{\\lim}_{x \\to a} g(x)}, \\text{given } {{\\lim}_{x \\to a} g(x)} \\neq 0",display:!0})}),(0,n.jsx)("li",{children:(0,n.jsx)(t.Z,{expression:"{\\lim}_{x \\to a}[f(x)]^n = \\left[{\\lim}_{x \\to a} f(x)\\right]^n",display:!0})}),(0,n.jsx)("li",{children:(0,n.jsx)(t.Z,{expression:"{\\lim}_{x \\to a}\\left[\\sqrt[n]{f(x)}\\right] = \\sqrt[n]{{\\lim}_{x \\to a} f(x)}",display:!0})}),(0,n.jsx)("li",{children:(0,n.jsx)(t.Z,{expression:"{\\lim}_{x \\to a} c = c",display:!0})})]})]})}},8598:function(e,s,i){i.r(s),i.d(s,{default:function(){return g}});var t=i(3997),n=(i(1602),i(7279)),r=i(184),x=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"There are a variety of properties that can be used to compute limits."}),(0,r.jsxs)("div",{children:["Throughout this section, we will be using the fact that ",(0,r.jsx)(t.Z,{expression:"{\\lim}_{x \\to a} f(x)",classes:"c1"})," and ",(0,r.jsx)(t.Z,{expression:"{\\lim}_{x \\to a} g(x)",classes:"c2"})," exist, and ",(0,r.jsx)(t.Z,{expression:"c",classes:"c3"})," is a constant"]})]})},l=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"This is a list of all the properties we will need. Don't worry about memorizing these yet as we will do an example after this!"}),(0,r.jsx)(n.d,{})]})},o=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Let's work through an example. Suppose that we are ",(0,r.jsx)("strong",{children:"given"})," ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} f(x) = 2"})," and ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} g(x) = 4"})," and we want to find:"]}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} \\left[3f(x) g(x) + \\frac{f(x)^2}{\\sqrt[2]{g(x)}} + 5 \\right]",display:!0})})]})},a=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Since we see a sum, we can start by using rule number ",(0,r.jsx)("strong",{children:"2"})," to split up the limit into:"]}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} 3f(x) g(x) + \\lim_{x \\to 5} \\left[\\frac{f(x)^2}{\\sqrt[2]{g(x)}} \\right] + \\lim_{x \\to 5} 5",display:!0})})]})},c=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Looking at the first term, we see a product of two functions, so let's use rule number ",(0,r.jsx)("strong",{children:"3"})," to split those up. Also, we can use rule number ",(0,r.jsx)("strong",{children:"7"})," for the last term:"]}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"(\\lim_{x \\to 5} 3f(x) \\cdot \\lim_{x \\to 5} g(x)) + \\lim_{x \\to 5} \\left[\\frac{f(x)^2}{\\sqrt[2]{g(x)}} \\right] + 5",display:!0})})]})},d=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Awesome, we see a ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} g(x)"})," that we can replace with 4! Also, we can apply rule number ",(0,r.jsx)("strong",{children:"1"})," to ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} 3f(x)"}),":"]}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"(3 \\lim_{x \\to 5} f(x) \\cdot 4) + \\lim_{x \\to 5} \\left[\\frac{f(x)^2}{\\sqrt[2]{g(x)}} \\right] + 5",display:!0})})]})},h=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["We see ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} f(x)"})," which we can replace with 2!"]}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"(3 \\cdot 2 \\cdot 4) + \\lim_{x \\to 5} \\left[\\frac{f(x)^2}{\\sqrt[2]{g(x)}} \\right] + 5",display:!0})})]})},f=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Simplifying, we have evaluated that the first term is 24! Let's continue with the 2nd term: since we see a fraction, we can use rule number ",(0,r.jsx)("strong",{children:"4"}),"."]}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"24 + \\left[\\frac{\\lim_{x \\to 5} \\left[f(x)^2\\right]}{\\lim_{x \\to 5} \\sqrt[2]{g(x)}} \\right] + 5",display:!0})})]})},j=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Let's use rule number ",(0,r.jsx)("strong",{children:"5"})," for the exponent on top. Also, rule number ",(0,r.jsx)("strong",{children:"6"})," can be applied for the fraction's denominator:"]}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"24 + \\left[\\frac{\\left[\\lim_{x \\to 5} f(x)\\right]^2}{\\sqrt[2]{\\left[\\lim_{x \\to 5} g(x)\\right]}} \\right] + 5",display:!0})})]})},m=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:["Again, we see ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} f(x)"})," and ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} g(x)"})," which we can replace with 2 and 4 respectively!"]}),(0,r.jsx)("div",{children:(0,r.jsx)(t.Z,{expression:"24 + \\left[\\frac{2^2}{\\sqrt[2]{4}} \\right] + 5",display:!0})})]})},p=function(){return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{children:["Simplifying, we get down to ",(0,r.jsx)(t.Z,{expression:"24 + \\frac{4}{2} + 5 = 24 + 2 + 5 = 31"}),"!"]})})},u=function(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"Wow, the problem looked so complicated at the beginning, but our limit properties made it so simple! Limit properties are extremely useful for calculating limits."}),(0,r.jsxs)("div",{children:["In this example, we started with givens: ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} f(x) = 2"})," and ",(0,r.jsx)(t.Z,{expression:"\\lim_{x \\to 5} g(x) = 4"}),". Keep in mind that you can also use graphs or tables to find values of limits, as we learned in previous lessons."]})]})},g=[(0,r.jsx)(x,{}),(0,r.jsx)(l,{}),(0,r.jsx)(o,{}),(0,r.jsx)(a,{}),(0,r.jsx)(c,{}),(0,r.jsx)(d,{}),(0,r.jsx)(h,{}),(0,r.jsx)(f,{}),(0,r.jsx)(j,{}),(0,r.jsx)(m,{}),(0,r.jsx)(p,{}),(0,r.jsx)(u,{})]},1602:function(){}}]);
//# sourceMappingURL=598.bdc6925e.chunk.js.map