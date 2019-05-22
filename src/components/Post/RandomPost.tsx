import React, { useEffect, useState } from 'react';
import { FlatList, ListView, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { RandomPostConnectProps } from '../../screens/Post/RandomPostContainer';
import { StackScreenComponent } from '../../utils/types';
import Comment from './Comment';
import Post from './Post';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  error: {
    flex: 1,
    backgroundColor: 'red',
    padding: 15
  },
  loading: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15
  },
});

type RandomPostProps = { subreddit: string } & RandomPostConnectProps;
const RandomPost: StackScreenComponent<RandomPostProps> = ({ subreddit, postsError, isFetchingPosts, postsTimestamp, navigation, posts, token, fetchPosts }) => {
  // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  // const [dataSource, setDataSource] = useState(ds.cloneWithRows(posts));

  useEffect(() => {
    if (!token) {
      navigation.navigate('Login');
      return;
    }

    if (!postsTimestamp || (posts.length === 0 && Date.now() - postsTimestamp > 60 * 1000) && !isFetchingPosts) {
      fetchPosts(subreddit);
    }

    // setDataSource(prevState => prevState.cloneWithRows(posts));
  }, [token, posts, postsTimestamp]);

  const renderPostOfType = (post: any) => {
    switch (post.kind) {
      case 't1': {
        const { body, subreddit, author } = post.data;
        return <Comment
          key={ post.data.id }
          body={ body }
          subreddit={ subreddit }
          author={ author }/>;

      }
      case 't3': {
        const { title, subreddit, preview } = post.data;
        return <Post
          key={ post.data.id }
          title={ title }
          subreddit={ subreddit }
          preview={ preview }
        />;
      }
    }
  };

  const renderPosts = (post: any) => {
    return (
      <View>
        { renderPostOfType(post.item) }
      </View>
    );
  };

  const refreshPosts = () => {
    fetchPosts(subreddit);
  };

  return (
    <View style={ styles.container }>
      { postsError ? (
        <View style={ styles.error }>
          <Text>{ postsError }</Text>
        </View>
      ) : null }

      <FlatList data={ posts }
                renderItem={ renderPosts }
                keyExtractor={ item => item.data.id }
                refreshControl={
                  <RefreshControl
                    refreshing={ isFetchingPosts || !postsTimestamp }
                    onRefresh={ refreshPosts }
                  /> }
      />

    </View>
  );
};

export default RandomPost;
