/**
 * Login page
 * Renders email/password field for user to log in
 */
import React from "react";
import { useContext, useState } from "react";
import { ApiContext, UserContextType } from "../../App";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

export const Login = () => {
  const apiLink = useContext(ApiContext)
  const { setUser } = useContext(UserContext) as UserContextType
  const nav = useNavigate();
  const [formData, setFormData] = useState({}); // data that user inputs
  const [message, setMessage] = useState(null); // login error messages

  const goHome = () => nav('/');

  // sets form data
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  // submits form data
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const result = await login(formData);
    if (result !== "Login successful") {
      setMessage(result)
    } else {
      nav('/')
    }
  }

  /**
   * helper login function
   * @param {Object} data inputted credentials
   * @returns json response
   */
  const login = async (data) => {
    try {
      // create http req
      const res = await fetch(`${apiLink}/log-in`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const json = await res.json();
      if (json.token) {
        // save token/user in local storage
        localStorage.setItem("token", json.token);
        localStorage.setItem("user", JSON.stringify(json.body));
        setUser(json.body);
      }
      return json.message;

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="login flex vertical center medium-gap">
      <h1>Login</h1>
      <form id="loginform" onSubmit={formSubmitHandler} className="flex vertical center medium-gap">
        <label htmlFor="username">
          <input id="username"
            type="email"
            required={true}
            placeholder="Email"
            onChange={handleInputChange}>

          </input>
        </label>
        <label htmlFor="password">
          <input id="password"
            type="password"
            required={true}
            placeholder="Password"
            onChange={handleInputChange}>
          </input>
        </label>
        <div className="buttons">
          <button type="submit">Log in</button>
          <button type="button" onClick={goHome}>Home</button>
        </div>
      </form>
      <div>{message == null ? "" : message}</div>
    </div>
  )
}