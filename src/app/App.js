import React, { Component } from 'react'

import Navigation from './components/Navigation'
import Login from './components/Login'

class App extends Component {

    render() {
        return (
            <div>
                <Navigation />
                <Login />
            </div>
        )
    }
}

export default App