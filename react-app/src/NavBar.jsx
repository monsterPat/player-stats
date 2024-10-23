import { NavLink } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        <div className="title-container">
          <div className="title-image">
            <img
              src="../images/teamLogo.jpg"
              width="65"
              height="50"
              className="product-details-image"
              alt="Zilker Bulls"
            />
          </div>
          <div className="title-title">
            <h2>Zilker Bulls</h2>
          </div>
        </div>
      </NavLink>
      <ul>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/games"
          >
            Games
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/statTracker"
          >
            Stat Tracker
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/players"
          >
            Players
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
