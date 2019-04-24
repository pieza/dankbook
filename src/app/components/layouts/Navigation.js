import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth.actions'

class Navigation extends Component {
    onLogoutClick(e) {
        e.preventDefault()
        this.props.logout()
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        const authLinks = (
            <div>
                <li>
                    <a href="" className="dropdown-trigger" data-target="profile-dropdown">
                        <img className="avatar-navbar" src={user.avatar}></img>
                        <i className="material-icons right">arrow_drop_down</i> {user.username}
                    </a>
                </li>
            </div>  
        )

        const guestLinks = (
            <div>
                <li><Link to="/login"><i className="material-icons left">play_for_work</i>Login</Link></li>
                <li><Link to="/signup"><i className="material-icons left">how_to_reg</i>Sign up</Link></li>
            </div>  
        )
        
        const profileDropdown = (
            <ul id="profile-dropdown" className="dropdown-content">
                <li><a href="">See profile</a></li>
                <li><a href="" onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
            </ul>
        )

        return (
            <div className="navbar-container">
                { profileDropdown }
                <nav className="navbar light-blue darken-4">
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">DankBook</Link>
                        <Link to="/" data-target="mobile-menu" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
                        <ul className="right hide-on-med-and-down">
                            { isAuthenticated ? authLinks : guestLinks }
                        </ul>
                    </div>
                </nav>

                {/** Mobile menu */}
                <ul className="sidenav" id="mobile-menu">
                    { isAuthenticated ? authLinks : guestLinks }
                </ul>
                
            </div>
        )
    }
}

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    auth: state.auth
})
  
export default connect(mapStateToProps, { logout })(Navigation)