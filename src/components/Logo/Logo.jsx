import React from 'react'
import s from './Logo.module.css'
import { MdLocalMovies } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Logo = () => {
  return (
    <div className={s.logo}>
      <MdLocalMovies className={s.icon} />
     <NavLink to='/' className={s.title}>Saturday Night</NavLink>
    </div>
  )
}

export default Logo