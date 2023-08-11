import { useEffect, useRef } from 'react';
import * as d3 from 'd3'

const LimitAnimation = () => {
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
      .data([data, data2, data3.reverse()]) // Pass an array of datasets
      .enter().append('path')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', (_, i) => i === 0 ? 'blue' : 'red')
      .attr('stroke-width', (_, i) => i === 0 ? 2 : 4)
      .attr('d', d => line(d));

    svg.selectAll('.point')
      .data([data, data2, data3])
      .enter().append('g')
      .selectAll('.point')
      .data((d, i) => d.map((data) => ({ ...data, index: i })))
      .enter().append('circle')
      .attr('class', 'point')
      .attr('class', (d) => d.index === 0 ? '' : 'animate')
      .attr('cx', d => xScale(d.label))
      .attr('cy', d => yScale(d.value))
      .attr('r', function (d, i) {
        if ((d.index === 1 && i === 1) ||
          (d.index === 2 && i === 0) ||
          (d.index === 0 && d.label === 3.0)) {
          return 4;
        }
        return 0;
      })
      .attr('fill', d => d.index === 0 ? 'blue' : 'red');

    const animateGreenLines = () => {
      const greenLines = svg.selectAll('.line')
        .filter((_, i) => i !== 0); // Exclude the first dataset (blue line)

      greenLines
        .attr('stroke-dasharray', function () {
          const totalLength = this.getTotalLength();
          return `${totalLength} ${totalLength}`;
        })
        .attr('stroke-dashoffset', function () {
          const totalLength = this.getTotalLength();
          return totalLength;
        })
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .on('start', animatePoints);
    }

    const animatePoints = () => {
      const points = svg.selectAll('.animate');

      points.transition()
        .duration(500) // Adjust the animation duration as needed
        .ease(d3.easeLinear)
        .tween('position', function (d) {
          const line = d3.select(this.parentNode)
            .datum();
    
          const xInterpolator = d3.interpolate(line[0].label, line[line.length - 1].label);
    
          const point = d3.select(this);
    
          return function (t) {
            const x = xScale(xInterpolator(t));
            const y = yScale(d3.interpolateNumber(line[0].value, line[line.length - 1].value)(t));
    
            // Calculate radius based on t (from 0 to 1) and scale it from 0 to 4
    
            point.attr('cx', x).attr('cy', y);
          };
        });
    };

    // Initial animation on mount
    animateGreenLines();

    // Set up interval for animating green lines every 5 seconds
    const animationInterval = setInterval(animateGreenLines, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(animationInterval);

  }, []);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  )

};

export default LimitAnimation;
