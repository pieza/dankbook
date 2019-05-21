import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfiles } from '../../redux/actions/profile.actions';
import Unauthorized from '../errors/403-unauthorized'
import NotFound from '../errors/404-not-found'
import Loading from '../shared/Loading';
import ProfileList from './ProfileList';

class ProfilesResults extends Component {

    componentDidMount() {
        this.loadUsers()
        this.unlisten = this.props.history.listen((location, action) => {
            if(location.search){
                const params = new URLSearchParams(location.search)
                const username = params.get('username')
                this.loadUsers({username})
            } else 
                this.loadUsers()
        })
    }

    loadUsers(filters) {
        if(filters)
            this.props.getProfiles(filters)
        else if (this.props.location.search) {
            const params = new URLSearchParams(location.search)
            const username = params.get('username') 
            this.props.getProfiles({username})
        } else 
            this.props.getProfiles()
    }

    componentWillUnmount() {
        this.unlisten()
    }

    render() {
        const { isAuthenticated } = this.props.auth
        const { profiles, loading } = this.props.profile

        let profileContent

        if (loading)
            profileContent = <Loading size="6rem"/>
        else if(profiles === null)
            profileContent = <NotFound/>
        else
            profileContent = (
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <ProfileList profiles={profiles}/>
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

ProfilesResults.propTypes = {
    auth: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(ProfilesResults)