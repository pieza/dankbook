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
            <ul className="right hide-on-med-and-down">
                <li>
                    <a href="" className="dropdown-trigger" onClick={this.onLogoutClick.bind(this)}>
                        <img className="avatar-navbar " src={user.avatar}></img>
                        <i className="material-icons right">arrow_drop_down</i> {user.username}
                    </a>
                </li>
            </ul>  
        )

        const guestLinks = (
            <ul className="right hide-on-med-and-down">
                <li><Link to="/login"><i className="material-icons left">play_for_work</i>Login</Link></li>
                <li><Link to="/signup"><i className="material-icons left">how_to_reg</i>Sign up</Link></li>
            </ul>  
        )

        return (
            <nav className="light-blue darken-4">
                <div className="nav-wrapper" style={{padding: '0 50px'}}>
                    <Link to="/" className="brand-logo">DankBook</Link>
                    { isAuthenticated ? authLinks : guestLinks }
                </div>
            </nav>
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