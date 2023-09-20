/**
 * Latex component that uses katex to render math in latex font
 * Parameters: 
 *  - classes: custom classes to be added to returned html
 *  - expression: math to be rendered as latex
 *  - inline: boolean value indicating whether latex should be rendered inline or block mode
 */

import 'katex/dist/katex.min.css';  // Import KaTeX styles
import { BlockMath, InlineMath } from 'react-katex';

const Latex = ({classes, expression, display}) => {
  return (
    <span className={classes}>
      {!display ? 
      <InlineMath math={expression} /> :
      <BlockMath math={expression} /> }
    </span>
  )
}

export default Latex