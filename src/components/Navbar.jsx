import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        RL
      </NavLink>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => "navbar-link" + (isActive ? " navbar-link-active" : "")}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => "navbar-link" + (isActive ? " navbar-link-active" : "")}>About</NavLink>
        <NavLink to="/projects" className={({ isActive }) => "navbar-link" + (isActive ? " navbar-link-active" : "")}>Projects</NavLink>
        <NavLink to="/skills" className={({ isActive }) => "navbar-link" + (isActive ? " navbar-link-active" : "")}>Skills</NavLink>
        <NavLink to="/resume" className={({ isActive }) => "navbar-link" + (isActive ? " navbar-link-active" : "")}>Resume</NavLink>
        <NavLink to="/certifications" className={({ isActive }) => "navbar-link" + (isActive ? " navbar-link-active" : "")}>Certifications</NavLink>
        <NavLink to="/contact" className={({ isActive }) => "navbar-link" + (isActive ? " navbar-link-active" : "")}>Contact</NavLink>
      </div>
    </nav>
  );
}
