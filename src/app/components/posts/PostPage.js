import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getPost } from '../../redux/actions/post.actions';
import Unauthorized from '../errors/403-unauthorized'
import NotFound from '../errors/404-not-found'
import Loading from '../shared/Loading';
import PostItem from './PostItem';

class PostPage extends Component {

    componentDidMount() {
        if (this.props.match.params.id)
            this.props.getPost(this.props.match.params.id)
    }

    render() {
        const { isAuthenticated, user } = this.props.auth
        const { post, loading } = this.props.post

        let postContent

        if (loading)
            postContent = <Loading size="6rem" />
        else if (!post.user)  // not recomended technique, must consider to look for another
            postContent = <NotFound />
        else
            postContent = (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <PostItem post={post} isPage />
                        </div>
                    </div>
                </div>
            )

        return (
            isAuthenticated ? postContent : <Unauthorized />
        )
    }
}

PostPage.propTypes = {
    auth: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, { getPost })(PostPage)