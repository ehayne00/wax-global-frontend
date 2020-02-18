import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return(
      <nav>
          <h1>Wax Global</h1>
         <button><NavLink to='/stories' exact >Swell Stories</NavLink></button>
         <button><NavLink to='/users/:id' exact >My Profile</NavLink></button>
          <button><NavLink to='/favourites' exact >My Faves</NavLink></button>
          
      </nav>
    )
}


export default NavBar;