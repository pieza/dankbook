import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth.actions'

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            searchText: ''
        }
    }

    onChange(e){
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onLogoutClick(e) {
        e.preventDefault()
        this.props.logout()
        this.props.history.push('/')
    }

    onSearchSubmit(e) {
        const { searchText } = this.state
        e.preventDefault()
        this.props.history.push(`/search/profiles${searchText != '' ? ('?username=' + searchText) : ''}`)
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

                        { isAuthenticated ? (
                            <div className="text-center w-60">
                                <form className="form-inline" onSubmit={this.onSearchSubmit.bind(this)}>
                                    <input onChange={this.onChange.bind(this)} name="searchText" value={this.state.searchText} className="form-control w-100" type="search" placeholder="Search" aria-label="Search"/>
                                </form>
                            </div>

                        ) : null }
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse order-3 dual-collapse" id="menu">
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
  
export default connect(mapStateToProps, { logout })(withRouter(Navbar))