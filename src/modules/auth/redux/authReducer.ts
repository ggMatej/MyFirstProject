import firebase from 'firebase/app';

import { AuthType } from './authType';
import { AuthAction } from './authActions';

export interface AuthState {
  loading: boolean;
  user: firebase.User;
  error: firebase.auth.AuthError;
}

const INITIAL_STATE: AuthState = {
  loading: false,
  user: null,
  error: null
};

// Reducer
export const authReducer = (
  state: AuthState = INITIAL_STATE,
  action: AuthAction
) => {
  switch (action.type) {
    case AuthType.LoginError:
      return {
        ...state,
        user: null,
        error: action.payload.error,
        loading: false
      };
    case AuthType.LoginSuccess:
      return {
        ...state,
        user: action.payload.user,
        error: null,
        loading: false
      };
    case AuthType.Logout:
      return {
        ...INITIAL_STATE
      };
    case AuthType.Loading:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
