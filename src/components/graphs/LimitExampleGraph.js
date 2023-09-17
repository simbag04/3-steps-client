/**
 * Creates graph of function f showing limit at xval
 * Parameters: 
 *  - f : function to generate graph of
 *  - xval: xvalue at which to show limit
 *  - y: y of function - could be different from f(xval) if there's a hole, or null if f is undefined at xval
 *  - fColor: classes to add to function graph
 *  - xcolor: classes to add to x limit arrows
 *  - ycolor: classes to add to y limit arrows
 *  - size: size of graph
 */

import { useEffect, useRef } from "react"
import { createFunctionGraph, createBlankCanvas, createFunctionLimitLine, createLimitLine, convertScale, findOffsets } from "../../helpers/graph-helpers";
import { AXIS_OFFSET, CLOSE_DIST, FAR_DIST } from "../../helpers/constants";
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
import '../../styles/graph.css'

const LimitExampleGraph = ({ f, xval, y, fColor, xColor, yColor, size }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const textSize = 12;
      const graphSize = size;
      const { height, width, xScale, yScale } =
        createBlankCanvas(graphSize, graphSize, svgRef, textSize);

      const svg = d3.select(svgRef.current)
      const yval = f(xval);

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

      const { data, id } = createFunctionGraph(svg, f, width, height, null, xScale, yScale, fColor, -11, 11, true, true);
      createAllLimitLines(svg, line, xval, yval,
        xColor, yColor, fColor,
        xScale, yScale, data, id, textSize);

      // hole at xval, yval
      svg
        .append('circle')
        .attr('class', 'hole fill stroke ' + fColor)
        .attr('cx', xScale(xval))
        .attr('cy', yScale(yval))
        .attr('r', 3)

      // point at xval, y
      if (y !== null) {
        svg
          .append('circle')
          .attr('class', 'fill stroke ' + fColor)
          .attr('cx', xScale(xval))
          .attr('cy', yScale(y))
          .attr('r', 3)
      }
    }

  }, [svgRef, f, fColor, xColor, xval, y, yColor, size])

  return (
    <svg ref={svgRef} />
  )
}

/**
 * 
 * @param {svg} svg svg to append lmit lines to
 * @param {function} line functionthat creates 'd' attribute in svg path
 * @param {number} xval xvalue of point where limit is being generated
 * @param {number} yval yvalue of point
 * @param {string} xColor classes to be added to x limit lines
 * @param {string} yColor classes to be added to y limit lines
 * @param {string} fColor classes to be added to f limit lines
 * @param {scale} xScale xscale of graph
 * @param {scale} yScale yscale of graph
 * @param {Array} data array of data for original function
 * @param {id} id id of function path
 * @param {number} textSize text size of label
 */
function createAllLimitLines(svg, line, xval, yval,
  xColor, yColor, fColor,
  xScale, yScale, data, id, textSize) {

  // horizontal and vertical arrows
  createLimitLine(svg, line, xval - FAR_DIST,
    xval - CLOSE_DIST,
    AXIS_OFFSET, AXIS_OFFSET, 'x-limits', xColor)
  createLimitLine(svg, line, xval + FAR_DIST,
    xval + CLOSE_DIST,
    AXIS_OFFSET, AXIS_OFFSET, 'x-limits', xColor)

  svg.append('circle')
    .attr('class', 'fill stroke ' + xColor)
    .attr('cx', xScale(xval))
    .attr('cy', yScale(0))
    .attr('r', 1)

  createLimitLine(svg, line, AXIS_OFFSET,
    AXIS_OFFSET,
    yval - FAR_DIST, yval - CLOSE_DIST, 'y-limits', yColor)
  createLimitLine(svg, line, AXIS_OFFSET,
    AXIS_OFFSET,
    yval + FAR_DIST, yval + CLOSE_DIST, 'y-limits', yColor)

  svg.append('circle')
    .attr('class', 'fill stroke ' + yColor)
    .attr('cx', xScale(0))
    .attr('cy', yScale(yval))
    .attr('r', 1)

  // function arrows
  const dataUpToPoint = data.filter((d) => d.x < xval);

  // create path up to point to get its length
  const pointId = uuidv4();
  svg.append('path')
    .datum(dataUpToPoint)
    .attr('data-uuid', pointId)
    .attr('fill', 'none')
    .attr('d', line);

  // get path length and use that to find points at which to genrate limit arrows
  const functionLine = d3.select(`[data-uuid="${id}"]`).node();
  const pathLength = d3.select(`[data-uuid="${pointId}"]`).node().getTotalLength();

  const leftLine = createFunctionLimitLine(
    svg, functionLine, pathLength, xScale, yScale, line, fColor, false);
  const rightLine = createFunctionLimitLine(
    svg, functionLine, pathLength, xScale, yScale, line, fColor, true);

  const farPointOne = leftLine.farPoint;
  const farPointTwo = rightLine.farPoint;

  // text at point

  // get offset values
  const pointsText = convertScale(farPointOne, farPointTwo, xScale, yScale);
  const offsetsText = findOffsets(pointsText, 3 * AXIS_OFFSET);

  // adjust offset values by ensuring they are a minimum distance away from line
  offsetsText.y = isNaN(offsetsText.y) ? 0.7 : offsetsText.y;
  if (offsetsText.y <= 0) {
    offsetsText.y = Math.min(-0.5, offsetsText.y);
  } else {
    offsetsText.y = Math.max(0.5, offsetsText.y);
  }

  if (offsetsText.x <= 0) {
    offsetsText.x = Math.min(-1.2, offsetsText.x);
  } else {
    offsetsText.x = Math.max(1.2, offsetsText.x);
  }

  // if text is too close to axes, move it on the other side of the line
  if ((xval <= 3 && xval >= 0) && offsetsText.x < 0) {
    offsetsText.x = (offsetsText.x * -1);
    offsetsText.y = offsetsText.y * -1;
  }

  if (xval >= -3 && xval < 0 && offsetsText.x > 0) {
    offsetsText.x = (offsetsText.x * -1);
    offsetsText.y = offsetsText.y * -1;
  }

  // add text
  svg.append('text')
    .attr('x', xScale(xval + offsetsText.x))
    .attr('y', yScale(yval + offsetsText.y))
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('class', 'text')
    .style('font-size', textSize)
    .text(`(${xval}, ${Math.round(yval)})`)
}

export default LimitExampleGraph