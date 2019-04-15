import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post.actions'

class AddPostForm extends Component {
    constructor() {
        super()
        this.state = {
            description: '',
            image: null,
            image_preview: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
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
        const formData = new FormData()

        formData.append('user_id', user.id)
        formData.append('description', this.state.description)
        formData.append('file', this.state.image)

        this.props.addPost(formData)
        this.setState({ description: '', image: null })
    }

    render() {
        const { errors } = this.state

        return (
            <div className="row">
                <div className="col s12 m7">
                    <div className="card">
                        <form onSubmit={this.onSubmit}>
                            <div className="card-content">
                                <span className="card-title">Create Post</span>
                                <input type='text' name="description" placeholder="Type something..." onChange={this.onChange} />
                                <div>
                                    <img width="50%" height="50%" src={this.state.image_preview}/>
                                </div>
                                <div className="file-field input-field">
                                    <div className="btn light-blue darken-4">
                                        <span>Image</span>
                                        <input type='file' name="image" onChange={this.onFileChange}/>
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" 
                                        className={classnames('file-path', {
                                            'invalid': errors.image
                                        })} />
                                    </div>
                                    {errors.image && (<span className="helper-text" data-error={errors.image}></span>)}
                                </div>
                            </div>
                            <div className="card-action grey-text text-darken-4">
                                <button type="submit" className="btn light-blue darken-4">
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

AddPostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { addPost })(AddPostForm)