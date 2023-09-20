/**
 * Creates graph of multiple functions
 * Parameters:
 *  - functions: functions to graph
 *  - size: size of graph
 */

import { useEffect, useRef } from "react"
import { createBlankCanvas, createMultipleFunctionsGraph } from "../../../helpers/graph-helpers";
import '../../../styles/graph.css'
import * as d3 from 'd3';

const FunctionGraph = ({ functions, size }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const { height, width, xScale, yScale } =
        createBlankCanvas(size, size, svgRef, 12);
      const svg = d3.select(svgRef.current)

      createMultipleFunctionsGraph(svg, functions, width, height, xScale, yScale)
      svg.select(".tick-text").raise();
    }
  }, [functions, size])

  return (
    <svg ref={svgRef} />
  )
}

export default FunctionGraph