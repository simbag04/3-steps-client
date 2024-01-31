/**
 * Register page
 * Renders all fields for user to register
 */
import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../App";
import React from "react";

export const Register = () => {
  const nav = useNavigate();
  const [registered, setRegistered] = useState(false); // registration complete
  const [formData, setFormData] = useState({}); // user inputs
  const [message, setMessage] = useState(null); // error messages
  const apiLink = useContext(ApiContext)

  const goHome = () => nav('/')

  // updates user inputs
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  // submits form
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // create http req
      const res = await fetch(`${apiLink}/sign-up`, {
        method: 'post',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      // result
      const json = await res.json();
      if (!json.success) {
        setMessage(json.message);
      } else {
        setRegistered(true);
      }
    } catch (err) {
    }
  }

  return (
    <div className="register flex vertical center medium-gap">
      {/* Form */}
      <h1>Register</h1>
      {registered ? null :
        <form onSubmit={formSubmitHandler} className="flex vertical center medium-gap">
          <label htmlFor="first_name">
            <input id="first_name"
              type="text"
              required={true}
              placeholder="First Name"
              onChange={handleInputChange}>

            </input>
          </label>
          <label htmlFor="last_name">
            <input id="last_name"
              type="text"
              required={true}
              placeholder="Last Name"
              onChange={handleInputChange}>

            </input>
          </label>
          <label htmlFor="email">
            <input id="email"
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
          <label htmlFor="confirm_password">
            <input id="confirm_password"
              type="password"
              required={true}
              placeholder="Confirm Password"
              onChange={handleInputChange}>
            </input>
          </label>
          <div className="buttons">
            <button type="submit">Register</button>
            <button type="button" onClick={goHome}>Home</button>
          </div>
        </form>
      }
      <div>
        {/* link to login or error messages */}
        {registered ?
          <div>
            Registration successful!
            <Link to="/login">Login</Link>
          </div> :
          message == null ? "" :
            message.map((mess, index) => {
              return <div key={index}>{mess.msg === undefined ? mess : mess.msg}</div>
            })}
      </div>
    </div>
  )
}