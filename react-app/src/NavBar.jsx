import React, {useState} from 'react';
import {AiOutlineMenu, AiOutlineClose, AiOutlineSearch, AiOutlineUser} from 'react-icons/ai';
import Logo from '/src/images/teamLogo.jpg';
import { NavLink } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const Navbar = ({setLoggedIn, profile}) => {
  const [nav, setNav] = useState(false);
  return (
    <div className="navbar">
      <NavLink className="nav-brand" to="/" >
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
      </NavLink>
      <nav>
      <ul className={nav? ["menu", "active"].join(' '):"menu"}>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "nav-item")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "nav-item")}
            to="/players"
          >
            Players
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "nav-item")}
            to="/games"
          >
            Games
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "nav-item")}
            to="/statTracker"
          >
            Stat Tracker
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? "nav-active" : "nav-item")}
            to="/profile"
          >
            <AiOutlineUser size={25}/>
          </NavLink>
        </li>
        <li className="nav-item">
          <a style={{"cursor":"pointer"}} onClick={() => {
              setLoggedIn(false);
              {setNav(!nav)};
            }}
          >
            <IoIosLogOut size={25}/>
          </a>
        </li>
      </ul>
    </nav>
    <div className="top-right-corner"><p>Logged in as {profile.email}</p></div>
    <div onClick={() => setNav(!nav)} className="mobilebtn">
      {!nav? <AiOutlineMenu size={25}/> : <AiOutlineClose size={25}/>}
    </div>
  </div>
  )
}

export default Navbar