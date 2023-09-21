import { useRef, useState, useEffect } from "react"
import { useWindowSize } from "../../../helpers/useWindowSize";
import '../../../styles/table.css'

export const FunctionTable = ({ xTitle, yTitle, data }) => {
  const tableRef = useRef(null);
  const [width, setWidth] = useState(0);
  const originalWidthRef = useRef(null);
  const windowWidth = useWindowSize()[0];
  const [display, setDisplay] = useState("horizontal");

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
        <tr>
          <th>{xTitle}</th>
          <th>{yTitle}</th>
        </tr>
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