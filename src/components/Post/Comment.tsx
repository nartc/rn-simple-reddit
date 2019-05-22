import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 15,
    flexDirection: 'row',
    marginLeft: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
  thumbnailSection: {
    width: 80
  },
  textSection: {
    flex: 1
  },
  detailInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  subreddit: {
    color: '#999',
    fontSize: 11,
  },
  title: {}
});

type CommentProps = {
  body: any;
  subreddit: string;
  author: string
};
const Comment: FC<CommentProps> = ({ body, subreddit, author }) => {
  return (
    <View style={ styles.container }>
      <View style={ styles.textSection }>
        <Text style={ styles.title } numberOfLines={ 2 }>{ body }</Text>
        <View style={ styles.textSection }>
          <Text style={ styles.subreddit }>r/{ subreddit }</Text>
          <Text style={ styles.subreddit }>r/{ author }</Text>
        </View>
      </View>
    </View>
  );
};

export default Comment;
