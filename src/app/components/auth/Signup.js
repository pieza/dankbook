import React, { Component } from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { signup } from '../../redux/actions/auth.actions'

class Signup extends Component {
    constructor() {
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

    componentDidMount() {
        if (this.props.auth.isAuthenticated)
            this.props.history.push('/')
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors)
            this.setState({ errors: nextProps.errors })
    }

    submit(e) {
        e.preventDefault()

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }

        this.props.signup(newUser, this.props.history)
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { errors } = this.state

        return (
            <div className="landing">
                <div className="dark-overlay landing-inner">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-6">
                                <p>Creese una cuenta ak7</p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-body">
                                        <center><h4 className="card-title">Signup</h4></center>
                                        <form onSubmit={this.submit}>
                                            <div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <i className="material-icons prefix">account_circle</i>
                                                            </div>
                                                        </div>
                                                        <input onChange={this.onChange} name="username" type="text" placeholder="Username"  aria-describedby="basic-addon1"
                                                            className={'form-control ' + classnames('', {
                                                                'is-invalid': errors.username
                                                            })} autoFocus />
                                                        {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="material-icons prefix">mail</i>
                                                        </div>
                                                    </div>
                                                    <input onChange={this.onChange} name="email" type="email" placeholder="Email"
                                                        className={'form-control ' + classnames('', {
                                                            'is-invalid': errors.email
                                                        })} />
                                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="material-icons prefix">vpn_key</i>
                                                        </div>
                                                    </div>
                                                    <input onChange={this.onChange} name="password" type="password" placeholder="Password"
                                                        className={'form-control ' + classnames('', {
                                                            'is-invalid': errors.password
                                                        })} />
                                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text">
                                                            <i className="material-icons prefix">vpn_key</i>
                                                        </div>
                                                    </div>
                                                    <input onChange={this.onChange} name="password2" type="password" placeholder="Confirm password"
                                                        className={'form-control ' + classnames('', {
                                                            'is-invalid': errors.password2
                                                        })} />
                                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                                                </div>
                                            </div>

                                            <button type="submit" className="btn btn-info btn-block">
                                                Sign up
                                            </button>
                                        </form>
                                    </div>
                                    <div className="card-footer">
                                        <center><Link to="/login">I have an account</Link></center>               
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Signup.propTypes = {
    signup: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { signup })(withRouter(Signup))