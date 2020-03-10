import React from 'react'
import { NavLink } from 'react-router-dom'
import wave from '../assets/wave.svg'
import { Button } from '@material-ui/core'

const NavBar = ({ logout, user }) => {
    return(
      <nav className="nav">
        
        <div className="title"><h1 >Wax Global</h1> <img className="wave"src={wave}/></div>
        
            {user !== null ? (
            <div className="navbuttons">
            <NavLink to={{pathname: `/users/${user.id}`,
            state: {user: user}}} exact ><div className="image-name-navbar">{user.image ? <img className="loggedinimage" src={user.image}/>
            : <img className="loggedinimage" src="https://i.ibb.co/z5Xj6hH/profile-pic.png"/>}<h3 className="explanation-font font-size">{`user: ${user.username}`}</h3></div></NavLink>
            
            <Button className="button-one" variant='contained' color='secondary'><NavLink to='/stories' exact >Swell Stories</NavLink></Button>
            <Button className="button-two" variant='contained' color='secondary'><NavLink to='/favourites' exact >My Faves</NavLink></Button>
            <Button className="button-three" variant='contained' color='secondary'onClick={logout}><NavLink to='/' exact >SIGN OUT</NavLink></Button>
            
            </div>
                )
            : null }
  
      </nav>
    )
}


export default NavBar;

