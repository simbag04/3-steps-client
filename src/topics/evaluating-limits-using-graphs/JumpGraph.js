import { useEffect, useRef } from "react"
import { createBlankCanvas, createFunctionLimitLine, createMultipleFunctionsGraph } from "../../helpers/graph-helpers";
import '../understanding-limits/graph.css'
import * as d3 from 'd3';

const JumpGraph = ({ functions, size }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const { height, width, xScale, yScale } =
        createBlankCanvas(size, size, svgRef, 12);
      const svg = d3.select(svgRef.current)

      const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

      const { dataArray } = createMultipleFunctionsGraph(svg, functions, width, height, xScale, yScale)

      let f1 = d3.select(`[data-uuid="${dataArray[0].id}"]`).node();
      let pathLength1 = f1.getTotalLength();

      let f2 = d3.select(`[data-uuid="${dataArray[1].id}"]`).node();

      createFunctionLimitLine(svg, f1, pathLength1, xScale, yScale, line, "c2", false, "right")
      createFunctionLimitLine(svg, f2, 0, xScale, yScale, line, "c3", true, "left")
      
      svg.select(".tick-text").raise();
    }

  }, [functions, size])

  return (
    <svg ref={svgRef} />
  )
}

export default JumpGraph