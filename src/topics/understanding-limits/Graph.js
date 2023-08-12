import { useEffect, useRef } from 'react';
import * as d3 from 'd3'

const Graph = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [];

    for (let i = 0; i <= 5; i += 0.5) {
      data.push({
        label: i,
        value: i ** 2
      })
    }

    const data2 = [
      {
        label: 2.6,
        value: 2.6 ** 2
      },
      {
        label: 2.9,
        value: 2.9 ** 2
      },
    ]

    const data3 = [
      {
        label: 3.1,
        value: 3.1 ** 2
      },
      {
        label: 3.4,
        value: 3.4 ** 2
      },
    ]

    const horizontalGuideline = [
      { label: 0, value: 9 },
      { label: 3, value: 9 }
    ]

    const verticalGuideline = [
      { label: 3, value: 0 },
      { label: 3, value: 9 }
    ]


    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.label)])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale).tickValues([...yScale.ticks(), 9]));

    const line = d3.line()
      .x(d => xScale(d.label))
      .y(d => yScale(d.value));

    svg.selectAll('.guideline')
      .data([horizontalGuideline, verticalGuideline])
      .enter().append('path')
      .attr('class', 'guideline')
      .attr('fill', 'none')
      .attr('stroke', 'gray')
      .attr('stroke-width', 1)
      .attr('d', d => line(d))

    svg.selectAll('.line')
      .data([data, data2, data3.reverse()]) // Pass an array of datasets
      .enter().append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', (_, i) => i === 0 ? 'blue' : 'red')
      .attr('stroke-width', (_, i) => i === 0 ? 2 : 3)
      .attr('d', d => line(d));

    svg.selectAll('.point')
      .data([data, data2, data3])
      .enter().append('g')
      .selectAll('.point')
      .data((d, i) => d.map((data) => ({ ...data, index: i })))
      .enter().append('circle')
      .attr('class', 'point')
      .attr('cx', d => xScale(d.label))
      .attr('cy', d => yScale(d.value))
      .attr('r', function (d, i) {
        if ((d.index === 0 && d.label === 3.0)) {
          return 4;
        }
        return 0;
      })
      .attr('fill', d => d.index === 0 ? 'blue' : 'red');

    const arrowMarker = svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("markerWidth", 0) // Make the arrowhead smaller
      .attr("markerHeight", 0) // Make the arrowhead smaller
      .attr("refX", 0) // Position the arrowhead closer to the endpoint
      .attr("refY", 0)
      .attr("orient", "auto");

    arrowMarker
      .append("path")
      .attr("d", "M0,0 L0,6 L2,3 z") // Smaller arrowhead path
      .style("fill", "#000");

    createArrow(data2[1], { label: 3, value: 9 })
    createArrow(data3[1], { label: 3, value: 9 })

    function createArrow(currentPoint, targetPoint) {
      const angle = Math.atan2(
        yScale(targetPoint.value) - yScale(currentPoint.value),
        xScale(targetPoint.label) - xScale(currentPoint.label)
      ) * (180 / Math.PI);
    
      // Create a group element for the arrow and apply translation
      const arrowGroup = svg
        .append("g")
        .attr("transform", `translate(${xScale(currentPoint.label)}, ${yScale(currentPoint.value)})`);
    
      // Draw the arrow polygon with rotation
      arrowGroup
        .append("polygon")
        .attr("points", [[2, 0], [-8, -6], [-8, 6]].map(p => p.join(",")).join(" "))
        .attr("fill", 'red')
        .attr("transform", `rotate(${angle}, 0, 0)`); // Rotate the arrow based on the calculated angle
    
    }

    svg.selectAll(".text")
      .data([{ label: 3, value: 9 }])
      .enter()
      .append("text")
      .attr('class', 'text')
      .attr('x', d => xScale(d.label))
      .attr('y', d => yScale(d.value))
      .attr("dy", -15)
      .attr("dx", -5)
      .attr("text-anchor", "middle") // Center the label horizontally
      .text(d => `(${d.label}, ${d.value})`)
      .attr("fill", "black");

  }, []);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  )

};

export default Graph;