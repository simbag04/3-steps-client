const FAR_DIST = window.outerWidth < 800 ? 1.3 : 1;
const CLOSE_DIST = window.outerWidth < 800 ? 0.5 : 0.3;
const AXIS_OFFSET = window.outerWidth < 800 ? 0.4 : 0.3;
const GRAPH_SIZE = window.outerWidth < 800 ? 250 : 400;
const COLORS = ['red', 'green', 'blue', 'orange', 'purple'];
const LEFT_LIMIT = `^{\\footnotesize\\texttt{-}}`
const RIGHT_LIMIT = `^{\\footnotesize\\texttt{+}}`

export { FAR_DIST, CLOSE_DIST, AXIS_OFFSET, GRAPH_SIZE, COLORS, LEFT_LIMIT, RIGHT_LIMIT }