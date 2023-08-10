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
      .call(d3.axisLeft(yScale));

    const line = d3.line()
      .x(d => xScale(d.label))
      .y(d => yScale(d.value));


    svg.selectAll('.line')
      .data([data, data2, data3]) // Pass an array of datasets
      .enter().append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', (_, i) => i === 0 ? 'blue' : 'green') // Different colors for different datasets
      .attr('stroke-width', 2)
      .attr('d', d => line(d));

    // Append points for each dataset
    // Append points for both datasets
    svg.selectAll('.point')
      .data([...data, ...data2, ...data3]) // Combine data points from both datasets
      .enter().append('circle')
      .attr('class', 'point')
      .attr('cx', d => xScale(d.label))
      .attr('cy', d => yScale(d.value))
      .attr('r', 4)
      .attr('fill', (_, i) => i < data.length ? 'blue' : 'green');
  }, []);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  )

};

export default Graph;
