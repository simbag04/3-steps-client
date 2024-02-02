/**
 * Navbar top component
 */
import { Outlet } from "react-router-dom"
import '../styles/navbar.css'
import { NavLinks } from "./NavLinks";
import menu from '../svgs/menu.svg'
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { HeaderHeightContext } from "../App";

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState("");
  const { setHeight } = useContext(HeaderHeightContext)
  let container = useRef(null)
  const nav = useNavigate();

  const goHome = () => nav("/")
  const clickHandler = () => {
    setShowDropdown(showDropdown === "" ? " active" : "");
  }

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setShowDropdown("")
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => setHeight(container.current.offsetHeight))

  return (
    <div>
      <span className="navbar flex horizontal center" ref={container}>
        <h1 className="logo" onClick={goHome}>3 Steps</h1>
        <div className="links flex horizontal center">
          <NavLinks></NavLinks>
        </div>
        <img src={menu} alt="menu" onClick={clickHandler} />
      </span>
      <div className={`dropdown${showDropdown} flex vertical center medium-gap`}>
        <NavLinks />
      </div>
      <div className="body">
        <Outlet></Outlet>
      </div>
    </div>
  )
}