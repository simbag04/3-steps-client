import { useContext, useState } from "react";
import { ApiContext } from "../App";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";

export const Login = () => {
  const apiLink = useContext(ApiContext)
  const { setUser } = useContext(UserContext)
  const nav = useNavigate();
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(null);

  const goHome = () => {
    nav('/');
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const result = await login(formData);
    if (result !== "Login successful") {
      setMessage(result)
    } else {
      nav('/')
    }
  }

  const login = async (data) => {
    try {
      const res = await fetch(`${apiLink}/log-in`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const json = await res.json();
      if (json.token) {
        // save token in local storage
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
        <div className="horizontal-buttons">
          <button type="submit">Log in</button>
          <button type="button" onClick={goHome}>Home</button>
        </div>
      </form>
      <div>{message == null ? "" : message}</div>
    </div>
  )
}