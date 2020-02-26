import React from 'react'
import { NavLink } from 'react-router-dom'
import wave from '../assets/wave.svg'
// import { Button } from '@material-ui/core'

const NavBar = ({ logout, user }) => {
    return(
      <nav className="nav">
        
        <h1 className="title">Wax Global</h1> <img className="wave"src={wave}/>
        
 
        
            {user !== null ? (
            <div className="navbuttons">
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

