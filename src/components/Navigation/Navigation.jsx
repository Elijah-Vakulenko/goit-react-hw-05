import React from 'react'
import s from './Navigation.module.css'
import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import Logo from '../Logo/Logo'

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};


const Navigation = () => {
  return (
    <header className={s.header}>
      <Logo />
      <ul className={s.nav_list}>
        <li>
          <NavLink className={buildLinkClass} to="/">Home</NavLink>
        </li>
        <li>
          <NavLink className={buildLinkClass} to="/movies">Movies</NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Navigation