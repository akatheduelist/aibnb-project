import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import OpenModalMenuItem from './OpenModalMenuItem'
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal'

function ProfileButton ({ user }) {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const ulRef = useRef()
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true)
  }

  useEffect(() => {
    if (!showMenu) return

    const closeMenu = e => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('click', closeMenu)

    return () => document.removeEventListener('click', closeMenu)
  }, [showMenu])

  const closeMenu = () => setShowMenu(false)

  const logout = e => {
    e.preventDefault()
    dispatch(sessionActions.logout())
    history.push('/')
    closeMenu()
  }

  const manageSpots = e => {
    e.preventDefault()
    history.push('/spots/current')
    closeMenu()
  }
  const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden')

  return (
    <>
      <button className='navigation user-button' onClick={openMenu}>
        <i className='fa-sharp fa-solid fa-bars fa-lg' />
        <i className='fa-solid fa-circle-user fa-2xl' />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>{`Hello, ${user.firstName}`}</div>
            <div>{user.email}</div>
            <hr />
            <button onClick={manageSpots}>Manage Spots</button>
            <hr />
            <div>
              <button onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText='Log In'
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText='Sign Up'
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  )
}

export default ProfileButton
