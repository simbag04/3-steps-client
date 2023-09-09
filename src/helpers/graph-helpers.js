import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';
import { FAR_DIST, CLOSE_DIST, AXIS_OFFSET } from "./constants";

/**
 * generates graphing data for mathematical function
 * @param {function} f function for which to generate data
 * @param {int} min domain minimum value
 * @param {int} max domain maximum value
 * @returns array of data with generated values
 */
const generateFunctionData = (f, min, max) => {
  let data = [];

  for (let i = min; i <= max; i += 0.01) {
    const x = i;
    const y = f(i)
    data.push({ x, y });
  }

  return data;
}

/**
 * appends graph of a mathematical function on an svg
 * @param {svg} svg element on which to draw function graph
 * @param {function} f function to graph 
 * @param {number} width width of graph
 * @param {number} height height of graph
 * @param {color} color color of graph
 * @param {scale} xScale xscale of graph
 * @param {scale} yScale yscale of graph
 * @param {string} classes custom string of classes to include in function path/arrows
 * @param {int} min domain minimum value
 * @param {int} max domain maximum value
 * @param {boolean} leftArrow whether there should be an arrow on the left of the graph
 * @param {boolean} rightArrow whether there should be an arrow on the right of the graph
 * @returns data that was used to graph function, id of svg path of function
 */
const createFunctionGraph = (svg, f, width, height, color, xScale, yScale, classes, min, max, leftArrow, rightArrow, type) => {
  let data = generateFunctionData(f, min, max);

  data = data.filter((d) => d.x > Math.min(xScale.invert(0), max) &&
    d.x < Math.max(xScale.invert(width), min) &&
    d.y > yScale.invert(height) &&
    d.y < yScale.invert(0))

  if (type === "asymptotic") {
    if (min > xScale.invert(0)) {
      const y = data[0].y > 0 ? yScale.invert(0) : yScale.invert(height)
      let d = findIntersections(f, y, min + 0.00001, data[0].x, 0.01);
      if (d) data.unshift({x: d, y: f(d)});
    }

    
    if (max < xScale.invert(width)) {
      const y = data[data.length - 1].y > 0 ? yScale.invert(0) : yScale.invert(height)
      let d = findIntersections(f, y, data[data.length - 1].x, max - 0.00001, 0.01);
      if (d) data.push({x: d, y: f(d)});
    }
    
  }
  

  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))

  const markerSize = 5;
  const name = 'function-arrow'
  createArrowMarker(name, svg, markerSize, color, classes)

  const id = uuidv4();
  svg.append('path')
    .datum(data)
    .attr('data-uuid', id)
    .attr('class', 'stroke ' + classes)
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 2)
    .attr('marker-end', rightArrow ? `url(#${name})` : null)
    .attr('marker-start', leftArrow ? `url(#${name})` : null)
    .attr('d', line);

  svg.select(".tick-text").raise();

  return { data, id };
}

function findIntersections(func, y, xMin, xMax, tolerance) {
  var a = xMin;
  var b = xMax;
  
  while (b - a > 0.00001) {
    var xMid = (a + b) / 2;
    var yMid = func(xMid);
    
    if (y > 0 && yMid <= y && y - yMid < tolerance) {
      return xMid;
    }
    if (y < 0 && yMid >= y && yMid - y < tolerance) {
      return xMid;
    }
    
    if (func(xMin) < func(xMax) && yMid < y) {
      a = xMid;
    } else if (func(xMin) < func(xMax)) {
      b = xMid;
    } else if (func(xMin) > func(xMax) && yMid < y) {
      b = xMid;
    } else if (func(xMin) > func(xMax)) {
      a = xMid;
    }
  }

  return (a + b) / 2;
}

/**
 * 
 * @param {svg} svg svg on which to draw function graph
 * @param {Array} functions to graph, each has the f, min/max domain, and includesLeft/includesRight, which indicates whether min/max are included or not
 * @param {int} width of svg
 * @param {int} height of svg
 * @param {scale} xScale of svg
 * @param {scale} yScale of svg
 * 
 * @returns {Array} array of all data and ids of function graphs
 */
