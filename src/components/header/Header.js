import React, { Component } from 'react';
import logo from '../../logo-rm.png';
import './header.css';

class Header extends Component {
    render() {
        return (
            <div className="nav-container">
                <nav className="navbar light-blue darken-4">
                    <ul className="text-black">
                        {/* <li><a href="sass.html"><img src={logo} alt="logo"/></a></li> */}
                        <li><a href="badges.html">Dashboard</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Header;