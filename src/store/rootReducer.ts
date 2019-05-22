import { persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { authReducer } from '../screens/Auth/redux';
import { postReducer } from '../screens/Post/redux';

const persistConfig: PersistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  userState: authReducer,
  postState: postReducer
});

export default persistReducer(persistConfig, rootReducer);
