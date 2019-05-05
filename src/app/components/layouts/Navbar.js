import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../actions/auth.actions'

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault()
        this.props.logout()
    }

    render() {
        const { isAuthenticated, user } = this.props.auth

        const profileDropdown = (
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <Link to={`/profile/${user.username}`} className="dropdown-item">View profile</Link>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="" onClick={this.onLogoutClick.bind(this)}>Logout</a>
            </div>
        )

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                    <a href="" className="nav-link dropdown-toggle" role="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img className="avatar-navbar" src={user.avatar}></img> {user.username}
                    </a>
                    { profileDropdown }
                </li>
            </ul>  
        )

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        <i className="material-icons left">play_for_work</i>
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                        <i className="material-icons left">how_to_reg</i>
                        Sign up
                    </Link>
                </li>
            </ul>  
        )
        

        return (
            <div className="navbar-container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top">
                    <div className="container-fluid">
                        <Link to="/" className="navbar-brand">DankBook</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse w-100 order-3 dual-collapse" id="menu">
                            { isAuthenticated ? authLinks : guestLinks }
                        </div>
                    </div>

                </nav>          
            </div>
        )
    }
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    auth: state.auth
})
  
export default connect(mapStateToProps, { logout })(Navbar)