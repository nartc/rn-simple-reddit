import { put, takeEvery } from '@redux-saga/core/effects';
import { clearToken, getToken, setToken, tokenHasExpired } from '../../../api/Storage';
import { authActions, AUTHENTICATION_START } from './reducer';

export const watchStartAuthenticate = function* () {
  yield takeEvery(AUTHENTICATION_START, startAuthenticate);
};

const startAuthenticate = function* () {
  const tokenExpired = yield tokenHasExpired();
  const token = yield getToken();

  if (tokenExpired) {
    yield clearToken();
  }

  if (token && !tokenExpired) {
    yield setToken(token);
    yield put(authActions.authenticateSuccess(token));
  } else {
    yield put(authActions.authenticatePending());
  }
};
