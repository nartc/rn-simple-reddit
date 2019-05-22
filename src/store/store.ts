import createSagaMiddleware from '@redux-saga/core';
import { createStore, applyMiddleware, Middleware } from 'redux';
import logger from 'redux-logger';
import { AuthState } from '../screens/Auth/redux';
import { PostState } from '../screens/Post/redux';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export type AppState = {
  userState: AuthState;
  postState: PostState;
};

const sagaMiddleware = createSagaMiddleware();

const middleware: Middleware[] = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export default (initialState?: AppState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
