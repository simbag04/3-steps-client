import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BlankCanvas = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 360;
    const height = 360;
    const numCells = 20;

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);


    const xScale = d3.scaleLinear()
      .domain([-1 * numCells / 2, numCells / 2])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([-1 * numCells / 2, numCells / 2])
      .range([height - margin.bottom, margin.top]);

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
        .attr('stroke', '#333333')

      axis.selectAll(".tick text")
        .style('color', '#333333')
    })

    xAxis.selectAll(".tick line")
      .attr("y1", -5)
      .attr("y2", 5)

    yAxis.selectAll(".tick line")
      .attr("x1", -5)
      .attr("x2", 5)

    yAxis.selectAll(".tick text")
      .attr('y', function(d) {
        if (d === 0) return '9'
        return d3.select(this).attr('y');
      })
      .attr('dy', function(d) {
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
      .attr("y1", margin.top)
      .attr("y2", height - margin.top)
      .attr("stroke", "lightgray");

    svg
      .selectAll(".grid-line")
      .data(d3.range(-1 * numCells / 2, numCells / 2 + 1))
      .enter().append("line")
      .attr("class", "grid-line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.left)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d))
      .attr("stroke", "lightgray");
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default BlankCanvas;
