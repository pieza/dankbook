import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ProfileItem extends Component {

    render() {
        const { profile } = this.props
        console.log(profile)
        return (
            <div className="card post-item">
                <div className="card-body">
                    {profile.username}
                </div>
            </div>
        )
    }
}

ProfileItem.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    auth: state.auth
})
  
export default connect(mapStateToProps, { })(ProfileItem)