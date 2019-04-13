import React, { Component } from 'react'
import { Router, Link } from "react-router-dom";

class Navigation extends Component {

    render() {
        return (
            <nav className="light-blue darken-4">
                <div className="container">
                    <Link to="/login" className="brand-logo">DankBook</Link>
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/login"><i className="material-icons left">search</i>Login</Link></li>
                        <li><Link to="/signup"><i className="material-icons left">search</i>Sign up</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navigation