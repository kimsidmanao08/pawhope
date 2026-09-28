import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🐾 PawHope
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/donate">Donate</Link>
        <Link to="/report">Report Animal</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;