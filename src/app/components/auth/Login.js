import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { login } from '../../actions/auth.actions'


class Login extends Component{
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
                                                <input onChange={this.onChange} name="username" type="text" placeholder="Username"
                                                className={classnames('', {
                                                    'invalid': errors.username
                                                })} autoFocus required/>
                                            {errors.username && (<span className="helper-text" data-error={errors.username}></span>)}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input onChange={this.onChange} name="password" type="password" placeholder="Password" className="materialize-textarea"
                                                className={classnames('', {
                                                    'invalid': errors.password
                                                })} required/>
                                            {errors.password && (<span className="helper-text" data-error={errors.password}></span>)}
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