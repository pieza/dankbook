import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { addComment } from '../../../redux/actions/post.actions'

class AddCommentForm extends Component {
    constructor() {
        super()
        this.state = {
            text: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors)
            this.setState({ errors: nextProps.errors })
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onFileChange(e) {
        this.setState({ image: e.target.files[0], image_preview: URL.createObjectURL(e.target.files[0]) });
    }

    onSubmit(e) {
        e.preventDefault()

        const { user } = this.props.auth

        this.props.addComment(this.props.post_id, {
            user_id: user._id,
            text: this.state.text
        })
        this.setState({ text: '' })
    }

    render() {
        const { errors } = this.state
        const { isAuthenticated, user } = this.props.auth

        return (
            <li className="list-group-item" style={{border: "0px"}}>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-sm-12 mb-0">
                            <div className="input-group">
                                <div className="input-group-prepend mb-0" style={{ marginRight: "15px" }}>
                                    <img className="avatar-navbar" src={user.avatar}></img>
                                </div>
                                <input type='text' name="text" value={this.state.text} placeholder="Type a comment..." onChange={this.onChange} className={classnames('form-control', {
                                    'is-invalid': errors.text
                                })} required/>
                                <div className="input-group-append">
                                    <button className="btn btn-info" type="submit">Comment</button>
                                </div>
                                {errors.text && (<div className="invalid-feedback">{errors.text}</div>)}
                            </div>

                        </div>
                    </div>
                </form>
            </li>
        )
    }

}

AddCommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { addComment })(AddCommentForm)