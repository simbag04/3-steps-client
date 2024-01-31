/**
 * Renders Piecewise Function in Latex
 */
import React, { useEffect, useState } from "react";
import Latex from "./Latex";
import { PiecewiseFunction } from "../../@types/PiecewiseFunction";

interface PiecewiseProps {
  title: string, // name of function
  functions: PiecewiseFunction[], // functions to show
  display?: string | boolean, // whether it should be display mode
  classes?: string // classes to apply
}

export const Piecewise: React.FC<PiecewiseProps> = ({ title, functions, display, classes }) => {
  const [expression, setExpression] = useState(``);
  useEffect(() => {
    if (functions) {
      let e = `\\begin{cases}`;
      for (let i = 0; i < functions.length; i++) {
        e = e + functions[i].f + "&";
        e = e + functions[i].domain;
        if (i !== functions.length - 1) {
          e = e + "\\\\\\\\"
        }
      }
      e = e + "\\end{cases}"
      setExpression(e)
    }
  },[functions])
  
  return (
    <>
      <Latex classes={classes ? classes : ""} expression={`${title ? `${title} = ` : ''} ${expression}`} display={display} />
    </>
  )
}