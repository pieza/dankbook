import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProfileItem from './ProfileItem';

class ProfileList extends Component {

    render() {
        const { profiles } = this.props

        return profiles.map(profile => <ProfileItem key={profile._id} profile={profile}/>)
    }

}

ProfileList.propTypes = {
    profiles: PropTypes.array.isRequired
}

export default ProfileList