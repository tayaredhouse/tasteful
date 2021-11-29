import React from 'react';
import logo from "../Header/logo.png";
import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
            <nav>
                <Link to="/">
                     <img src={logo} alt="Tasteful Reddit logo"/>
                </Link>
                
            </nav>
    )
}

export default Header
