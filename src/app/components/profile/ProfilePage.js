import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileByUsername } from '../../redux/actions/profile.actions';
import Unauthorized from '../errors/403-unauthorized'
import NotFound from '../errors/404-not-found'
import Loading from '../shared/Loading';
import PostFeed from '../posts/PostFeed';
import ProfileCard from './ProfileCard';

class ProfilePage extends Component {

    componentDidMount() {
        this.loadUser()
        this.unlisten = this.props.history.listen((location, action) => {
            this.loadUser(location.pathname.split('/').reverse()[0])
        })
    }

    loadUser(key) {
        if(key)
            this.props.getProfileByUsername(key)
        else if (this.props.match.params.id) 
            this.props.getProfileByUsername(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.unlisten()
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
                        <div className="col-sm-3 sticky-sm-top">
                            <ProfileCard profile={profile}/>
                        </div>
                        <div className="col-sm-7">
                            { profile._id ? <PostFeed userId={profile._id}/> : null }
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