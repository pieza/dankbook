import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class TopProfiles extends Component {

    render() {
        const { user } = this.props.auth

        return (
            <div className="">
                <div className="card post-item">
                    <div className="card-body">
                        asd
                    </div>
                </div>
            </div>

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