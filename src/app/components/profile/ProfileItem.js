import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ProfileItem extends Component {

    changeRoute(path) {
        this.props.history.push(path);
    }

    render() {
        const { profile } = this.props

        return (
            <div className="card post-item clickable" onClick={this.changeRoute.bind(this, `/profile/${profile.username}`)}>
                <div className="row no-gutters">
                    <div className="col-xs-1 col-sm-3 col-md-3 col-lg-3">
                        <img src={profile.avatar} className="card-img" alt={ profile.username }/>
                    </div>
                    <div className="col-xs-3 col-sm-6 col-md-6 col-lg-6">
                        <div className="card-body">
                            <h5 className="card-title">{ profile.username }</h5>
                            <p className="card-text">{ profile.followers.length } followers</p>
                        </div>
                    </div>
                    <div className="col-xs-1 col-sm-3 col-md-3 col-lg-3">

                    </div>
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
  
export default connect(mapStateToProps, { })(withRouter(ProfileItem))