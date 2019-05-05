import React, { Component } from 'react';
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

    render() {
        const { comment, auth, showActions } = this.props

        return (
            <li className="list-group-item">
                { comment.text }
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

export default connect(mapStateToProps, { deleteComment })(CommentItem)