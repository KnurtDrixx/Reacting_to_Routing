import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav nav-pills justify-content-center p-2 shadow">
      <NavLink to="/" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Home
      </NavLink>
      <NavLink to="/films" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Films
      </NavLink>
      <NavLink to="/characters" className={({ isActive }) => `nav-link ${isActive && "active"}`}>
        Characters
      </NavLink>
    </nav>
  );
};

export default Navbar;
