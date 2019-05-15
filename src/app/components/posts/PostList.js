import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PostItem from './PostItem';

class PostList extends Component {

    render() {
        const { posts, colSize } = this.props

        return posts.map(post => <PostItem key={post._id} post={post} colSize={colSize}/>)
    }

}

PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    colSize: PropTypes.number
}

export default PostList