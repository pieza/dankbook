import React, { Component } from 'react'

class App extends Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    submit(e){
        e.preventDefault()
    }

    handleChange(e){
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">DankBook</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.submit}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="email" type="email" placeholder="Email" autoFocus />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="password" type="password" placeholder="Password" className="materialize-textarea"></input>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">
                                            Log in
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App