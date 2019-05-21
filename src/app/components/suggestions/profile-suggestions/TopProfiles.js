import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPopularProfiles } from '../../../redux/actions/profile.actions'
import ProfileSuggestionItem from './ProfileSuggestionItem'
import Loading from '../../shared/Loading';

class TopProfiles extends Component {

    componentDidMount() {
        this.props.getPopularProfiles({top: 3})
    }

    render() {
        const { popularProfiles, loadingPopular } = this.props.profile
        let content

        if(loadingPopular)
            content =
                <div className="card post-item">
                    <div className="card-body">
                        <Loading size={'3rem'}/>
                    </div>
                </div> 
            
        else if(popularProfiles === null || popularProfiles.length === 0)
            content = <div></div>
        else 
            content = 
                <div className="card post-item">
                    <div className="card-body">
                        <div className="text-center">
                            <h5 className="card-title">Top Profiles</h5>
                            <div className="row">
                                { popularProfiles.map(profile => { 
                                    return (
                                        <div className="col-4" key={profile._id}>
                                            <ProfileSuggestionItem user={profile}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

        return (
            content
        )
    }
}

TopProfiles.propTypes = {
    auth: PropTypes.object.isRequired,
    getPopularProfiles: PropTypes.func.isRequired
}
  
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
  
export default connect(mapStateToProps, { getPopularProfiles })(TopProfiles)