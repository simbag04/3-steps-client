import { useEffect, useRef } from "react"
import { createFunctionGraph, createBlankCanvas, createArrowMarker } from "../../helpers/graph-helpers";
import * as d3 from 'd3';

const LimitExampleGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const f = x => x ** 2
      const { height, width, xScale, yScale } = createBlankCanvas(svgRef);
      const svg = d3.select(svgRef.current)
      const xval = 2;
      const yval = f(xval);

      const fColor = 'c3';
      const xColor = 'c2';
      const yColor = 'c4';

      const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

      // dashed lines going to x and y axes
      svg.append('path')
        .datum([{ x: 0, y: yval }, { x: xval, y: yval }])
        .attr('class', 'stroke ' + yColor)
        .attr('stroke-width', 2)
        .style('stroke-dasharray', 2)
        .attr('d', line)

      svg.append('path')
        .datum([{ x: xval, y: yval }, { x: xval, y: 0 }])
        .attr('class', 'stroke ' + xColor)
        .attr('stroke-width', 2)
        .style('stroke-dasharray', 2)
        .attr('d', line)

      // limit arrow lines
      createAllLimitLines(svg, line, xval, yval, xColor, yColor, fColor, f);

      // point at (2, 4)
      svg.selectAll('.point')
        .data([{ x: xval, y: yval }])
        .enter()
        .append('circle')
        .attr('class', 'fill stroke ' + fColor)
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 3)

      // text point
      svg.append('text')
        .attr('x', xScale(xval + 0.2))
        .attr('y', yScale(yval))
        .attr('class', 'text')
        .text(`(${xval}, ${yval})`)

      createFunctionGraph(svgRef, f, null, height, width, xScale, yScale, fColor)
    }

  }, [svgRef])

  return (
    <svg ref={svgRef} />
  )
}

function createAllLimitLines (svg, line, xval, yval, xColor, yColor, fColor, f) {
  const axisOffset = -0.2;
  const farDist = 1;
  const closeDist = 0.2;

  // horizontal and vertical arrows
  createLimitLine(svg, line, xval - farDist,
    xval - closeDist,
    axisOffset, axisOffset, 'x-limits', xColor)
  createLimitLine(svg, line, xval + farDist,
    xval + closeDist,
    axisOffset, axisOffset, 'x-limits', xColor)
  createLimitLine(svg, line, axisOffset,
    axisOffset,
    yval - farDist, yval - closeDist, 'y-limits', yColor)
  createLimitLine(svg, line, axisOffset,
    axisOffset,
    yval + farDist, yval + closeDist, 'y-limits', yColor)

  // arrows next to function graph
  createLimitLine(svg, line, xval - 0.4 - 0.2, xval - 0.1 - 0.2,
    f(xval - 0.4) + 0.2,
    f(xval - 0.1) + 0.2,
    'f-limits', fColor)
  createLimitLine(svg, line, xval + 0.35 - 0.2, xval + 0.1 - 0.2,
    f(xval + 0.35),
    f(xval + 0.1),
    'f-limits', fColor)
}

function createLimitLine(svg, line, x1, x2, y1, y2, name, classes) {
  if (d3.select(`#${name}`).empty()) {
    createArrowMarker(name, svg, 4, null, classes)
  }

  svg.append('path')
    .datum([{ x: x1, y: y1 }, { x: x2, y: y2 }])
    .attr('class', 'stroke ' + classes)
    .attr('stroke-width', 1)
    .attr('marker-end', `url(#${name})`)
    .attr('d', line)
}

export default LimitExampleGraph