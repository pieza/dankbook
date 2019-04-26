import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/post.actions'
import PostList from './PostList';

class PostFeed extends Component {

    componentDidMount() {
        this.props.getPosts()
    }

    render() {
        const { posts, loading } = this.props.post
        let postContent
       if(posts === null || loading){
            postContent = <div></div>
        } else {
            postContent = <PostList posts={posts}/>
        }
        return (
            <div>
                { postContent }
            </div>
        )
    }

}

PostFeed.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts })(PostFeed)