/**
 * Home page for App
 * Contains links to topic pages
 * I split links into learn/practice so it was easier to render different content
 */

import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div>
      <Link to="/topic/understanding-limits/learn">Understanding Limits</Link>
      <Link to="/topic/understanding-limits/practice">Understanding Limits Practice</Link>
      <Link to="/topic/evaluate-limits-using-graphs">Evaluate Limits Using Graphs</Link>
    </div>
  )
}