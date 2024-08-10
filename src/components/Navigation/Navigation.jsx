import React from 'react'
import s from './Navigation.module.css'
import { NavLink } from "react-router-dom";
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};


const Navigation = () => {
  return (
    <header className={s.header}>
      <ul className={s.nav_list}>
        <li>
          <NavLink className={buildLinkClass} to="/">Home</NavLink>
        </li>
        <li>
          <NavLink className={buildLinkClass} to="/movies">Movie Collection</NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Navigation