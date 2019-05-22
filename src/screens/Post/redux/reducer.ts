import { action } from 'typesafe-actions';
import { ActionTypeWithout } from '../../../utils/types';

export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const postActions = {
  fetchPosts: (subreddit: string) => action(FETCH_POSTS_START, subreddit),
  fetchPostsPending: () => action(FETCH_POSTS_PENDING),
  fetchPostsSuccessful: (posts: any, subreddit: any) => action(FETCH_POSTS_SUCCESS, { posts, subreddit }),
  fetchPostsError: (error: any) => action(FETCH_POSTS_FAILURE, error)
};

export type PostActions = ActionTypeWithout<typeof postActions, 'fetchPosts'>;
export type PostState = {
  isLoading: boolean;
  timestamp: number;
  subreddits: {
    hot: any[];
    random: any[];
  };
  error?: any;
};

const initialState: PostState = {
  isLoading: false,
  timestamp: 0,
  subreddits: {
    hot: [],
    random: []
  }
};

export const postReducer = (state: PostState = initialState, action: PostActions) => {
  switch (action.type) {
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        timestamp: Date.now(),
        error: null,
        subreddits: {
          ...state.subreddits,
          [action.payload.subreddit]: action.payload.posts || []
        }
      };
    case 'FETCH_POSTS_PENDING':
      return {
        ...state,
        isLoading: true,
        timestamp: Date.now(),
        error: null
      };
    case 'FETCH_POSTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        timestamp: Date.now(),
        error: action.payload,
        subreddits: {
          ...state.subreddits,
          [action.payload.subreddit]: []
        }
      };
    default:
      return state;
  }
};
