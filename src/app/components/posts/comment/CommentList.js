import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CommentItem from './CommentItem';

class CommentList extends Component {

    render() {
        const { comments } = this.props

        return comments.map(comment => <CommentItem key={comment._id} comment={comment}/>)
    }

}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default CommentList