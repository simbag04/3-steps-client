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

      const { data } = createFunctionGraph(svgRef, f, null, height, width, xScale, yScale, fColor)
      createAllLimitLines(svg, line, xval, yval, xColor, yColor, fColor, xScale, yScale, data);
    }

  }, [svgRef])

  return (
    <svg ref={svgRef} />
  )
}

function createAllLimitLines(svg, line, xval, yval, 
                            xColor, yColor, fColor, 
                            xScale, yScale, data) {
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

  const dataUpToPoint = data.filter((d) => d.x < xval)

  svg.append('path')
    .datum(dataUpToPoint)
    .attr('id', 'point-line')
    .attr('fill', 'none')
    .attr('d', line);

  const farDistLength = xScale(farDist) - xScale(0);
  const closeDistLength = xScale(closeDist) - xScale(0);

  const functionLine = d3.select("#function-line").node()
  const pathLength = d3.select('#point-line').node().getTotalLength();
  
  const farPointOne = functionLine.getPointAtLength(pathLength - farDistLength)
  const closePointOne = functionLine.getPointAtLength(pathLength - closeDistLength)
  const pointsOne = convertScale(farPointOne, closePointOne, xScale, yScale)
  const offsetsOne = findOffsets(pointsOne, axisOffset);

  createLimitLine(svg, line,
    pointsOne.farx + offsetsOne.x,
    pointsOne.closex + offsetsOne.x,
    pointsOne.fary + offsetsOne.y,
    pointsOne.closey + offsetsOne.y,
    'f-limits', fColor)

  const farPointTwo = functionLine.getPointAtLength(pathLength + farDistLength)
  const closePointTwo = functionLine.getPointAtLength(pathLength + closeDistLength)
  const pointsTwo = convertScale(farPointTwo, closePointTwo, xScale, yScale);
  const offsetsTwo = findOffsets(pointsTwo, axisOffset);

  createLimitLine(svg, line,
    pointsTwo.farx + offsetsTwo.x,
    pointsTwo.closex + offsetsTwo.x,
    pointsTwo.fary + offsetsTwo.y,
    pointsTwo.closey + offsetsTwo.y,
    'f-limits', fColor)
}

function findOffsets(points, axisOffset) {
  const slope = (-1 * (points.farx - points.closex)) / (points.fary - points.closey)
  const hyp = findHypotenusefromSlope(1, slope);
  const x = axisOffset / hyp;
  const y = (axisOffset / hyp) * slope;

  return { x, y }
}

function convertScale(far, close, xScale, yScale) {
  const farx = xScale.invert(far.x)
  const closex = xScale.invert(close.x)
  const fary = yScale.invert(far.y)
  const closey = yScale.invert(close.y)
  return { farx, closex, fary, closey }
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

function findHypotenusefromSlope(x, y) {
  return Math.sqrt(((x) ** 2) + ((y) ** 2))
}

export default LimitExampleGraph