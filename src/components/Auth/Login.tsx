import React, { useEffect } from 'react';
import { NavState, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { LoginConnectProps } from '../../screens/Auth/LoginContainer';
import { StackScreenComponent } from '../../utils/types';

type LoginProps = LoginConnectProps;
const Login: StackScreenComponent<LoginProps> = ({ isAuthenticating, token, authenticateSuccess, startAuthenticate, navigation }) => {
  const REDDIT_APP_ID = 'oRdmt0rnswmBrg';
  const LOGIN_URL = `https://www.reddit.com/api/v1/authorize.compact?client_id=${ REDDIT_APP_ID }&response_type=token&state=RANDOM_STRING&redirect_uri=react://callback/login&scope=read`;

  useEffect(() => {
    token ? navigation.navigate('Main') : startAuthenticate();
  }, [token]);

  const onNavigationStateChange = (navState: NavState) => {
    if (isAuthenticating && (navState.url as string).indexOf('react://callback/login#') === 0) {
      const regex = /^react:\/\/callback\/login#access_token=(.+)&token/;
      const accessToken = (navState.url as string).match(regex);
      if (accessToken) {
        authenticateSuccess(accessToken[1]);
      }
    }
  };

  return (
    <SafeAreaView style={ { flex: 1 } }>
      <WebView source={ { uri: LOGIN_URL } }
               onNavigationStateChange={ onNavigationStateChange }
               originWhitelist={ ['react://', 'http://', 'https://'] }/>
    </SafeAreaView>
  );
};

export default Login;
