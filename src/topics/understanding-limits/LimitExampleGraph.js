import { useEffect, useRef } from "react"
import {createBlankCanvas, createArrowMarker} from "./BlankCanvas";
import * as d3 from 'd3';

const LimitExampleGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const { height, width, xScale, yScale } = createBlankCanvas(svgRef);
      const svg = d3.select(svgRef.current)
      let data = [];
      const color = 'red';
      const f = x => (x ** 2);

      for (let i = -11; i <= 11; i += 0.001) {
        const x = i;
        const y = f(i)
        data.push({ x, y });
      }

      data = data.filter((d) => d.x > xScale.invert(0) && 
                                d.x < xScale.invert(width) &&
                                d.y > yScale.invert(height) &&
                                d.y < yScale.invert(0))

      const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

      const markerSize = 5;
      const name = 'function-arrow'
      createArrowMarker(name, svg, markerSize, color)

      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('marker-end', `url(#${name})`)
        .attr('marker-start', `url(#${name})`) 
        .attr('d', line);

      svg.selectAll('.point')
        .data([{ x: 3, y: 9 }])
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 3)
        .attr('fill', color)
        .attr('stroke', color)

    }
  }, [svgRef])

  return (
    <svg ref={svgRef} />
  )
}

export default LimitExampleGraph