import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getPosts, getPostsByUserId } from '../../actions/post.actions'
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
        let postContent

        if(loading)
            postContent = <div className="col-sm-12 col-md-7" style={{lineHeight: '20rem'}}>
                <Loading size={'5rem'} />
            </div>
        else if(posts === null)
            postContent = <div></div>
        else 
            postContent = <PostList posts={posts} colSize={this.props.colSize}/>
    
        return (
            postContent 
        )
    }

}

PostFeed.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    userId: PropTypes.string,
    colSize: PropTypes.number
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts, getPostsByUserId })(PostFeed)