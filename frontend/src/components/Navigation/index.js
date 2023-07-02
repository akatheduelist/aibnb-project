import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (

        <div className="navigation navigation-container">
            <NavLink exact to="/"><img className='navigation logo' src={logo} alt={'AirDnB Logo'} /></NavLink>
                {isLoaded && (
                    <div>
                        <ProfileButton user={sessionUser} />
                    </div>
                )}
        </div>
    );
}

export default Navigation;
