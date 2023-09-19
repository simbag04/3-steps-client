/**
 * Navbar top component
 */
import { Outlet } from "react-router-dom"
import '../styles/navbar.css'
import { NavLinks } from "./NavLinks";
import menu from '../svgs/menu.svg'
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState("");
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

  return (
    <>
      <span className="navbar flex horizontal center">
        <h1 className="logo">3 Steps</h1>
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
    </>
  )
}