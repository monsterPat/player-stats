import React, {useState} from 'react'
import styles from './Navbar.module.css';
import {AiOutlineMenu, AiOutlineClose, AiOutlineSearch, AiOutlineUser} from 'react-icons/ai';
import Logo from '../../images/teamLogo.jpg';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  return (
    <div className={styles.navbar}>
      <NavLink to="/" >
        <div >
          <div className={styles["nav-image"]}>
            <img
              src={Logo}
              width="65"
              height="50"
              className="product-details-image"
              alt="Zilker Bulls"
            />
          </div>
          <div className={styles ["nav-title"]}>
            <h2>Zilker Bulls</h2>
          </div>
        </div>
      </NavLink>
      <nav>
      <ul className={nav? [styles.menu, styles.active].join(' '):[styles.menu]}>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? styles['nav-active'] : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? styles['nav-active'] : "")}
            to="/games"
          >
            Games
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? styles['nav-active'] : "")}
            to="/statTracker"
          >
            Stat Tracker
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink onClick={() => {setNav(!nav)}}
            className={({ isActive }) => (isActive ? styles['nav-active'] : "")}
            to="/players"
          >
            Players
          </NavLink>
        </li>
      </ul>
    </nav>
    <div onClick={() => setNav(!nav)} className={styles.mobilebtn}>
      {!nav? <AiOutlineMenu size={25}/> : <AiOutlineClose size={25}/>}
    </div>
  </div>
  )
}

export default Navbar