import { takeEvery, take, fork, put, select } from '@redux-saga/core/effects';
import { RedditClient } from '../../../api/RedditClient';
import { AppState } from '../../../store/store';
import { FETCH_POSTS_START, postActions } from './reducer';

export const watchFetchPost = function* () {
  yield takeEvery(FETCH_POSTS_START, (action: ReturnType<typeof postActions.fetchPosts>) => fetchPosts(action.payload));
};

const fetchPosts = function* (subreddit: string) {
  yield put(postActions.fetchPostsPending());
  const token: string = yield select((state: AppState) => state.userState.token);
  const redditClient = new RedditClient(token);
  try {
    const result = yield redditClient.getPosts(subreddit);
    if (result.error) {
      yield put(postActions.fetchPostsError(result.error));
    } else {
      let items = null;
      console.log({ result });
      if (Array.isArray(result)) {
        items = result.reduce((all, subitems) => all.concat(subitems.data.children), []);
      } else {
        items = result.data.children;
      }

      yield put(postActions.fetchPostsSuccessful(items, subreddit));
    }
  } catch (error) {
    yield put(postActions.fetchPostsError(error));
  }
};
