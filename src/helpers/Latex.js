import 'katex/dist/katex.min.css';  // Import KaTeX styles
import { BlockMath, InlineMath } from 'react-katex';

const Latex = ({classes, expression, inline}) => {
  return (
    <span className={classes}>
      {inline ? 
      <InlineMath math={expression} /> :
      <BlockMath math={expression} /> }
    </span>
  )
}

export default Latex