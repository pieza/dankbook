import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

import './App.css';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                {/* Navigation */}
                <Navigation />
                 
                {/* Routes */}
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>
                </Switch>   
            </BrowserRouter>
        )
    }
}

export default App