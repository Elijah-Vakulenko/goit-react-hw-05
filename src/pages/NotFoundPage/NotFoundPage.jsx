import React from 'react'
import { NavLink } from "react-router-dom";
import s from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <main>
      <NavLink to="/">Back to the Home Page</NavLink>
      <div className={s.wrapper}>
        <p className={s.info}>404</p>
        <p className={s.info}>Not Found</p>
      </div>
    </main>
  )
}

export default NotFoundPage