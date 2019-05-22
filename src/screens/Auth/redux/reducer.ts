import { action } from 'typesafe-actions';
import { ActionTypeWithout } from '../../../utils/types';

export const AUTHENTICATION_START = 'AUTHENTICATION_START';
export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_FAILURE = 'AUTHENTICATION_FAILURE';

export const authActions = {
  startAuthenticate: () => action(AUTHENTICATION_START),
  authenticateSuccess: (token: string) => action(AUTHENTICATION_SUCCESS, token),
  authenticateFailure: (error: any) => action(AUTHENTICATION_FAILURE, error),
  authenticatePending: () => action(AUTHENTICATION_PENDING)
};

export type AuthActions = ActionTypeWithout<typeof authActions, 'startAuthenticate'>;
export type AuthState = {
  readonly isAuthenticating: boolean;
  readonly token: string;
  readonly error: any;
};

const initialState: AuthState = {
  isAuthenticating: false,
  token: '',
  error: null
};

export const authReducer = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case 'AUTHENTICATION_PENDING':
      return {
        isAuthenticating: true,
        error: null,
        token: ''
      };
    case 'AUTHENTICATION_SUCCESS':
      return {
        isAuthenticating: false,
        token: action.payload,
        error: null
      };
    case 'AUTHENTICATION_FAILURE':
      return {
        isAuthenticating: false,
        token: '',
        error: action.payload
      };
    default:
      return state;
  }
};
