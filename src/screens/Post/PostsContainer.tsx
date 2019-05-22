import { connect } from 'react-redux';
import { AppState } from '../../store/store';
import { postActions } from './redux';
import Posts from '../../components/Post/Posts';

const mapStateToProps = (state: AppState) => ({
  token: state.userState.token,
  posts: state.postState.subreddits.hot,
  postsError: state.postState.error,
  postsTimestamp: state.postState.timestamp,
  isFetchingPosts: state.postState.isLoading,
  subreddit: 'hot'
});

const mapDispatchToProps = {
  fetchPosts: postActions.fetchPosts
};

export type PostsConnectProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
