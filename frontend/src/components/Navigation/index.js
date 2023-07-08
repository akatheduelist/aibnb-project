import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'
import logo from '../../images/logo.png'

function Navigation ({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user)
  return (
    <>

    <div className='navigation-container'>
        <NavLink exact to='/'>
          <img className='navigation logo' src={logo} alt={'AiBnB Logo'} />
        </NavLink>
      <div className='navigation-right'>
        {sessionUser && (
            <NavLink
              className='blue no-underline bold small'
              exact
              to='/spots/new'
            >
              Create a New Spot
            </NavLink>
        )}

        {isLoaded && (
            <ProfileButton user={sessionUser} />
        )}
      </div>
    </div>
    </>
  )
}

export default Navigation
