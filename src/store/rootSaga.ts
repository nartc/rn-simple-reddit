import { all, fork } from 'redux-saga/effects';
import { watchStartAuthenticate } from '../screens/Auth/redux';
import { watchFetchPost } from '../screens/Post/redux';

export default function* rootSaga() {
  yield all([
    fork(watchStartAuthenticate),
    fork(watchFetchPost)
  ]);
}
