import { Link } from "react-router-dom"

export const Home = () => {
  return (
    <div>
      Home
      <Link to="/topic/understanding-limits">Understanding Limits</Link>
      <Link to="/topic/evaluate-limits-using-graphs">Understanding Limits</Link>
    </div>
  )
}