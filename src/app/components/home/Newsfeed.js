import React, { Component } from 'react'

import AddPostForm from '../posts/AddPostForm'
import PostFeed from '../posts/PostFeed';

class Newsfeed extends Component {

    render() {
        return (
            <div className="container">
                <AddPostForm />
                <PostFeed />
            </div>
        )
    }
}

export default Newsfeed