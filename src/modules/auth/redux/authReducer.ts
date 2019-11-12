import firebase from 'firebase/app';

import { AuthType } from './authType';
import { AuthAction } from './authActions';

export interface AuthState {
  user: firebase.User;
  error: firebase.auth.AuthError;
}

const INITIAL_STATE: AuthState = {
  user: null,
  error: null
};

// Reducer
export const authReducer = (state = INITIAL_STATE, action: AuthAction) => {
  switch (action.type) {
    case AuthType.LoginError:
      return {
        ...state,
        user: null,
        error: action.payload.error
      };
    case AuthType.LoginSuccess:
      return {
        ...state,
        user: action.payload.user,
        error: null
      };
    case AuthType.Logout:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
