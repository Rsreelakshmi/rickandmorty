import React, { Component } from 'react';
import './header.css';

class Header extends Component {
    render() {
        return (
            <div className="nav-container">
                <nav className="navbar light-blue darken-4">
                    <ul className="text-black">
                        <li><a href="#">Home</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Header;