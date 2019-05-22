import React, { FC } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 15,
    flexDirection: 'row'
  },
  thumbnailSection: {
    width: 80
  },
  textSection: {
    flex: 1
  },
  title: {},
  subreddit: {
    color: '#999',
    fontSize: 11
  }
});

type PostProps = {
  title: string;
  subreddit: string;
  preview: any;
};
const Post: FC<PostProps> = ({ title, subreddit, preview }) => {
  return (
    <View style={ styles.container }>
      <View style={ styles.thumbnailSection }>
        {
          preview && preview.images[0].source.url ?
            <Image
              style={ { width: 60, height: 60 } }
              source={ { uri: preview.images[0].source.url } }
            /> :
            <View
              style={ { width: 60, height: 60, backgroundColor: '#eee' } }
            />
        }
      </View>
      <View style={ styles.textSection }>
        <Text style={ styles.title } numberOfLines={ 2 }>{ title }</Text>
        <Text style={ styles.subreddit }>r/{ subreddit }</Text>
      </View>
    </View>
  );
};

export default Post;
