import React, { Component } from 'react'
import axios from 'axios'
import classnames from 'classnames'

import { API_PATH } from '../constants/environment'

class Signup extends Component{
    constructor(){
        super()
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    submit(e){
        e.preventDefault()

        axios.post(API_PATH + '/signup', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        })
        .then(response => this.setState({ errors: {} }))
        .catch(error => {
            console.log(error)
            this.setState({ errors: error.response.data.errors })
        })
    }

    onChange(e){
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { errors } = this.state

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
                                                <i className="material-icons prefix">account_circle</i>
                                                <input onChange={this.onChange} name="username" type="text" placeholder="Username"  
                                                    className={classnames('', {
                                                        'invalid': errors.username
                                                    })} autoFocus/>
                                                { errors.username && (<span className="helper-text" data-error={errors.username}></span>) }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.onChange} name="email" type="email" placeholder="Email" 
                                                className={classnames('', {
                                                    'invalid': errors.email
                                                })}/>
                                                { errors.email && (<span className="helper-text" data-error={errors.email}></span>) }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.onChange} name="password" type="password" placeholder="Password"
                                                className={classnames('', {
                                                    'invalid': errors.password
                                                })}/>
                                                { errors.password && (<span className="helper-text" data-error={errors.password}></span>) }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.onChange} name="password2" type="password" placeholder="Confirm password" 
                                                className={classnames('', {
                                                    'invalid': errors.password2
                                                })}/>
                                                { errors.password2 && (<span className="helper-text" data-error={errors.password2}></span>) }
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