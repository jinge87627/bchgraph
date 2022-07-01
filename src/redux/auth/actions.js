import {
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
} from '../actions';

export const authenticateUser = (user, history) => ({
  type: AUTHENTICATE_USER,
  payload: { user, history }
});
export const authenticateUserSuccess = (user) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: user
});
export const authenticateUserError = (message) => ({
  type: AUTHENTICATE_USER_ERROR,
  payload: { message }
});
