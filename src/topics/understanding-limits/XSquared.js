import { useEffect, useRef } from "react"
import createBlankCanvas from "./BlankCanvas";
import * as d3 from 'd3';

const XSquared = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const { xScale, yScale } = createBlankCanvas(svgRef);
      const svg = d3.select(svgRef.current)
      const data = [];

      for (let i = -11; i <= 11; i += 0.01) {
        data.push({ x: i, y: i ** 2 });
      }

      const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 1.5)
        .attr('d', line);

      svg.selectAll('.point')
        .data([{ x: 3, y: 9 }])
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 2)
        .attr('fill', 'blue')
        .attr('stroke', 'blue')
    }
  }, [svgRef])

  return (
    <svg ref={svgRef} />
  )
}

export default XSquared