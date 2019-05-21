import React, { Component } from 'react'

import AddPostForm from '../posts/AddPostForm'
import PostFeed from '../posts/PostFeed';
import TopProfiles from '../suggestions/profile-suggestions/TopProfiles';

class Newsfeed extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-5 order-sm-last">
                        <TopProfiles />
                    </div>
                    <div className="col-sm-7 order-sm-first">
                        <AddPostForm />
                        <PostFeed />
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsfeed