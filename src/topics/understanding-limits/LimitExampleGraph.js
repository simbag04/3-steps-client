import { useEffect, useRef } from "react"
import createBlankCanvas from "./BlankCanvas";
import * as d3 from 'd3';

const LimitExampleGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const { height, width, xScale, yScale } = createBlankCanvas(svgRef);
      const svg = d3.select(svgRef.current)
      let data = [];
      const f = x => (6 * x ** 5);

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


      svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("refX", markerSize)
        .attr("refY", markerSize/2)
        .attr("markerWidth", markerSize)
        .attr("markerHeight", markerSize)
        .attr("orient", "auto-start-reverse")
        .attr('fill', 'blue')
        .append("path")
        .attr("d", `M0,0 V${markerSize} Q${markerSize*2},${markerSize/2} 0,0`)

      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrowhead)')
        .attr('marker-start', 'url(#arrowhead)') 
        .attr('d', line);

      svg.selectAll('.point')
        .data([{ x: 3, y: 9 }])
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.x))
        .attr('cy', d => yScale(d.y))
        .attr('r', 3)
        .attr('fill', 'blue')
        .attr('stroke', 'blue')

    }
  }, [svgRef])

  return (
    <svg ref={svgRef} />
  )
}

export default LimitExampleGraph