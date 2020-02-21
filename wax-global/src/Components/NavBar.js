import React from 'react'
import { NavLink } from 'react-router-dom'
// import { Button } from '@material-ui/core'

const NavBar = ({ logout, user }) => {
    return(
      <nav>
        <h1>Wax Global</h1>
            {user !== null ? (
            <div>
            <p>{`You are logged in as: ${user.username}`}</p>
            <button ><NavLink to='/stories' exact >Swell Stories</NavLink></button>
            <button ><NavLink to={{pathname: `/users/${user.id}`,
            state: {user: user}}} exact >My Profile</NavLink></button>
            <button><NavLink to='/favourites' exact >My Faves</NavLink></button>
            <button onClick={logout}><NavLink to='/' exact >SIGN OUT</NavLink></button>
            </div>
                )
            : null }
  
      </nav>
    )
}


export default NavBar;