const createMultipleFunctionsGraph = (svg, functions, width, height, xScale, yScale) => {
  const dataArray = [];

  for (let i = 0; i < functions.length; i++) {
    const func = functions[i];
    const { data, id } = createFunctionGraph(svg, func.f, width, height, null, xScale, yScale, func.classes, func.min, func.max, func.leftArrow, func.rightArrow, func.type);

    dataArray[dataArray.length] = { data, id };

    if (func.leftCircle) {
      svg
        .append('circle')
        .attr('class', 'fill stroke ' + (func.includeLeft ? '' : 'hole ') + func.classes)
        .attr('cx', xScale(func.min))
        .attr('cy', yScale(func.f(func.min)))
        .attr('r', 3)
    }

    if (func.rightCircle) {
      svg
        .append('circle')
        .attr('class', 'fill stroke ' + (func.includeRight ? '' : 'hole ') + func.classes)
        .attr('cx', xScale(func.max))
        .attr('cy', yScale(func.f(func.max)))
        .attr('r', 3)
    }
  }

  return { dataArray }
}

/**
 * creates -10 by 10 blank canvas on top of which graphs can be drawn 
 * @param {number} width width of graph
 * @param {number} height height of graph
 * @param {Ref} svgRef reference to svg where graph should be drawn
 * @param {number} textSize size of text of graph labels
 * @returns width, height, xscale, and yscale of graph
 */
const createBlankCanvas = (width, height, svgRef, textSize) => {
  const numCells = 20;
  const half = (width / 2) / numCells;
  const color = "#707070"
  const size = 5;

  const svg = d3.select(svgRef.current);
  svg.selectAll("*").remove();

  svg
    .attr('width', width)
    .attr('height', height)

  // scales
  const xScale = d3.scaleLinear()
    .domain([-1 * numCells / 2, numCells / 2])
    .range([half, width - half]);

  const yScale = d3.scaleLinear()
    .domain([-1 * numCells / 2, numCells / 2])
    .range([-1 * half + height, half]);

  // build grid lines
  svg
    .selectAll(".x-grid-line")
    .data(d3.range(-1 * numCells / 2, numCells / 2 + 1))
    .enter().append("line")
    .attr("class", "x-grid-line")
    .attr("x1", d => xScale(d))
    .attr("x2", d => xScale(d))
    .attr("y1", 0)
    .attr("y2", height)
    .attr("stroke", "lightgray");

  svg
    .selectAll(".y-grid-line")
    .data(d3.range(-1 * numCells / 2, numCells / 2 + 1))
    .enter().append("line")
    .attr("class", "y-grid-line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", d => yScale(d))
    .attr("y2", d => yScale(d))
    .attr("stroke", "lightgray");

  // build tick marks on axes
  const tickMarks = svg.append('g')
    .attr('class', 'tick-marks');

  const tickText = svg.append('g')
    .attr('class', 'tick-text')

  // add marks and text to xaxis
  xScale.ticks().forEach(tick => {
    tickMarks.append("line")
      .attr("x1", xScale(tick))
      .attr("x2", xScale(tick))
      .attr("y1", yScale(0) - 4)
      .attr("y2", yScale(0) + 4)
      .attr("stroke", tick === 0 ? "none" : color)
      .attr("stroke-width", 1)

    tickText.append("text")
      .attr("x", xScale(tick) + (tick < 0 ? 1.5 : -1.5))
      .attr("y", yScale(0) + 3)
      .attr('alignment-baseline', 'hanging')
      .attr('text-anchor', tick < 0 ? 'start' : 'end')
      .style('color', 'black')
      .style('font-size', tick === 0 ? 0 : textSize - 4)
      .attr('font-weight', 'bold')
      .text(tick)
  })

  // add marks and text to y axis
  yScale.ticks().forEach(tick => {
    tickMarks.append("line")
      .attr("x1", xScale(0) - 4)
      .attr("x2", xScale(0) + 4)
      .attr("y1", yScale(tick))
      .attr("y2", yScale(tick))
      .attr("stroke", tick === 0 ? "none" : color)
      .attr("stroke-width", 1)

    tickText.append("text")
      .attr("x", xScale(0) - 3)
      .attr("y", yScale(tick) + (tick < 0 ? -1.5 : 1.5))
      .attr('alignment-baseline', tick < 0 ? 'baseline' : 'hanging')
      .attr('text-anchor', 'end')
      .style('color', 'black')
      .style('font-size', tick === 0 ? 0 : textSize - 4)
      .attr('font-weight', 'bold')
      .text(tick)
  })

  // draw actual x and y axes
  const name = "axes-arrow"
  createArrowMarker(name, svg, size, color);

  svg.append("line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", yScale(0))
    .attr("y2", yScale(0))
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr('marker-end', `url(#${name})`)
    .attr('marker-start', `url(#${name})`);

  svg.append("line")
    .attr("x1", xScale(0))
    .attr("x2", xScale(0))
    .attr("y1", height)
    .attr("y2", 0)
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr('marker-end', `url(#${name})`)
    .attr('marker-start', `url(#${name})`);

  return {
    width: width,
    height: height,
    xScale: xScale,
    yScale: yScale
  }
};

