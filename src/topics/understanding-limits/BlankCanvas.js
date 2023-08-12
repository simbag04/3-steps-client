import * as d3 from 'd3';

const createBlankCanvas = (svgRef) => {
  const width = 460;
  const height = 460;
  const numCells = 20;
  const half = (width / 2) / numCells;
  const color = "#707070"

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
    .call(d3.axisLeft(yScale));

  [xAxis, yAxis].map((axis) => {
    axis.selectAll(".tick path, .tick line")
      .attr('stroke', 'none')

    axis.selectAll(".tick text")
      .style('color', 'black')
      .style('padding', '1px')
  })

  xAxis.selectAll(".tick line")
    .attr("y1", -4)
    .attr("y2", 4)
    .attr('stroke', color)

  yAxis.selectAll(".tick line")
    .attr("x1", -4)
    .attr("x2", 4)
    .attr('stroke', color)

  yAxis.selectAll(".tick text")
    .attr('y', function (d) {
      if (d === 0) return '9'
      return d3.select(this).attr('y');
    })
    .attr('dy', function (d) {
      if (d === 0) return '0.71em'
      return d3.select(this).attr('dy')
    })


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
  svg.append("line")
    .attr("x1", xScale(-1 * numCells / 2))
    .attr("x2", xScale(numCells / 2))
    .attr("y1", yScale(0))
    .attr("y2", yScale(0))
    .attr("stroke", color)
    .attr("stroke-width", 2);

  svg.append("line")
    .attr("x1", xScale(0))
    .attr("x2", xScale(0))
    .attr("y1", yScale(-1 * numCells / 2))
    .attr("y2", yScale(numCells / 2))
    .attr("stroke", color)
    .attr("stroke-width", 2);

  createAllTriangles(svg, xScale, yScale, color)

  return {
    width: width,
    height: height,
    xScale: xScale,
    yScale: yScale
  }
};

function createAllTriangles(svg, xScale, yScale, color) {
  const top = [
    [xScale(0.2), yScale(10)],
    [xScale(0), yScale(10.5)],
    [xScale(-0.2), yScale(10)]
  ]

  const bottom = [
    [xScale(0.2), yScale(-10)],
    [xScale(0), yScale(-10.5)],
    [xScale(-0.2), yScale(-10)]
  ]

  const right = [
    [xScale(10.5), yScale(0)],
    [xScale(10), yScale(0.2)],
    [xScale(10), yScale(-0.2)]
  ]

  const left = [
    [xScale(-10.5), yScale(0)],
    [xScale(-10), yScale(0.2)],
    [xScale(-10), yScale(-0.2)]
  ]

  createTriangle(svg, top, color)
  createTriangle(svg, bottom, color)
  createTriangle(svg, right, color)
  createTriangle(svg, left, color)
}

function createTriangle(svg, points, color) {
  const polygonPath = d3.polygonHull(points);

  svg.append('path')
    .attr('d', `M${polygonPath.join('L')}Z`)
    .attr('fill', color)
    .attr('stroke', color)
    .attr('stroke-width', 1);
}

export default createBlankCanvas;
