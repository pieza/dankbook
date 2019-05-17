import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { getProfileByUsername } from '../../actions/profile.actions';
import Unauthorized from '../errors/403-unauthorized'
import NotFound from '../errors/404-not-found'
import Loading from '../shared/Loading';
import PostFeed from '../posts/PostFeed';
import ProfileCard from './ProfileCard';

class ProfilePage extends Component {

    componentDidMount() {
        if (this.props.match.params.id) 
            this.props.getProfileByUsername(this.props.match.params.id)
    }

    render() {
        const { isAuthenticated, user } = this.props.auth
        const { profile, loading } = this.props.profile

        let profileContent

        if (loading)
            profileContent = <Loading size="6rem"/>
        else if(profile === null)
            profileContent = <NotFound/>
        else
            profileContent = (
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 sticky-top">
                            <ProfileCard profile={profile}/>
                        </div>
                        <div className="col-md-6">
                            <PostFeed userId={profile._id} colSize={12}/>
                        </div>
                    </div>
                </div>

            )
        
        return (
            isAuthenticated ? (
                profileContent
            ) : <Unauthorized />
        )
    }
}

ProfilePage.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfileByUsername: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileByUsername })(ProfilePage)