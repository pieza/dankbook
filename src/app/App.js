import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import store from './store'

import setAuthToken from './utils/auth-token'

import { setCurrentUser, logout } from './actions/auth.actions'
import { getCookie } from './utils/cookie-helper'

import { COOKIE_JWT } from './constants/environment'

import Navigation from './components/layouts/Navigation'
import Home from './components/home/Home'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

import './App.css';

// check for token
const token = getCookie(COOKIE_JWT)

if (token) {
    // Set auth token header auth
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logout());
        // Clear current Profile
        //store.dispatch(clearCurrentProfile());
        // Redirect to login
        window.location.href = '/';
    }
}

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                <div className="App"></div>
                    {/* Navigation */}
                    <Navigation />

                    {/* Routes */}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                    </Switch>
                </BrowserRouter>
            </Provider>

        )
    }
}

export default App