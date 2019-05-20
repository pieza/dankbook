import axios from 'axios'
import setAuthToken from '../../utils/auth-token'
import jwt_decode from 'jwt-decode'
import { setCookie, deleteCookie } from '../../utils/cookie-helper'

import { API_PATH, COOKIE_JWT } from '../../constants/environment'
import { GET_ERRORS, SET_CURRENT_USER } from './types'

// Signup
export const signup = (userData, history) => dispatch => {

    axios.post(API_PATH + '/signup', userData)
        .then(res => history.push('/login'))
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        })
}

// Login - Get User Token
export const login = (userData, history) => dispatch => {
    axios.post(API_PATH + '/login', userData)
        .then(res => {
            // save to localStorage
            const { token } = res.data
            // set token to ls
            setCookie(COOKIE_JWT, token, 1)
            // set token to Auth header
            setAuthToken(token);
            // decode token to get user data
            const decoded = jwt_decode(token)
            // Set current user
            dispatch(setCurrentUser(decoded))
            history.push('/')
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data.errors
            })
        )
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

// Log user out
export const logout = () => dispatch => {
    // Remove token from localStorage
    deleteCookie(COOKIE_JWT)
    // Remove auth header for future requests
    setAuthToken(false)
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}