/**
 * generates custom arrow marker to be used in graphs of functions
 * @param {string} name identifier name of arrow marker being generated
 * @param {svg} svg svg where marker should be appended
 * @param {number} size size of marker
 * @param {string} color color of marker
 * @param {string} classes custom classes to be added to marker
 */
function createArrowMarker(name, svg, size, color, classes) {
  svg.append("defs").append("marker")
    .attr("id", name)
    .attr('class', 'fill ' + classes)
    .attr("refX", size)
    .attr("refY", size / 2)
    .attr("markerWidth", size)
    .attr("markerHeight", size)
    .attr("orient", "auto-start-reverse")
    .attr('fill', color)
    .append("path")
    .attr("d", `M0,0 V${size} Q${size * 2},${size / 2} 0,0`)
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
 * perpendicular slope from points
 * @param {object} points object representing points from which to compute slope
 * @returns perpendicular slope from points
 */
function findSlope(points) {
  let ans = (-1 * (points.farx - points.closex)) / (points.fary - points.closey)
  return ans;
}

/**
 * Finds offsets of lines/text from function line
 * @param {object} points object representing points from which line needs to be offset
 * @param {number} yval yval of point
 * @returns x, y representing by how much lines need to move in each direction
 */
function findOffsets(points, axisOffset) {
  let slope = findSlope(points)
  const hyp = findHypotenusefromSlope(1, slope);
  let scale = -1 * axisOffset / hyp;
  if (slope > 0) scale *= -1
  const x = scale;
  const y = (scale) * slope;

  return { x, y }
}


/**
 * 
 * @param {svg} svg on which to append lines
 * @param {Element} functionLine line for function
 * @param {int} pathLength length of path up till point
 * @param {scale} xScale of svg
 * @param {scale} yScale of svg
 * @param {function} line function that creates 'd' attribute in svg path
 * @param {String} fColor color of function
 * @param {boolean} right true if the limit line to be drawn should be from the right, false if left
 * @returns points of the line in svg scale
 */

function createFunctionLimitLine(svg, functionLine, pathLength, xScale, yScale, line, fColor, right, markerName) {

  // modify lengths based on if the arrow is from the left or the right
  let farDistLength = xScale(FAR_DIST) - xScale(0);
  farDistLength = right ? farDistLength : (-1 * farDistLength);
  let closeDistLength = xScale(CLOSE_DIST) - xScale(0);
  closeDistLength = right ? closeDistLength : (-1 * closeDistLength)

  // arrow from the left
  const farPoint = functionLine.getPointAtLength(pathLength + farDistLength)
  const closePoint = functionLine.getPointAtLength(pathLength + closeDistLength)
  const pointsOne = convertScale(farPoint, closePoint, xScale, yScale)
  const offsetsOne = findOffsets(pointsOne, AXIS_OFFSET);

  if (isNaN(offsetsOne.y)) offsetsOne.y = AXIS_OFFSET;

  createLimitLine(svg, line,
    pointsOne.farx + offsetsOne.x,
    pointsOne.closex + offsetsOne.x,
    pointsOne.fary + offsetsOne.y,
    pointsOne.closey + offsetsOne.y,
    markerName ? markerName : 'f-limits', fColor)

  return { closePoint, farPoint }
}



export { createFunctionGraph, createBlankCanvas, createArrowMarker, generateFunctionData, createLimitLine, findHypotenusefromSlope, convertScale, findSlope, findOffsets, createMultipleFunctionsGraph, createFunctionLimitLine }
