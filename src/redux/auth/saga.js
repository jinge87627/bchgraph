
import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    AUTHENTICATE_USER
} from '../actions';

import {
    authenticateUserSuccess,
    authenticateUserError
} from './actions';

export function* watchAuthenticateUser() {
    yield takeEvery(AUTHENTICATE_USER, authenticateWithEmailPassword);
}

const authenticateWithEmailPasswordAsync = async (user) =>
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/user/login', user)
        .then(res => res.data)
        .catch(error => error.message);

    function* authenticateWithEmailPassword({ payload }) {
        const { history } = payload;
        try {
            const authenticateUser = yield call(authenticateWithEmailPasswordAsync, payload.user);
            if (authenticateUser.message === "Correct Password") {
                yield put(authenticateUserSuccess(authenticateUser.user));
                localStorage.setItem('email', authenticateUser.user.email);
                history.push('/');
            } else {
                yield put(authenticateUserError(authenticateUser));
            }
        } catch (error) {
            yield put(authenticateUserError(error));
        }
    }

    export default function* rootSaga() {
        yield all([
            fork(watchAuthenticateUser)
        ]);
    }
