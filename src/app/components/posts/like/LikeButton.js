import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { toggleLike } from '../../../actions/post.actions'

class LikeButton extends Component {

    onLikeClick(id) {
        this.props.toggleLike(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;

        if (likes.filter(like => like._id === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { post } = this.props

        return (
            <a onClick={this.onLikeClick.bind(this, post._id)}
                className={classnames('post-action clickable', {
                    'is-active': this.findUserLike(post.likes)
                })}>
                <i className="material-icons left">thumb_up</i> ({post.likes.length}) like
            </a>
        )
    }
}

LikeButton.propTypes = {
    toggleLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { toggleLike })(withRouter(LikeButton))