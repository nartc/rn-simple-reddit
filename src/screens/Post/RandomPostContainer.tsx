import { connect } from 'react-redux';
import RandomPost from '../../components/Post/RandomPost';
import { AppState } from '../../store/store';
import { postActions } from './redux';

const mapStateToProps = (state: AppState) => ({
  token: state.userState.token,
  posts: state.postState.subreddits.random,
  postsError: state.postState.error,
  postsTimestamp: state.postState.timestamp,
  isFetchingPosts: state.postState.isLoading,
  subreddit: 'random'
});

const mapDispatchToProps = {
  fetchPosts: postActions.fetchPosts
};

export type RandomPostConnectProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(RandomPost);
