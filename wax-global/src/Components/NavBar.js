import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '@material-ui/core'

const NavBar = ({username, logout}) => {
    return(
      <nav>
          <h1>Wax Global</h1>
         <button><NavLink to='/stories' exact >Swell Stories</NavLink></button>
         <button><NavLink to='/users/:id' exact >My Profile</NavLink></button>
          <button><NavLink to='/favourites' exact >My Faves</NavLink></button>
          {username && (
               <Button onClick={logout} variant='contained' color='primary'>
                    SIGN OUT
              </Button>)}
      </nav>
    )
}


export default NavBar;