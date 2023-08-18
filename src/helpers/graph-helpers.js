import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';

const generateFunctionData = (f) => {
  let data = [];

  for (let i = -11; i <= 11; i += 0.001) {
    const x = i;
    const y = f(i)
    data.push({ x, y });
  }

  return data;
}

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

  return { data, id };
}

const createBlankCanvas = (width, height, svgRef, textSize) => {
  const numCells = 20;
  const half = (width / 2) / numCells;
  const color = "#707070"
  const size = 5;

  const svg = d3.select(svgRef.current)
    .attr('width', width)
    .attr('height', height)

  const xScale = d3.scaleLinear()
    .domain([-1 * numCells / 2, numCells / 2])
    .range([half, width - half]);

  const yScale = d3.scaleLinear()
    .domain([-1 * numCells / 2, numCells / 2])
    .range([-1 * half + height, half]);

  const xAxis = svg.append('g')
    .attr('class', 'tick')
    .attr('transform', `translate(0, ${xScale(0)})`)
    .call(d3.axisBottom(xScale).tickFormat(d => d === 0 ? "" : d));

  const yAxis = svg.append('g')
    .attr('class', 'tick')
    .attr('transform', `translate(${yScale(0)}, 0)`)
    .call(d3.axisLeft(yScale).tickFormat(d => d === 0 ? "" : d));

  [xAxis, yAxis].map((axis) => {
    axis.selectAll(".tick path")
      .attr('stroke', 'none')

    axis.selectAll(".tick line")
      .attr('stroke', color)

    axis.selectAll(".tick text")
      .style('color', 'black')
      .style('font-size', textSize / 2)
      .attr('dx', 4)
      .attr('dy', -2)
      .attr('font-weight', 'bold')

    return true;
  })


  xAxis.selectAll(".tick line")
    .attr("y1", -4)
    .attr("y2", 4)

  yAxis.selectAll(".tick line")
    .attr("x1", -4)
    .attr("x2", 4)

    /*
  yAxis.selectAll(".tick text")
    .attr('y', function (d) {
      if (d === 0) return '9'
      return d3.select(this).attr('y');
    })
    .attr('dy', function (d) {
      if (d === 0) return '0.71em'
      return d3.select(this).attr('dy')
    })
*/

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


  // x and y axes
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
