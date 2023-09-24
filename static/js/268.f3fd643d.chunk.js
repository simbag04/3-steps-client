"use strict";(self.webpackChunklearn_and_run=self.webpackChunklearn_and_run||[]).push([[268],{3247:function(e,t,i){var n=i(2791),s=i(9703),r=(i(1602),i(1230)),l=i(184);t.Z=function(e){var t=e.functions,i=e.size,a=(0,n.useRef)(null);return(0,n.useEffect)((function(){if(a.current){var e=(0,s.g)(i,i,a,12),n=e.height,l=e.width,x=e.xScale,c=e.yScale,o=r.Ys(a.current);(0,s.aN)(o,t,l,n,x,c),o.select(".tick-text").raise()}}),[t,i]),(0,l.jsx)("svg",{ref:a})}},1102:function(e,t,i){i.d(t,{$:function(){return c}});var n=i(7762),s=i(9439),r=i(2791),l=i(9256),a=i(3997),x=i(184),c=function(e){var t=e.xTitle,i=e.yTitle,c=e.data,o=(0,r.useRef)(null),u=(0,r.useState)(0),f=(0,s.Z)(u,2),d=f[0],h=f[1],m=(0,r.useRef)(null),p=(0,l.i)()[0],j=(0,r.useState)("horizontal"),v=(0,s.Z)(j,2),g=v[0],_=v[1];return(0,r.useEffect)((function(){var e=o.current;if(e){var t=new ResizeObserver((function(t){var i,s=(0,n.Z)(t);try{for(s.s();!(i=s.n()).done;){var r=i.value;r.target===e&&("horizontal"===g&&(m.current=r.contentRect.width),h(r.contentRect.width))}}catch(l){s.e(l)}finally{s.f()}}));return t.observe(e),function(){t.unobserve(e),t.disconnect()}}}),[o,p,g]),(0,r.useEffect)((function(){d>.8*p?_("vertical"):m&&m.current&&m.current<.8*p&&_("horizontal")}),[d,p]),(0,x.jsx)("table",{ref:o,className:"function-table",children:(0,x.jsxs)("tbody",{className:"flex ".concat(g),children:[(0,x.jsxs)("tr",{children:[(0,x.jsx)("th",{children:(0,x.jsx)(a.Z,{expression:t})}),(0,x.jsx)("th",{children:(0,x.jsx)(a.Z,{expression:i})})]}),c.map((function(e,t){return(0,x.jsxs)("tr",{className:t%2===0?"table-color-1":"table-color-2",children:[(0,x.jsx)("td",{children:e.x}),(0,x.jsx)("td",{children:e.y})]},t)}))]})})}},7279:function(e,t,i){i.d(t,{d:function(){return r}});var n=i(3997),s=i(184),r=function(){return(0,s.jsxs)("div",{className:"important",children:[(0,s.jsx)("h3",{children:"Rules"}),(0,s.jsxs)("ol",{className:"text-start display",children:[(0,s.jsx)("li",{children:(0,s.jsx)(n.Z,{expression:"{\\lim}_{x \\to a}[c f(x)] = c \\cdot {\\lim}_{x \\to a} f(x)",display:!0})}),(0,s.jsx)("li",{children:(0,s.jsx)(n.Z,{expression:"{\\lim}_{x \\to a}[f(x) \\pm g(x)] = {\\lim}_{x \\to a} f(x) \\pm {\\lim}_{x \\to a} g(x)",display:!0})}),(0,s.jsx)("li",{children:(0,s.jsx)(n.Z,{expression:"{\\lim}_{x \\to a}[f(x) \\cdot g(x)] = {\\lim}_{x \\to a} f(x) \\cdot {\\lim}_{x \\to a} g(x)",display:!0})}),(0,s.jsx)("li",{children:(0,s.jsx)(n.Z,{expression:"{\\lim}_{x \\to a}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{{\\lim}_{x \\to a} f(x)}{{\\lim}_{x \\to a} g(x)}, \\text{given } {{\\lim}_{x \\to a} g(x)} \\neq 0",display:!0})}),(0,s.jsx)("li",{children:(0,s.jsx)(n.Z,{expression:"{\\lim}_{x \\to a}[f(x)]^n = \\left[{\\lim}_{x \\to a} f(x)\\right]^n",display:!0})}),(0,s.jsx)("li",{children:(0,s.jsx)(n.Z,{expression:"{\\lim}_{x \\to a}\\left[\\sqrt[n]{f(x)}\\right] = \\sqrt[n]{{\\lim}_{x \\to a} f(x)}",display:!0})}),(0,s.jsx)("li",{children:(0,s.jsx)(n.Z,{expression:"{\\lim}_{x \\to a} c = c",display:!0})})]})]})}},9551:function(e,t,i){i.r(t);var n=i(1102),s=i(3247),r=i(7198),l=i(9316),a=i(3997),x=i(8729),c=i(7532),o=i(7279),u=i(184);t.default=function(){return document.documentElement.style.setProperty("--random-color",c.DM[(0,l.xT)(0,c.DM.length-1)]),function(){var e=[],t=(0,l.iP)(-9,9,[-1,0,1]),i=(0,l.lx)(5,(0,l.xT)(0,1)),f=(0,l.Fe)(t,i,t-2,t+2).data,d=(0,u.jsx)(n.$,{xTitle:"x",yTitle:"f(x)",data:f}),h=(0,r.Cd)(3,t,(0,l.iP)(-7,7,[-1,0,1])),m=[{f:function(e){return h.evaluate({x:e})},min:-11,max:11,includeLeft:!1,includeRight:!1,leftArrow:!0,rightArrow:!0,classes:"f",leftCircle:!1,rightCircle:!1}],p=(0,u.jsxs)("div",{className:"flex vertical center medium-gap",children:[(0,u.jsxs)("h3",{children:["Graph of ",(0,u.jsx)(a.Z,{expression:"g(x)",inline:!0})]}),(0,u.jsx)(s.Z,{functions:m,size:c.HM})]}),j=(0,u.jsxs)("div",{className:"flex vertical center medium-gap",children:[d,p]});e.push({f:"x",value:i[2]}),e.push({f:"y",value:Math.round(h.evaluate({x:t}))});var v=(0,r.rY)(e,["^","+","-","*","/"]),g=String(x.ku(v,(0,l.Xy)(e)));return v=(v=(v=(v=(v=x.NC(v).toTex({parenthesis:"auto"})).replaceAll("x","f(x)")).replaceAll("y","g(x)")).replaceAll("~","")).replaceAll("~{ ","{"),{question:j,title:(0,u.jsx)(u.Fragment,{children:(0,u.jsx)("h2",{children:"Evaluate the limit using the figures provided. "})}),ans:g,type:"frq",nextToInput:(0,u.jsx)(a.Z,{expression:"\\lim_{x \\to ".concat(t,"}\\left[").concat(v,"\\right] = "),display:!0}),hints:[(0,u.jsxs)("div",{className:"flex vertical center medium-gap",children:[(0,u.jsxs)("span",{children:["First, evaluate ",(0,u.jsx)(a.Z,{expression:"\\lim_{x \\to ".concat(t,"} f(x)")})," using the table and ",(0,u.jsx)(a.Z,{expression:"\\lim_{x \\to ".concat(t,"} g(x)")})," using the graph. "]}),d,p]}),(0,u.jsxs)("div",{className:"flex vertical center medium-gap",children:["Now, the limit expression can be evaluated by using this list of properties!",(0,u.jsx)(o.d,{})]})]}}()}}}]);
//# sourceMappingURL=268.f3fd643d.chunk.js.map