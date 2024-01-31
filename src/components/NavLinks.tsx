/**
 * Links in Navbar
 */

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import React from "react";

export const NavLinks = () => {
  const nav = useNavigate();
  const { user } = useContext(UserContext);

  // nav links
  const login = () => nav('/login');
  const logout = () => nav('/logout');
  const register = () => nav('/register')

  return (
    <>
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
    </>
  )
}