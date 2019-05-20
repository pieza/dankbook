import React, { Component } from 'react'

import AddPostForm from '../posts/AddPostForm'
import PostFeed from '../posts/PostFeed';
import TopProfiles from '../suggestions/TopProfiles';

class Newsfeed extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <AddPostForm />
                        <PostFeed />
                    </div>
                    <div className="col-md-5">
                        <TopProfiles />
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsfeed