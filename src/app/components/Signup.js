import React, { Component } from 'react'
import axios from 'axios'

import { API_PATH } from '../constants/environment'

class Signup extends Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    submit(e){
        e.preventDefault()

        axios.post(API_PATH + '/signup', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => console.log(response.data))
        .catch(error => console.log(error))
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
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.submit}>
                                    <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="username" type="text" placeholder="Username" autoFocus />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="email" type="email" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.handleChange} name="password" type="password" placeholder="Password" className="materialize-textarea"></input>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4">
                                            Sign up
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

export default Signup