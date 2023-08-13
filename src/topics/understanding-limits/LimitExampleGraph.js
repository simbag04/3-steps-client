import { useEffect, useRef } from "react"
import { createFunctionGraph } from "../../helpers/graph-helpers";
import * as d3 from 'd3';

const LimitExampleGraph = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const color = 'green'
      const f = x => x ** 2
      const { xScale, yScale } = createFunctionGraph(svgRef, f, color);
      const svg = d3.select(svgRef.current)

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