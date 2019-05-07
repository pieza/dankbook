import { ADD_POST, GET_POSTS, GET_POST, DELETE_POST, POST_LOADING, TOGGLE_LIKE } from '../actions/types'

const initialState = {
    posts: [],
    post: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case GET_POST:
            return {
                ...state,
                posts: action.payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                loading: false
            };
        case TOGGLE_LIKE:
            return {
                ...state,
                posts: state.posts.map(_post => _post._id === action.payload.id 
                    ? { ..._post, likes: action.payload.likes } : _post)
            }
        default:
            return state
    }
}