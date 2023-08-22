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
import { createFunctionGraph, createBlankCanvas, createArrowMarker } from "../../helpers/graph-helpers";
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';

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

      const { data, id } = createFunctionGraph(svgRef, f, width, height, null, xScale, yScale, fColor)
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

  // offsets
  const axisOffset = 0.3;
  const farDist = 1;
  const closeDist = 0.3;

  // horizontal and vertical arrows
  createLimitLine(svg, line, xval - farDist,
    xval - closeDist,
    axisOffset, axisOffset, 'x-limits', xColor)
  createLimitLine(svg, line, xval + farDist,
    xval + closeDist,
    axisOffset, axisOffset, 'x-limits', xColor)

  svg.append('circle')
    .attr('class', 'fill stroke ' + xColor)
    .attr('cx', xScale(xval))
    .attr('cy', yScale(0))
    .attr('r', 1)

  createLimitLine(svg, line, axisOffset,
    axisOffset,
    yval - farDist, yval - closeDist, 'y-limits', yColor)
  createLimitLine(svg, line, axisOffset,
    axisOffset,
    yval + farDist, yval + closeDist, 'y-limits', yColor)

  svg.append('circle')
    .attr('class', 'fill stroke ' + yColor)
    .attr('cx', xScale(0))
    .attr('cy', yScale(yval))
    .attr('r', 1)

  // function arrows

  // pre work: find points at which function is offset distance away from point
  const dataUpToPoint = data.filter((d) => d.x < xval);

  // create path up to point to get its length
  const pointId = uuidv4();
  svg.append('path')
    .datum(dataUpToPoint)
    .attr('data-uuid', pointId)
    .attr('fill', 'none')
    .attr('d', line);

  // get path length and use that to find points at which to genrate limit arrows
  const farDistLength = xScale(farDist) - xScale(0);
  const closeDistLength = xScale(closeDist) - xScale(0);

  const functionLine = d3.select(`[data-uuid="${id}"]`).node();
  const pathLength = d3.select(`[data-uuid="${pointId}"]`).node().getTotalLength();

  // arrow from the left
  const farPointOne = functionLine.getPointAtLength(pathLength - farDistLength)
  const closePointOne = functionLine.getPointAtLength(pathLength - closeDistLength)
  const pointsOne = convertScale(farPointOne, closePointOne, xScale, yScale)
  const offsetsOne = findOffsets(pointsOne, axisOffset, yval);

  if (isNaN(offsetsOne.y)) offsetsOne.y = axisOffset;

  createLimitLine(svg, line,
    pointsOne.farx + offsetsOne.x,
    pointsOne.closex + offsetsOne.x,
    pointsOne.fary + offsetsOne.y,
    pointsOne.closey + offsetsOne.y,
    'f-limits', fColor)

  // arrow from the right
  const farPointTwo = functionLine.getPointAtLength(pathLength + farDistLength)
  const closePointTwo = functionLine.getPointAtLength(pathLength + closeDistLength)
  const pointsTwo = convertScale(farPointTwo, closePointTwo, xScale, yScale);
  const offsetsTwo = findOffsets(pointsTwo, axisOffset, yval);

  if (isNaN(offsetsTwo.y)) offsetsTwo.y = axisOffset;

  createLimitLine(svg, line,
    pointsTwo.farx + offsetsTwo.x,
    pointsTwo.closex + offsetsTwo.x,
    pointsTwo.fary + offsetsTwo.y,
    pointsTwo.closey + offsetsTwo.y,
    'f-limits', fColor)

  // text at point

  // get offset values
  const pointsText = convertScale(farPointOne, farPointTwo, xScale, yScale);
  const offsetsText = findOffsets(pointsText, 3 * axisOffset, yval);

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
    .attr('x', xScale(xval + (offsetsText.x)))
    .attr('y', yScale(yval + offsetsText.y))
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('class', 'text')
    .style('font-size', textSize)
    .text(`(${xval}, ${Math.round(yval)})`)
}

/**
 * perpendicular slope from points
 * @param {object} points object representing points from which to compute slope
 * @returns perpendicular slope from points
 */
function findSlope(points) {
  return (-1 * (points.farx - points.closex)) / (points.fary - points.closey);
}

/**
 * Finds offsets of lines/text from function line
 * @param {object} points object representing points from which line needs to be offset
 * @param {number} axisOffset amount of offset
 * @param {number} yval yval of point
 * @returns x, y representing by how much lines need to move in each direction
 */
function findOffsets(points, axisOffset, yval) {
  let slope = findSlope(points)
  const hyp = findHypotenusefromSlope(1, slope);
  let scale = -1 * axisOffset / hyp;
  if (yval < 0) scale *= -1;
  if (slope > 0) scale *= -1
  const x = scale;
  const y = (scale) * slope;

  return { x, y }
}

/**
 * converts points from svg scale to normal -10 to 10 x/y
 * @param {object} far far point
 * @param {object} close close point
 * @param {scale} xScale xscale of graph
 * @param {scale} yScale yscale of graph
 * @returns points object with converted x/y values
 */
function convertScale(far, close, xScale, yScale) {
  const farx = xScale.invert(far.x)
  const closex = xScale.invert(close.x)
  const fary = yScale.invert(far.y)
  const closey = yScale.invert(close.y)
  return { farx, closex, fary, closey }
}

/**
 * 
 * @param {svg} svg svg in which to append limit line
 * @param {function} line function for 'd' attribute of path
 * @param {number} x1 x1 of line
 * @param {number} x2 x2 of line
 * @param {number} y1 y1 of line
 * @param {number} y2 y2 of line
 * @param {string} name of arrow markers on line
 * @param {string} classes custom classes o add to generated arrow
 */
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

/**
 * finds hypotenuse frm width/height of triangle
 * @param {number} x width
 * @param {number} y height
 * @returns hypotenuse of triangle formed with width/height
 */
function findHypotenusefromSlope(x, y) {
  return Math.sqrt(((x) ** 2) + ((y) ** 2))
}

export default LimitExampleGraph