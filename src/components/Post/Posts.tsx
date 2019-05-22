import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { PostsConnectProps } from '../../screens/Post/PostsContainer';
import { StackScreenComponent } from '../../utils/types';
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
  }
});

type PostsProps = { subreddit: string } & PostsConnectProps;
const Posts: StackScreenComponent<PostsProps> = ({ navigation, token, posts, isFetchingPosts, postsError, postsTimestamp, fetchPosts, subreddit }) => {

  useEffect(() => {
    if (!token) {
      navigation.navigate('Login');
      return;
    }

    if (!postsTimestamp || (posts.length === 0 && Date.now() - postsTimestamp > 60 * 1000) && !isFetchingPosts) {
      fetchPosts(subreddit);
    }
  }, [token, posts, postsTimestamp]);

  const renderPosts = () => posts.map((post, index) => {
    const { title, subreddit, preview } = post.data;
    return (
      <Post
        key={ index }
        title={ title }
        subreddit={ subreddit }
        preview={ preview }
      />
    );
  });

  return (
    <View style={ styles.container }>
      {
        postsError ?
          <View style={ styles.error }>
            <Text>Error</Text>
          </View> :
          null
      }
      {
        !postsError && (isFetchingPosts || !postsTimestamp) ?
          <View style={ styles.loading }>
            <Text>Loading...</Text>
          </View> :
          null
      }
      <ScrollView style={ { flex: Math.min(posts.length, 1) } }>
        {
          posts.length > 0 ?
            renderPosts() :
            null
        }
      </ScrollView>
    </View>
  );
};

export default Posts;
