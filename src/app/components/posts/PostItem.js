import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../actions/post.actions';

class PostItem extends Component {
    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { post, auth, showActions } = this.props;

        return (
            <div className="card">
                <div className="card-action">
                    <img className="avatar-navbar" src={post.user.avatar}></img>
                    <span className="card-title activator grey-text text-darken-4">{ post.user.username }<i className="material-icons right">more_vert</i></span>
                </div>
                <div className="card-content">
                    <p>{ post.description }</p>
                </div>
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={ post.image_url } />
                </div>
                <div className="card-action">
                    <a href="#">like</a>
                    <a href="#">comment</a>
                </div>
            </div>

        )
    }
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)