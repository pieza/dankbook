import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ProfileSuggestionItem extends Component {

    changeRoute(path) {
        this.props.history.push(path);
    }

    render() {
        const { user } = this.props

        return (
            <div className="text-center clickable" onClick={this.changeRoute.bind(this, `/profile/${user.username}`)}>
                <img src={user.avatar} className="card-img" alt={ user.username } style={{width:64, height:64}}/>
                <p> { user.username }</p>
            </div>
        )
    }
}

ProfileSuggestionItem.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}
  
const mapStateToProps = state => ({
    auth: state.auth
})
  
export default connect(mapStateToProps, { })(withRouter(ProfileSuggestionItem))