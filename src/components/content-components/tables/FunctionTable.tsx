/**
 * Creates Table of a funcion. Makes table vertical if screen is not wide enough
 */

import { useRef, useState, useEffect } from "react"
import { useWindowSize } from "../../../helpers/useWindowSize";
import '../../../styles/table.css'
import Latex from "../../latex/Latex";
import React from "react";
import { TableValue } from "../../../@types/TableValue";

interface FunctionTableProps {
  xTitle: string, // title of x values
  yTitle: string, // title of y values
  data: TableValue[] // data to put in table
}

export const FunctionTable: React.FC<FunctionTableProps> = ({ xTitle, yTitle, data }) => {
  const tableRef = useRef(null);// ref for table
  const [width, setWidth] = useState(0); // current width of table
  const originalWidthRef = useRef(null); // horizontal table width
  const windowWidth = useWindowSize()[0]; // window size
  const [display, setDisplay] = useState("horizontal"); // whether table should be horiz or vert

  // gets width of table
  useEffect(() => {
    const element = tableRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === element) {
          if (display === "horizontal") {
            originalWidthRef.current = entry.contentRect.width;
          }
          setWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, [tableRef, windowWidth, display]);

  // changes table display to vertical if needed
  useEffect(() => {
    if (width > 0.8 * windowWidth) {
      setDisplay("vertical")
    } else if (originalWidthRef && originalWidthRef.current && originalWidthRef.current < 0.8 * windowWidth) {
      setDisplay("horizontal")
    }
  }, [width, windowWidth])

  return (
    <table ref={tableRef} className={`function-table`}>
      <tbody className={`flex ${display}`}>
        {/* Headers */}
        <tr>
          <th><Latex expression={xTitle} /></th>
          <th><Latex expression={yTitle} /></th>
        </tr>
        {/* Data */}
        {data.map((d, i) => {
          return (
            <tr key={i} className={i % 2 === 0 ? "table-color-1" : "table-color-2"}>
              <td>{d.x}</td>
              <td>{d.y}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}