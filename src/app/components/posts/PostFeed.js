import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getPosts, getPostsByUserId } from '../../redux/actions/post.actions'
import PostList from './PostList';
import Loading from '../shared/Loading';

class PostFeed extends Component {

    componentDidMount() {
        if (this.props.userId)
            this.props.getPostsByUserId(this.props.userId)
        else
            this.props.getPosts()
    }

    render() {
        const { posts, loading } = this.props.post
        const { userId } = this.props

        let postContent

        if(loading)
            postContent = <Loading size={'5rem'}/>

        else if(posts === null || posts.length == 0)
            postContent = 
                <div className="text-center mt-5" style={{color: "grey"}}>
                    { userId ? 
                        <h5>There are no post to show for this user.</h5>
                        : <h5>There are no post to show, start following users to see posts!</h5> 
                    }
                </div>
        else 
            postContent = <PostList posts={posts}/>
    
        return (
            postContent 
        )
    }

}

PostFeed.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    userId: PropTypes.string
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts, getPostsByUserId })(PostFeed)