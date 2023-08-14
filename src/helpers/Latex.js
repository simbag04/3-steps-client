const Latex = ({classes, expression}) => {
  return <span className={classes} dangerouslySetInnerHTML={{__html: `${expression}`}} />
}

export default Latex