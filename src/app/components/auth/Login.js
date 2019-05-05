import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Context } from '../../Context'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { login } from '../../actions/auth.actions'

class Login extends Component{
    static contextType = Context

    constructor(){
        super()
        this.state = {
            username: '',
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
        if(nextProps.isAuthenticated)
            this.props.history.push('/')
        if (nextProps.errors)
            this.setState({ errors: nextProps.errors })
    }

    submit(e){
        e.preventDefault()

        this.props.login({
            username: this.state.username,
            password: this.state.password
        }, this.props.history)
    }

    onChange(e){
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { errors } = this.state
        const { _loading } = this.context

        return (
            <div className="landing">
                <div className="dark-overlay landing-inner">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-6">
                                <p>Logueese ak7</p>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-body">
                                        <center><h4 className="card-title">Login</h4></center>
                                        <form onSubmit={this.submit}>
                                            <div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <i className="material-icons prefix">account_circle</i>
                                                            </div>
                                                        </div>
                                                        <input onChange={this.onChange} name="username" type="text" placeholder="Username"
                                                            className={'form-control ' + classnames('', {
                                                                'is-invalid': errors.username
                                                            })} autoFocus required/>
                                                        {errors.username && (<div className="invalid-feedback">{errors.username}</div>)}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <div className="input-group-prepend">
                                                            <div className="input-group-text">
                                                                <i className="material-icons prefix">vpn_key</i>
                                                            </div>
                                                        </div>
                                                        <input onChange={this.onChange} name="password" type="password" placeholder="Password" className="materialize-textarea"
                                                            className={'form-control ' + classnames('', {
                                                                'is-invalid': errors.password
                                                            })} required/>
                                                        {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-outline-primary btn-block">
                                                Log in
                                            </button>
                                        </form>
                                    </div>
                                    <div className="card-footer">
                                        <center><Link to="/signup">create account</Link></center>               
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

Login.propTypes = {
    login: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { login })(Login)