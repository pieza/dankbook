import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { toggleFollow } from '../../../redux/actions/profile.actions'

class FollowButton extends Component {

    onFollowClick(){
        const { profile } = this.props
        this.props.toggleFollow(profile._id)
    }

    findUserFollow() {
        const { profile } = this.props
        const { user } = this.props.auth
        
        if (profile.followers && profile.followers.filter(follower => { return follower._id+'' == user._id+''}).length > 0) 
            return true
        else 
            return false      
    }


    render() {
        const { profile } = this.props
        const { user } = this.props.auth
        const isFollowing = this.findUserFollow()

        return (
            profile._id != user._id ? 
                <button type="button" className={'btn mb-0 btn-' + (isFollowing ? 'danger' : 'info') } onClick={this.onFollowClick.bind(this)}>
                    <i className="material-icons">accessibility</i> { isFollowing ? 'UnFollow' : 'Follow' }
                </button>
            : null 
        )
    }
}

FollowButton.propTypes = {
    toggleFollow: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { toggleFollow })(withRouter(FollowButton))