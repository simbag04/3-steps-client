import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';

/**
 * generates graphing data for mathematical function
 * @param {function} f function for which to generate data
 * @returns array of data with generated values
 */
const generateFunctionData = (f) => {
  let data = [];

  for (let i = -11; i <= 11; i += 0.01) {
    const x = i;
    const y = f(i)
    data.push({ x, y });
  }

  return data;
}

/**
 * appends graph of a mathematical function on an svg
 * @param {Ref} svgRef reference to svg on which to draw function graph
 * @param {function} f function to graph 
 * @param {number} width width of graph
 * @param {number} height height of graph
 * @param {color} color color of graph
 * @param {scale} xScale xscale of graph
 * @param {scale} yScale yscale of graph
 * @param {string} classes custom string of classes to include in function path/arrows
 * @returns data that was used to graph function, id of svg path of function
 */
const createFunctionGraph = (svgRef, f, width, height, color, xScale, yScale, classes) => {
  const svg = d3.select(svgRef.current)

  let data = generateFunctionData(f);

  data = data.filter((d) => d.x > xScale.invert(0) &&
    d.x < xScale.invert(width) &&
    d.y > yScale.invert(height) &&
    d.y < yScale.invert(0))

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
    .attr('marker-end', `url(#${name})`)
    .attr('marker-start', `url(#${name})`)
    .attr('d', line);

  svg.select(".tick-text").raise();
  
  return { data, id };
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

export { createFunctionGraph, createBlankCanvas, createArrowMarker, generateFunctionData }
