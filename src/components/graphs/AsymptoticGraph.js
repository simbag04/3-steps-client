import { useEffect, useRef } from "react"
import { createBlankCanvas, createMultipleFunctionsGraph } from "../../helpers/graph-helpers";
import '../../styles/graph.css'
import * as d3 from 'd3';

const AsymptoticGraph = ({ functions, size, x, y }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const { height, width, xScale, yScale } =
        createBlankCanvas(size, size, svgRef, 12);
      const svg = d3.select(svgRef.current)

      createMultipleFunctionsGraph(svg, functions, width, height, xScale, yScale)
      svg.select(".tick-text").raise();

      // dashed lines on asymptotes
      const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

      for (let i = 0; i < y.length; i++) {
        svg.append('path')
          .datum([{ x: xScale.invert(0), y: y[i] }, { x: xScale.invert(width), y: y[i] }])
          .attr('class', 'stroke ')
          .attr('stroke-width', 1)
          .style('stroke-dasharray', 2)
          .attr('d', line)
      }


      for (let i = 0; i < x.length; i++) {
        svg.append('path')
          .datum([{ x: x[i], y: yScale.invert(0) }, { x: x[i], y: yScale.invert(height) }])
          .attr('class', 'stroke ')
          .attr('stroke-width', 1)
          .style('stroke-dasharray', 2)
          .attr('d', line)
      }

    }

  }, [functions, size, x, y])

  return (
    <svg ref={svgRef} />
  )
}

export default AsymptoticGraph