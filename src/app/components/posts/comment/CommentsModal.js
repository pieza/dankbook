import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddCommentForm from './AddCommentForm';
import CommentList from './CommentList';
import LikeButton from '../like/LikeButton';

class CommentsModal extends Component {

    render() {
        const { post } = this.props

        return (
            <div className="modal fade" id={post._id} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document" style={{marginTop: "7.5rem"}}>
                    <div className="modal-content">

                        <div className="modal-header">
                            <LikeButton post={post} />
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body pt-0">
                            <div className="overflow-auto pt-3" style={{maxHeight:"25.5rem"}}>
                                <ul className="list-group list-group-flush">
                                    { post.comments.length > 0 ? <CommentList comments={post.comments}/> 
                                        :  <li className="list-group-item" style={{border: "0px"}}>
                                            <h4 className="text-center" style={{color: "grey"}}>No comments.</h4>
                                        </li> }
                                </ul>
                            </div>
                        </div>

                        <div className="modal-footer" style={{display: "block", justifyContent: "none"}}>
                            <ul className="list-group list-group-flush">
                                <AddCommentForm post_id={post._id}/>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

CommentsModal.propTypes = {
    post: PropTypes.object.isRequired
}

export default CommentsModal