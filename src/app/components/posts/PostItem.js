import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { deletePost, toggleLike } from '../../actions/post.actions'
import MediaItem from './media/MediaItem'
import Loading from '../shared/Loading'
import AddCommentForm from './comment/AddCommentForm'
import CommentList from './comment/CommentList'
import CommentsModal from './comment/CommentsModal';
import LikeButton from './like/LikeButton';

class PostItem extends Component {

    changeRoute(path) {
        this.props.history.push(path);
    }

    onDeleteClick(id) {
        this.props.deletePost(id);
    }

    render() {
        const { post, auth, showActions, colSize } = this.props

        return (
            <div className={ ''/*'col-sm-12 col-md-' + (colSize ? colSize : '7') */}>
                <div className="card post-item" >
                    <div className="card-header" style={{backgroundColor: "#fff", borderBottom: "none"}}>
                        <img className="avatar-navbar clickable" src={post.user.avatar} onClick={this.changeRoute.bind(this, `/profile/${post.user.username}`)}></img>
                        <span className="card-title activator grey-text text-darken-4 username-link" onClick={this.changeRoute.bind(this, `/profile/${post.user.username}`)}>{ post.user.username }</span>
                        <a className="float-right clickable" data-toggle="dropdown">
                            <i className="material-icons right float-xl">more_vert</i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item">
                                <i className="material-icons left">flag</i> Report
                            </a>
                            <div className="dropdown-divider"></div>
                            { post.user_id === auth.user._id ? (
                                <a className="dropdown-item" onClick={this.onDeleteClick.bind(this, post._id)}>
                                    <i className="material-icons left">delete</i> Delete
                                </a>
                            ) : null }
                            
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            { post.description ? (<p style={{padding: ".75rem 1.25rem"}}>{ post.description }</p>) : null }
                            { post.media ? <MediaItem key={post.media.id} media={post.media} /> : <div></div> }
                        </li>
                    </ul>
                    <div className="card-body align-items-center justify-content-center" style={{padding: ".75rem"}}>
                        <LikeButton post={post}/>

                        <a className=" clickable float-right post-action" onClick={()=>{$('#' + post._id).modal()}}><i className="material-icons left">add_comment</i> ({post.comments.length}) comment</a>
                        <CommentsModal post={post}/>
                    </div>

                    {/* Comments */}
                    {/*
                    <div className="card-footer">
                        <ul className="list-group list-group-flush">
                            { post.comments ? <CommentList comments={post.comments}/> : null }
                            <AddCommentForm post_id={post._id}/>
                        </ul>
                    </div>
                    */}
                </div>
            </div>
        )
    }
}

PostItem.defaultProps = {
    showActions: true
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deletePost })(withRouter(PostItem))