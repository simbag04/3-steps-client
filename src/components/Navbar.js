import { Outlet, useNavigate } from "react-router-dom"
import '../styles/navbar.css'

import { UserContext } from "../App";
import { useContext } from "react";

export const Navbar = () => {
  const nav = useNavigate();
  const { user } = useContext(UserContext);

  const login = () => {
    nav('/login');
  }

  const logout = () => {
    nav('/logout')
  }

  const register = () => {
    nav('/register')
  }

  return (
    <>
      <span className="navbar flex horizontal center">
        <h1 className="logo">3 Steps</h1>
        <span className="links flex horizontal center">
          {user ?
            <>
              <div>Welcome, {user.first_name} {user.last_name}! </div>
              <button onClick={logout}>Logout</button>
            </> :
            <>
              <button onClick={login}>Login</button>
              <button onClick={register}>Register</button>
            </>
          }
        </span>
      </span>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </>
  )
}