import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleFollow, updateProfile } from '../../redux/actions/profile.actions'
import Loading from '../shared/Loading';

class ProfileCard extends Component {
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

    onFollowClick(){
        const { profile } = this.props.profile
        this.props.toggleFollow(profile._id)
    }

    findUserFollow() {
        const { profile } = this.props.profile
        const { user } = this.props.auth
        
        if (profile.followers && profile.followers.filter(follower => { return follower._id+'' == user._id+''}).length > 0) 
            return true
        else 
            return false      
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onFileChange(e) {
        const { user } = this.props.auth

        this.setState({ image: e.target.files[0], image_preview: URL.createObjectURL(e.target.files[0]) }, () => {
            if (this.state.image) {
                const formData = new FormData()
                formData.append('file', this.state.image)
                this.props.updateProfile(user._id, formData)
            }
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const { user } = this.props.auth
        const formData = new FormData()

        formData.append('user_id', user._id)
        formData.append('description', this.state.description)

        if (this.state.image) {
            formData.append('media_string', JSON.stringify({ type: IMAGE }))
            formData.append('file', this.state.image)
        }
    }

    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile
        const isFollowing = this.findUserFollow()

        let content

        if (loading)
            content = 
                <div className="card post-item">
                    <div className="text-center">
                        <Loading size="3rem"/>
                    </div>
                </div>
            
        else if(profile === null)
            content = <div></div>

        else
            content = (
                <div className="card post-item">
                    <div className="text-center">
    
                        { profile._id == user._id ? 
                            <label className="img-container mt-3 clickable">
                                <img className="card-img-top rounded-circle" src={ profile.avatar } style={{ width:'10rem', height: '10rem', backgroundColor: 'grey'}}/>
                                <div className="overlay">
                                    <span>
                                        <i className="material-icons">edit</i>
                                        Edit
                                    </span>
                                    
                                </div>
                                <input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" onChange={this.onFileChange} hidden></input>
                            </label>
                        : 
                            <img className="card-img-top rounded-circle mt-3" src={ profile.avatar } style={{ width:'128px', height: '128px', backgroundColor: 'grey'}}/> 
                        }
                        
                    </div>
                    
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {/* Username */}
                            <li className="list-group-item">
                                <h5 className="card-title">{ profile.username }</h5>
                            </li>
    
                            {/* Description */}
                            { profile.description ? 
                                <li className="list-group-item">
                                    <p className="card-text">{ profile.description }</p>
                                </li>
                            : null }
    
                            {/* Followers count */}
                            <li className="list-group-item">
                                <h6 className="card-title">Following { profile.following ? profile.following.length : 0 } | Followers { profile.followers ? profile.followers.length : 0 }</h6> 
                            </li>
    
                            {/* Follow */}
                            { profile._id != user._id ? 
                                <li className="list-group-item">
                                    <button type="button" className={'btn mb-0 btn-' + (isFollowing ? 'danger' : 'info') } onClick={this.onFollowClick.bind(this)}>
                                        <i className="material-icons">accessibility</i> { isFollowing ? 'UnFollow' : 'Follow' }
                                    </button>
                                </li>
                            : null}
    
                            {/* Badges */}
                            { profile.badges ? 
                                <li className="list-group-item">
                                    {profile.badges.map((badge, index) => {
                                            return (
                                                <span key={index} className={ 'badge badge-pill badge-' + badge.color }>{ badge.description }</span>
                                            )
                                        }
                                    )}
                                </li>
                            : null }
    
                        </ul>
                        
                    </div>
                </div>
            ) 

        return content
    }
}

ProfileCard.propTypes = {
    toggleFollow: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { toggleFollow, updateProfile })(ProfileCard)