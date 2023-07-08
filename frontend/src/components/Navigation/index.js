import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'
import logo from '../../images/logo.png'

function Navigation ({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <div className='navigation-container'>
      <div>
        <NavLink exact to='/'>
          <img className='navigation logo' src={logo} alt={'AiBnB Logo'} />
        </NavLink>
      </div>
      <div className="navigation-right">
        <NavLink
          className='blue no-underline bold small'
          exact
          to='/spots/new'
        >
          Create a New Spot
        </NavLink>
      {isLoaded && (
          <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
      </div>
    </div>
  )
}

export default Navigation
