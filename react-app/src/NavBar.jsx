import React, {useState} from 'react';
import {AiOutlineMenu, AiOutlineClose, AiOutlineSearch, AiOutlineUser} from 'react-icons/ai';
import Logo from '/src/images/teamLogo.jpg';
import { NavLink } from "react-router-dom";

const Navbar = ({setLoggedIn}) => {
  const [nav, setNav] = useState(false);
  return (
    <div className="navbar">
      <NavLink to="/" >
        <div >
          <div className="nav-image">
            <img
              src={Logo}
              width="65"
              height="50"
              className="product-details-image"
              alt="Zilker Bulls"
            />
          </div>
          <div className="nav-title">
            <h2>Zilker Bulls</h2>
          </div>
        </div>
      </NavLink>
      <nav>
      <ul className={nav? ["menu", "active"].join(' '):"menu"}>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/liveGame"
          >
            Live Game
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/players"
          >
            Players
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/games"
          >
            Games
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            to="/statTracker"
          >
            Stat Tracker
          </NavLink>
        </li>
        <li className="nav-item">
          <a onClick={() => {
              setLoggedIn(false);
              {setNav(!nav)};
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
    <div onClick={() => setNav(!nav)} className="mobilebtn">
      {!nav? <AiOutlineMenu size={25}/> : <AiOutlineClose size={25}/>}
    </div>
  </div>
  )
}

export default Navbar