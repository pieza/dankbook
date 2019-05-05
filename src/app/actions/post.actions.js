import axios from 'axios';

import { ADD_POST, GET_ERRORS, CLEAR_ERRORS, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST, TOGGLE_LIKE } from './types';

import { API_PATH } from '../constants/environment'

// Add Post
export const addPost = postData => dispatch => {
    dispatch(clearErrors())
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios
        .post(API_PATH + '/posts', postData, config)
        .then(res =>
            dispatch({
                type: ADD_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors || null
            })
        )
}

// Get Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(API_PATH + '/posts')
        .then(res =>
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POSTS,
                payload: null
            })
        )
}

// Get Post
export const getPost = id => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`${API_PATH}/posts/${id}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_POST,
                payload: null
            })
        )
}

// Delete Post
export const deletePost = id => dispatch => {
    axios
        .delete(`${API_PATH}/posts/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Add Like
export const toggleLike = id => dispatch => {
    axios
        .post(`${API_PATH}/posts/like/${id}`)
        .then(res => 
            dispatch({
                type: TOGGLE_LIKE,
                payload: { id, likes: res.data }
            }))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
    dispatch(clearErrors())
    axios
        .post(`${API_PATH}/posts/comment/${postId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
}

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
    axios
        .delete(`${API_PATH}/posts/comment/${postId}/${commentId}`)
        .then(res =>
            dispatch({
                type: GET_POST,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
}

// Set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}