import { Outlet } from "react-router-dom"
import '../styles/navbar.css'

export const Navbar = () => {
  return (
    <>
      <span className="navbar flex horizontal center">
        <h1 className="logo">3 Steps</h1>
        <span className="links flex horizontal center">
          <button>Login</button>
          <button>Sign Up</button>
        </span>
      </span>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </>
  )
}