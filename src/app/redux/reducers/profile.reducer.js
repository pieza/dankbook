import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, POPULAR_PROFILES_LOADING, GET_POPULAR_PROFILES } from '../actions/types';

const initialState = {
    profile: {},
    profiles: [],
    popularProfiles: [],
    loading: false,
    loadingPopular: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            }
        case POPULAR_PROFILES_LOADING:
            return {
                ...state,
                loadingPopular: true
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }
        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }
        case GET_POPULAR_PROFILES:
            return {
                ...state,
                popularProfiles: action.payload,
                loadingPopular: false
            }
        default:
            return state;
    }
}