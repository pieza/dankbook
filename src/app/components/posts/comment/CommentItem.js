import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import { connect } from 'react-redux';
import { deleteComment } from '../../../actions/post.actions';
import Loading from '../../shared/Loading';

class CommentItem extends Component {

    onDeleteClick(id) {
        this.props.deleteComment(id);
    }

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

    changeRoute(path) {
        this.props.history.push(path);
    }

    render() {
        const { comment, auth, showActions } = this.props

        return (
            <li className="list-group-item" style={{border: "0px"}}>
                <div className="input-group" style={{backgroundColor:"rgba(0,0,0,.03)"}}>
                    <div className="input-group-prepend clickable mb-0" style={{ marginRight: "15px" }} data-toggle="tooltip" data-placement="top" title={comment.user.username}
                        onClick={this.changeRoute.bind(this, `/profile/${comment.user.username}`)}>
                        <img className="avatar-navbar" src={comment.user.avatar}></img>
                    </div>
                    <div className="comment-item">
                        <span >{ comment.text }</span>
                    </div>
                </div>
            </li>
        )
    }
}

CommentItem.defaultProps = {
    showActions: true
};

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(withRouter(CommentItem))