import { useEffect, useState } from "react";
import Latex from "./Latex";

export const Piecewise = ({ title, functions, display }) => {
  const [expression, setExpression] = useState(``);
  useEffect(() => {
    if (functions) {
      let e = `\\begin{cases}`;
      for (let i = 0; i < functions.length; i++) {
        e = e + functions[i].f + "&";
        e = e + functions[i].domain;
        if (i !== functions.length - 1) {
          e = e + "\\\\"
        }
      }
      e = e + "\\end{cases}"
      setExpression(e)
    }
  },[functions])
  
  return (
    <>
      <Latex expression={`${title ? `${title} = ` : ''} ${expression}`} display={display} />
    </>
  )
}