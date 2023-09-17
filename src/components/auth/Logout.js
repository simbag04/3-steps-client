import { useNavigate } from "react-router-dom";

import { UserContext } from "../../App";
import { useContext } from "react";

export const Logout = () => {
  const { setUser } = useContext(UserContext);
  const nav = useNavigate();
  const goHomeHandler = () => {
    nav('/');
  }

  const logoutHandler = () => {
    setUser(null);
    localStorage.setItem("user", null);
    localStorage.setItem("token", null);
    nav('/')
  }

  return (
    <div className="flex vertical center medium-gap">
      <h1>Logout</h1>
      <div className="logout-text">Are you sure you want to log out?</div>
      <div className="buttons">
        <button onClick={goHomeHandler}>Home</button>
        <button onClick={logoutHandler}>Yes</button>
      </div>
    </div>
  )
}