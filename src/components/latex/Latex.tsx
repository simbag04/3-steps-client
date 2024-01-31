/**
 * Latex component that uses katex to render math in latex font
 */

import 'katex/dist/katex.min.css';  // Import KaTeX styles
import { BlockMath, InlineMath } from 'react-katex';
import React from 'react';

interface LatexProps {
  classes? : string, // custom classes to be added to returned html
  expression: string, // math to be rendered as latex
  display?: string | boolean, // whether it should be display mode
  inline?: any // whether it should be inline mode 
}

const Latex: React.FC<LatexProps> = ({classes, expression, display}) => {
  return (
    <span className={classes}>
      {!display ? 
      <InlineMath math={expression} /> :
      <BlockMath math={expression} /> }
    </span>
  )
}

export default Latex