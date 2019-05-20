import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames'
import { connect } from 'react-redux';
import { deleteComment } from '../../../redux/actions/post.actions';
import Loading from '../../shared/Loading';

class CommentItem extends Component {

    onDeleteClick(post_id, comment_id) {
        this.props.deleteComment(post_id, comment_id);
    }

    onLikeClick(id) {
        this.props.toggleLike(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        
        if (likes.filter(like => like._id === auth.user._id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    changeRoute(path) {
        $('#' + this.props.comment.post_id).modal('hide')
        this.props.history.push(path);
    }

    render() {
        const { comment, auth, showActions } = this.props

        return (
            <li className="list-group-item" style={{border: "0px"}}>
                <div className="input-group">
                    <div className="input-group-prepend clickable mb-0" style={{ marginRight: "15px" }} data-toggle="tooltip" data-placement="top" title={comment.user.username}
                        onClick={this.changeRoute.bind(this, `/profile/${comment.user.username}`)}>
                        <img className="avatar-navbar" src={comment.user.avatar}></img>
                    </div>
                    <div className="comment-item">
                        <span className="username-link" onClick={this.changeRoute.bind(this, `/profile/${comment.user.username}`)}> { comment.user.username }</span>
                        <br/>
                        <span >{ comment.text }</span>
                    </div>
                    <div className="input-group-append clickable mb-0" style={{ marginRight: "15px" }} >
                        <a className="float-right clickable mb-0" data-toggle="dropdown">
                            <i className="material-icons right float-xl">more_vert</i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="commentDropdown">
                            <a className="dropdown-item">
                                <i className="material-icons left">flag</i> Report
                            </a>
                            <div className="dropdown-divider"></div>
                            { comment.user_id === auth.user._id ? (
                                <a className="dropdown-item" onClick={this.onDeleteClick.bind(this, comment.post_id, comment._id)}>
                                    <i className="material-icons left">delete</i> Delete
                                </a>
                            ) : null }
                        </div>
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