import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleFollow  } from '../../actions/profile.actions';

class ProfileCard extends Component {

    onFollowClick(){
        const { profile } = this.props.profile
        this.props.toggleFollow(profile._id)
    }

    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        return (
            <div className="card">
                <img className="card-img-top rounded-circle" src={ profile.avatar }></img>
                <div className="card-body">
                    <ul className="list-group list-group-flush">
                        {/* Username */}
                        <li className="list-group-item">
                            <h5 className="card-title">{ profile.username }</h5>
                        </li>

                        {/* Description */}
                        { profile.description ? 
                            <li className="list-group-item">
                                <h5 className="card-title">{ profile.description }</h5>
                            </li>
                        : null }

                        {/* Followers count */}
                        <li className="list-group-item">
                            <h6 className="card-title">Following { profile.following ? profile.following.length : 0 } | Followers { profile.followers ? profile.followers.length : 0 }</h6> 
                        </li>

                        {/* Follow */}
                        { profile._id != user.id ? 
                            <li className="list-group-item">
                                <button type="button" className="btn btn-info mb-0" onClick={this.onFollowClick.bind(this)}>
                                    <i className="material-icons">accessibility</i> Follow
                                </button>
                            </li>
                        : null}

                        {/* Badges */}
                        <li className="list-group-item">
                            <span className="badge badge-pill badge-primary">Primary</span>
                            <span className="badge badge-pill badge-danger">Primary</span>
                        </li>
                    </ul>
                    
                </div>
            </div>

        ) 
    }
}

ProfileCard.propTypes = {
    toggleFollow: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { toggleFollow })(ProfileCard)