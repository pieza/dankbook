import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { signup } from '../../actions/auth.actions'

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
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.submit}>
                                        <div>
                                            <div className="form-group">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <i className="material-icons prefix">account_circle</i>
                                                    </div>
                                                </div>
                                                <input onChange={this.onChange} name="username" type="text" placeholder="Username"
                                                    className={'form-control ' + classnames('', {
                                                        'is-invalid': errors.username
                                                    })} autoFocus />
                                                {errors.username && (<span className="helper-text" data-error={errors.username}></span>)}
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <input onChange={this.onChange} name="email" type="email" placeholder="Email"
                                                className={'form-control ' + classnames('', {
                                                    'is-invalid': errors.email
                                                })} />
                                            {errors.email && (<span className="helper-text" data-error={errors.email}></span>)}
                                        </div>

                                        <div className="form-group">
                                            <input onChange={this.onChange} name="password" type="password" placeholder="Password"
                                                className={'form-control ' + classnames('', {
                                                    'is-invalid': errors.password
                                                })} />
                                            {errors.password && (<span className="helper-text" data-error={errors.password}></span>)}
                                        </div>

                                        <div className="form-group">
                                            <input onChange={this.onChange} name="password2" type="password" placeholder="Confirm password"
                                                className={'form-control ' + classnames('', {
                                                    'is-invalid': errors.password2
                                                })} />
                                            {errors.password2 && (<span className="helper-text" data-error={errors.password2}></span>)}
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