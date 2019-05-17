import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Landing from './Landing'
import Newsfeed from './Newsfeed'

class TopProfiles extends Component {

    render() {
        const { isAuthenticated, user } = this.props.auth

        return (
            isAuthenticated ? <Newsfeed /> : <Landing /> 
        )
    }
}

TopProfiles.propTypes = {
    auth: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    auth: state.auth
})
  
export default connect(mapStateToProps, { })(TopProfiles)