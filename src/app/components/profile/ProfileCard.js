import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleFollow, updateProfile } from '../../redux/actions/profile.actions'
import Loading from '../shared/Loading';
import FollowButton from './follow/FollowButton';

class ProfileCard extends Component {
    constructor() {
        super()
        this.state = {
            description: '',
            image: null,
            image_preview: '',
            errors: {},
            isEditDescription: false
        }
        this.onChange = this.onChange.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onEditDescriptionClick = this.onEditDescriptionClick.bind(this)
        this.onCancelEditDescriptionClick = this.onCancelEditDescriptionClick.bind(this)
    }

    componentDidMount(){
        if(!this.state.isEditDescription)
            this.setState({description: this.props.profile.profile.description})
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    onEditDescriptionClick() {
        this.setState({ isEditDescription: true })
    }

    onCancelEditDescriptionClick() {
        this.setState({ isEditDescription: false, description: this.props.profile.profile.description })
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
        this.props.updateProfile(user._id, { description: this.state.description })
        this.setState({isEditDescription: false})

    }

    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

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
                                <img className="card-img-top rounded-circle" src={ profile.avatar } style={{ width:'10rem', height: '10rem', backgroundColor: '#fff'}}/>
                                <div className="overlay">
                                    <span>
                                        <i className="material-icons">edit</i>
                                        Edit
                                    </span>
                                    
                                </div>
                                <input type="file" name="image" accept="image/x-png,image/gif,image/jpeg" onChange={this.onFileChange} hidden></input>
                            </label>
                            : <img className="card-img-top rounded-circle mt-3" src={ profile.avatar } style={{ width:'128px', height: '128px', backgroundColor: 'grey'}}/> 
                        }
                        
                    </div>
                    
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            {/* Username */}
                            <li className="list-group-item">
                                <h5 className="card-title">{ profile.username }  { profile.badges ? 

                                    profile.badges.map((badge, index) => {
                                            return (
                                                <span key={index} className={ 'badge badge-pill badge-' + badge.color }>{ badge.description }</span>
                                            )
                                        }
                                    )
                              
                            : null }</h5> 
                            </li>
                            
                            {/* Badges 
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
                            */}
                            {/* Description */}
                            { profile.description ? 
                                <li className="list-group-item">
                                    { this.state.isEditDescription ? 
                                        <form onSubmit={this.onSubmit}>
                                            <textarea name="description" value={this.state.description} onChange={this.onChange} style={{width: "100%", resize: "none"}}></textarea>
                                            <button className="btn btn-info" type="submit">Save</button>
                                            <button className="btn btn-danger" type="button" onClick={this.onCancelEditDescriptionClick}>Cancel</button>
                                        </form>

                                        : <p className="card-text">{ profile.description } { profile._id == user._id ? <span className="clickable" onClick={this.onEditDescriptionClick}><i className="material-icons">edit</i></span> : null }</p>  
                                    }
                                    
                                </li>
                            : null }

                            {/* Followers count */}
                            <li className="list-group-item">
                                <h6 className="card-title">Following { profile.following ? profile.following.length : 0 } | Followers { profile.followers ? profile.followers.length : 0 }</h6> 
                            </li>
    
                            {/* Follow */}
                            <FollowButton profile={profile}/>
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