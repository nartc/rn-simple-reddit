import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import LoginContainer from '../screens/Auth/LoginContainer';
import PostsContainer from '../screens/Post/PostsContainer';
import RandomPostContainer from '../screens/Post/RandomPostContainer';

const postsStackNavigator = createStackNavigator({
  Posts: PostsContainer
}, {
  defaultNavigationOptions: {
    title: 'Reddit Posts'
  },
});

const randomPostStackNavigator = createStackNavigator({
  Random: RandomPostContainer
}, {
  defaultNavigationOptions: {
    title: 'Reddit Random'
  }
});

const mainTabNavigator = createBottomTabNavigator({
  PostsStack: postsStackNavigator,
  RandomStack: randomPostStackNavigator
}, {
  tabBarOptions: {
    tabStyle: {
      borderTopWidth: 0.5,
      borderColor: '#b7b7b7',
      backgroundColor: '#fff',
      opacity: 1
    }
  },
  initialRouteName: 'PostsStack'
});

const mainNavigator = createSwitchNavigator({
  Main: mainTabNavigator,
  Login: LoginContainer
}, {
  initialRouteName: 'Login'
});

export default createAppContainer(mainNavigator);
