import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PostItem from './PostItem';

class PostList extends Component {

    render() {
        const { posts } = this.props

        return posts.map(post => <div className="col s12 m7"><PostItem key={post.id} post={post}/></div>)
    }

}

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList