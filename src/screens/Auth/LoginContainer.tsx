import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { AppState } from '../../store/store';
import { AuthActions, authActions } from './redux';
import Login from '../../components/Auth/Login';

const mapStateToProps = (state: AppState) => ({
  isAuthenticating: state.userState.isAuthenticating,
  token: state.userState.token
});

const mapDispatchToProps = (dispatch: Dispatch<AuthActions>) => bindActionCreators({
  authenticateSuccess: authActions.authenticateSuccess,
  startAuthenticate: authActions.startAuthenticate
}, dispatch);

export type LoginConnectProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
