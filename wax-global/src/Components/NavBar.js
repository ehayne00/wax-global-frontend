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
            
            <button ><NavLink to='/stories' exact >Swell Stories</NavLink></button>
            <NavLink to={{pathname: `/users/${user.id}`,
            state: {user: user}}} exact ><div>{user.image ? <img className="loggedinimage" src={user.image}/>
            : <img className="loggedinimage" src="https://i.ibb.co/z5Xj6hH/profile-pic.png"/>}<h3 className="explanation-font loggedinusername">{`user: ${user.username}`}</h3></div></NavLink>
            <button><NavLink to='/favourites' exact >My Faves</NavLink></button>
            <button onClick={logout}><NavLink to='/' exact >SIGN OUT</NavLink></button>
            </div>
                )
            : null }
  
      </nav>
    )
}


export default NavBar;

