/**
 * Creates graph of multiple functions
 */

import { useEffect, useRef } from "react"
import { createBlankCanvas, createMultipleFunctionsGraph, addPointsToGraph } from "../../../helpers/graph-helpers";
import '../../../styles/graph.css'
import * as d3 from 'd3';
import React from "react";
import { GraphFunction } from "../../../@types/GraphFunction";
import { GraphPoint } from "../../../@types/GraphPoint";

interface FunctionGraphProps {
  functions: GraphFunction[], // functions to graph
  size: number, // size of graph
  minx?: number, // minimum x value of graph (default: -11)
  maxx?: number, // maximum x value of graph (default: 11)
  miny?: number, // minimum y value of graph (default: -11)
  maxy?: number, // maximum y value of graph (default: -11)
  points?: GraphPoint[] // additional full circle points to graph
}

const FunctionGraph: React.FC<FunctionGraphProps> = ({ functions, size, minx, maxx, miny, maxy, points}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const { height, width, xScale, yScale } =
        createBlankCanvas(size, size, svgRef, 12, minx, maxx, miny, maxy);
      const svg = d3.select(svgRef.current)

      createMultipleFunctionsGraph(svg, functions, width, height, xScale, yScale)
      if (points) addPointsToGraph(svg, points, xScale, yScale)
      
      svg.select(".tick-text").raise();
    }
  }, [functions, size, minx, maxx, maxy, miny, points])

  return (
    <svg ref={svgRef} />
  )
}

export default FunctionGraph