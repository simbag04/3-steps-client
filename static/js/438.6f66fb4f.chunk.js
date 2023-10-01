"use strict";(self.webpackChunklearn_and_run=self.webpackChunklearn_and_run||[]).push([[438],{8161:function(t,e,r){var n=r(2791),i=r(9703),a=(r(1602),r(1230)),s=r(184);e.Z=function(t){var e=t.functions,r=t.size,c=t.x,o=t.y,l=(0,n.useRef)(null);return(0,n.useEffect)((function(){if(l.current){var t=(0,i.g)(r,r,l,12),n=t.height,s=t.width,u=t.xScale,x=t.yScale,h=a.Ys(l.current);(0,i.aN)(h,e,s,n,u,x),h.select(".tick-text").raise();for(var f=a.jvg().x((function(t){return u(t.x)})).y((function(t){return x(t.y)})),d=0;d<o.length;d++)h.append("path").datum([{x:u.invert(0),y:o[d]},{x:u.invert(s),y:o[d]}]).attr("class","stroke ").attr("stroke-width",1).style("stroke-dasharray",2).attr("d",f);for(var p=0;p<c.length;p++)h.append("path").datum([{x:c[p],y:x.invert(0)},{x:c[p],y:x.invert(n)}]).attr("class","stroke ").attr("stroke-width",1).style("stroke-dasharray",2).attr("d",f)}}),[e,r,c,o]),(0,s.jsx)("svg",{ref:l})}},3247:function(t,e,r){var n=r(2791),i=r(9703),a=(r(1602),r(1230)),s=r(184);e.Z=function(t){var e=t.functions,r=t.size,c=(0,n.useRef)(null);return(0,n.useEffect)((function(){if(c.current){var t=(0,i.g)(r,r,c,12),n=t.height,s=t.width,o=t.xScale,l=t.yScale,u=a.Ys(c.current);(0,i.aN)(u,e,s,n,o,l),u.select(".tick-text").raise()}}),[e,r]),(0,s.jsx)("svg",{ref:c})}},5079:function(t,e,r){r(9043);var n=r(8832),i=r(184);e.Z=function(t){var e=t.classes,r=t.expression,a=t.display;return(0,i.jsx)("span",{className:e,children:a?(0,i.jsx)(n.BlockMath,{math:r}):(0,i.jsx)(n.InlineMath,{math:r})})}},7532:function(t,e,r){r.d(e,{DM:function(){return c},HM:function(){return s},I3:function(){return a},i$:function(){return n},il:function(){return i}});var n=window.outerWidth<800?1.3:1,i=window.outerWidth<800?.5:.3,a=window.outerWidth<800?.4:.3,s=window.outerWidth<800?250:400,c=["red","green","blue","orange","purple"]},9703:function(t,e,r){r.d(e,{BR:function(){return s},EZ:function(){return c},Q8:function(){return p},aN:function(){return l},g:function(){return u},kc:function(){return f},ku:function(){return d},wu:function(){return h}});var n=r(1230),i=r(4261),a=r(7532),s=function(t,e,r){for(var n=[],i=e;i<=r;i+=.01){var a=i,s=t(i);n.push({x:a,y:s})}return n},c=function(t,e,r,a,c,l,u,h,f,d,p,g,m){var v=s(e,f,d);if(v=v.filter((function(t){return t.x>Math.min(l.invert(0),d)&&t.x<Math.max(l.invert(r),f)&&t.y>u.invert(a)&&t.y<u.invert(0)})),"asymptotic"===m){if(f>l.invert(0)){var y=o(e,v[0].y>0?u.invert(0):u.invert(a),f+1e-5,v[0].x,.01);y&&v.unshift({x:y,y:e(y)})}if(d<l.invert(r)){var j=o(e,v[v.length-1].y>0?u.invert(0):u.invert(a),v[v.length-1].x,d-1e-5,.01);j&&v.push({x:j,y:e(j)})}}var w=n.jvg().x((function(t){return l(t.x)})).y((function(t){return u(t.y)})),k="function-arrow";x(k,t,5,c,h);var Z=(0,i.Z)();return t.append("path").datum(v).attr("data-uuid",Z).attr("class","stroke "+h).attr("fill","none").attr("stroke",c).attr("stroke-width",2).attr("marker-end",g?"url(#".concat(k,")"):null).attr("marker-start",p?"url(#".concat(k,")"):null).attr("d",w),t.select(".tick-text").raise(),{data:v,id:Z}};function o(t,e,r,n,i){for(var a=r,s=n;s-a>1e-5;){var c=(a+s)/2,o=t(c);if(e>0&&o<=e&&e-o<i)return c;if(e<0&&o>=e&&o-e<i)return c;t(r)<t(n)&&o<e?a=c:t(r)<t(n)||t(r)>t(n)&&o<e?s=c:t(r)>t(n)&&(a=c)}return(a+s)/2}var l=function(t,e,r,n,i,a){for(var s=[],o=0;o<e.length;o++){var l=e[o],u=c(t,l.f,r,n,null,i,a,l.classes,l.min,l.max,l.leftArrow,l.rightArrow,l.type),x=u.data,h=u.id;s[s.length]={data:x,id:h},l.leftCircle&&t.append("circle").attr("class","fill stroke "+(l.includeLeft?"":"hole ")+l.classes).attr("cx",i(l.min)).attr("cy",a(l.f(l.min))).attr("r",3),l.rightCircle&&t.append("circle").attr("class","fill stroke "+(l.includeRight?"":"hole ")+l.classes).attr("cx",i(l.max)).attr("cy",a(l.f(l.max))).attr("r",3)}return{dataArray:s}},u=function(t,e,r,i){var a=20,s=t/2/a,c="#707070",o=n.Ys(r.current);o.selectAll("*").remove(),o.attr("width",t).attr("height",e);var l=n.BYU().domain([-10,10]).range([s,t-s]),u=n.BYU().domain([-10,10]).range([-1*s+e,s]);o.selectAll(".x-grid-line").data(n.w6H(-10,11)).enter().append("line").attr("class","x-grid-line").attr("x1",(function(t){return l(t)})).attr("x2",(function(t){return l(t)})).attr("y1",0).attr("y2",e).attr("stroke","lightgray"),o.selectAll(".y-grid-line").data(n.w6H(-10,11)).enter().append("line").attr("class","y-grid-line").attr("x1",0).attr("x2",t).attr("y1",(function(t){return u(t)})).attr("y2",(function(t){return u(t)})).attr("stroke","lightgray");var h=o.append("g").attr("class","tick-marks"),f=o.append("g").attr("class","tick-text");l.ticks().forEach((function(t){h.append("line").attr("x1",l(t)).attr("x2",l(t)).attr("y1",u(0)-4).attr("y2",u(0)+4).attr("stroke",0===t?"none":c).attr("stroke-width",1),f.append("text").attr("x",l(t)+(t<0?1.5:-1.5)).attr("y",u(0)+3).attr("alignment-baseline","hanging").attr("text-anchor",t<0?"start":"end").style("color","black").style("font-size",0===t?0:i-4).attr("font-weight","bold").text(t)})),u.ticks().forEach((function(t){h.append("line").attr("x1",l(0)-4).attr("x2",l(0)+4).attr("y1",u(t)).attr("y2",u(t)).attr("stroke",0===t?"none":c).attr("stroke-width",1),f.append("text").attr("x",l(0)-3).attr("y",u(t)+(t<0?-1.5:1.5)).attr("alignment-baseline",t<0?"baseline":"hanging").attr("text-anchor","end").style("color","black").style("font-size",0===t?0:i-4).attr("font-weight","bold").text(t)}));var d="axes-arrow";return x(d,o,5,c),o.append("line").attr("x1",0).attr("x2",t).attr("y1",u(0)).attr("y2",u(0)).attr("stroke",c).attr("stroke-width",2).attr("marker-end","url(#".concat(d,")")).attr("marker-start","url(#".concat(d,")")),o.append("line").attr("x1",l(0)).attr("x2",l(0)).attr("y1",e).attr("y2",0).attr("stroke",c).attr("stroke-width",2).attr("marker-end","url(#".concat(d,")")).attr("marker-start","url(#".concat(d,")")),{width:t,height:e,xScale:l,yScale:u}};function x(t,e,r,n,i){e.append("defs").append("marker").attr("id",t).attr("class","fill "+i).attr("refX",r).attr("refY",r/2).attr("markerWidth",r).attr("markerHeight",r).attr("orient","auto-start-reverse").attr("fill",n).append("path").attr("d","M0,0 V".concat(r," Q").concat(2*r,",").concat(r/2," 0,0"))}function h(t,e,r,i,a,s,c,o){n.Ys("#".concat(c)).empty()&&x(c,t,4,null,o),t.append("path").datum([{x:r,y:a},{x:i,y:s}]).attr("class","stroke "+o).attr("stroke-width",1).attr("marker-end","url(#".concat(c,")")).attr("d",e)}function f(t,e,r,n){return{farx:r.invert(t.x),closex:r.invert(e.x),fary:n.invert(t.y),closey:n.invert(e.y)}}function d(t,e){var r=function(t){return-1*(t.farx-t.closex)/(t.fary-t.closey)}(t),n=function(t,e){return Math.sqrt(Math.pow(t,2)+Math.pow(e,2))}(1,r),i=-1*e/n;return r>0&&(i*=-1),{x:i,y:i*r}}function p(t,e,r,n,i,s,c,o,l){var u=n(a.i$)-n(0);u=o?u:-1*u;var x=n(a.il)-n(0);x=o?x:-1*x;var p=e.getPointAtLength(r+u),g=e.getPointAtLength(r+x),m=f(p,g,n,i),v=d(m,a.I3);return isNaN(v.y)&&(v.y=a.I3),h(t,s,m.farx+v.x,m.closex+v.x,m.fary+v.y,m.closey+v.y,l||"f-limits",c),{closePoint:g,farPoint:p}}},7438:function(t,e,r){r.r(e),r.d(e,{default:function(){return R}});var n=r(5079),i=r(2791),a=r(9703),s=(r(1602),r(1230)),c=r(184),o=function(t){var e=t.functions,r=t.size,n=(0,i.useRef)(null);return(0,i.useEffect)((function(){if(n.current){var t=(0,a.g)(r,r,n,12),i=t.height,c=t.width,o=t.xScale,l=t.yScale,u=s.Ys(n.current),x=s.jvg().x((function(t){return o(t.x)})).y((function(t){return l(t.y)})),h=(0,a.aN)(u,e,c,i,o,l).dataArray,f=s.Ys('[data-uuid="'.concat(h[0].id,'"]')).node(),d=f.getTotalLength(),p=s.Ys('[data-uuid="'.concat(h[1].id,'"]')).node();(0,a.Q8)(u,f,d,o,l,x,"c2",!1,"right"),(0,a.Q8)(u,p,0,o,l,x,"c3",!0,"left"),u.select(".tick-text").raise()}}),[e,r]),(0,c.jsx)("svg",{ref:n})},l=r(8729),u=r(3247),x=r(8161),h=r(7532),f=l.Qc("-x"),d=l.Qc("0.5x + 4"),p=[{f:function(t){return f.evaluate({x:t})},min:-11,max:-2,includeLeft:!0,includeRight:!1,leftArrow:!0,rightArrow:!1,classes:"c4",leftCircle:!1,rightCircle:!0},{f:function(t){return d.evaluate({x:t})},min:-2,max:11,includeLeft:!0,includeRight:!0,leftArrow:!1,rightArrow:!0,classes:"c4",leftCircle:!0,rightCircle:!1}],g=l.Qc("-1/(x - 1) + 1"),m=l.Qc("1/(x - 1) + 1"),v=[{f:function(t){return g.evaluate({x:t})},min:-11,max:1,includeLeft:!0,includeRight:!1,leftArrow:!0,rightArrow:!0,classes:"c4",leftCircle:!1,rightCircle:!1,type:"asymptotic"},{f:function(t){return m.evaluate({x:t})},min:1,max:11,includeLeft:!1,includeRight:!0,leftArrow:!0,rightArrow:!0,classes:"c4",leftCircle:!1,rightCircle:!1,type:"asymptotic"}],y=l.Qc("sin(1/x)"),j=[{f:function(t){return y.evaluate({x:t})},min:-11,max:11,includeLeft:!1,includeRight:!0,leftArrow:!0,rightArrow:!0,classes:"c4",leftCircle:!1,rightCircle:!1}],w=function(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{children:["Consider a graph ",(0,c.jsx)(n.Z,{expression:"f(x)",inline:!0})," that has a jump: What can we say about ",(0,c.jsx)(n.Z,{expression:"\\ {\\lim}_{x \\to -2} f(x)",inline:!0}),"?"]}),(0,c.jsxs)("div",{className:"flex vertical center",children:[(0,c.jsxs)("h3",{children:["Graph of ",(0,c.jsx)(n.Z,{expression:"f(x)",inline:!0})]}),(0,c.jsx)(u.Z,{functions:p,size:h.HM})]})]})},k=function(){return(0,c.jsxs)("div",{children:["The graph seems to be approaching different values from the left and right! This brings us to the concept of ",(0,c.jsx)("strong",{children:"one-sided limits"})," (in other words, limits from the left or right)"]})},Z=function(){return(0,c.jsxs)("div",{children:["The notation to write a limit approaching from the left is ",(0,c.jsx)(n.Z,{expression:"{\\lim}_{x \\to a^{-}}f(x)",inline:!0}),", with a minus sign on the top right of the number."]})},A=function(){return(0,c.jsxs)("div",{children:["Similarly, the notation for a limit approaching from the right is ",(0,c.jsx)(n.Z,{expression:"{\\lim}_{x \\to a^{+}}f(x)",inline:!0}),", with a plus sign instead of a minus sign."]})},b=function(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{children:["What is ",(0,c.jsx)(n.Z,{classes:"c2",expression:"{\\lim}_{x \\to -2^{-}}f(x)",inline:!0})," and ",(0,c.jsx)(n.Z,{classes:"c3",expression:"{\\lim}_{x \\to -2^{+}}f(x)",inline:!0}),"?"]}),(0,c.jsxs)("div",{className:"flex vertical center",children:[(0,c.jsxs)("h3",{children:["Graph of ",(0,c.jsx)(n.Z,{expression:"f(x)",inline:!0})]}),(0,c.jsx)(o,{functions:p,size:h.HM})]})]})},_=function(){return(0,c.jsxs)("div",{children:["Looking at the graph, ",(0,c.jsx)(n.Z,{classes:"c2",expression:"{\\lim}_{x \\to -2^{-}}f(x) = 2",inline:!0})," and ",(0,c.jsx)(n.Z,{classes:"c3",expression:"{\\lim}_{x \\to -2^{+}}f(x) = 3",inline:!0})]})},C=function(){return(0,c.jsxs)("div",{children:["Since ",(0,c.jsx)(n.Z,{classes:"c2",expression:"{\\lim}_{x \\to -2^{-}}f(x)",inline:!0})," ",(0,c.jsx)(n.Z,{expression:"\\neq",inline:!0})," ",(0,c.jsx)(n.Z,{classes:"c3",expression:"{\\lim}_{x \\to -2^{+}}f(x)",inline:!0}),", ",(0,c.jsx)(n.Z,{expression:"{\\lim}_{x \\to -2}f(x)",inline:!0})," ",(0,c.jsx)("strong",{children:"does not exist"}),"."]})},M=function(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{children:["Let's consider another type of graph: one with asymptotes. What can we say about ",(0,c.jsx)(n.Z,{expression:"\\lim_{x \\to 1}g(x)",inline:!0}),"?"]}),(0,c.jsxs)("div",{className:"flex vertical center",children:[(0,c.jsxs)("h3",{children:["Graph of ",(0,c.jsx)(n.Z,{expression:"g(x)",inline:!0})]}),(0,c.jsx)(x.Z,{functions:v,size:h.HM,x:[1],y:[1]})]})]})},L=function(){return(0,c.jsxs)("div",{children:["It seems that near ",(0,c.jsx)(n.Z,{expression:"x = 1",inline:!0}),", the graph is approaching infinity. This is another case where the limit ",(0,c.jsx)("strong",{children:"does not exist"}),"."]})},N=function(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)("div",{children:["Lastly, let's consider an oscillating graph. What can we say about ",(0,c.jsx)(n.Z,{expression:"\\lim_{x \\to 0}h(x)",inline:!0}),"?"]}),(0,c.jsxs)("div",{className:"flex vertical center",children:[(0,c.jsxs)("h3",{children:["Graph of ",(0,c.jsx)(n.Z,{expression:"h(x)",inline:!0})]}),(0,c.jsx)(u.Z,{functions:j,size:h.HM})]})]})},W=function(){return(0,c.jsxs)("div",{children:["The graph's behavior around ",(0,c.jsx)(n.Z,{expression:"x=0",inline:!0})," is oscillating so densely that we cannot see what the graph is approaching near that point. Therefore, once again, the limit ",(0,c.jsx)("strong",{children:"does not exist"}),"."]})},z=function(){return(0,c.jsx)(c.Fragment,{children:(0,c.jsxs)("div",{children:["To summarize, there are 3 cases where a limit does not exist:",(0,c.jsxs)("ol",{className:"start",children:[(0,c.jsx)("li",{children:"When the limit from the left does not equal the right"}),(0,c.jsx)("li",{children:"When the graph is approaching positive or negative infinity at the point"}),(0,c.jsx)("li",{children:"When the graph is oscillating at the point"})]})]})})},R=[(0,c.jsx)(w,{}),(0,c.jsx)(k,{}),(0,c.jsx)(Z,{}),(0,c.jsx)(A,{}),(0,c.jsx)(b,{}),(0,c.jsx)(_,{}),(0,c.jsx)(C,{}),(0,c.jsx)(M,{}),(0,c.jsx)(L,{}),(0,c.jsx)(N,{}),(0,c.jsx)(W,{}),(0,c.jsx)(z,{})]},1602:function(){}}]);
//# sourceMappingURL=438.6f66fb4f.chunk.js.map