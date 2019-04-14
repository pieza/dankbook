import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Landing from './Landing'
import Newsfeed from './Newsfeed'

class Home extends Component {

    render() {
        const { isAuthenticated, user } = this.props.auth

        const landing = (<Landing />)
        const newsfeed = (<Newsfeed />)

        return (
            <div>
                { isAuthenticated ? newsfeed : landing }
            </div>
        )
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    auth: state.auth
})
  
export default connect(mapStateToProps, { })(Home)