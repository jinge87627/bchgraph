import {
    AUTHENTICATE_USER,
    AUTHENTICATE_USER_SUCCESS,
    AUTHENTICATE_USER_ERROR,
} from '../actions';

const INIT_STATE = {
    user: localStorage.getItem('email'),
    error: ''
};

const authEvents =  (state = INIT_STATE, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            return { ...state, loading: true, error: '' };
        case AUTHENTICATE_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload.email, error: '' };
        case AUTHENTICATE_USER_ERROR:
            return { ...state, loading: false, user: '', error: action.payload.message };
        default: return { ...state };
    }
}

export default authEvents;
