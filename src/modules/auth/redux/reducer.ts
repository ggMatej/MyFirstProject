import { AuthType } from './types';
import { AuthAction } from './actions';

export interface AuthState {
  loading: boolean;
  user?: firebase.User;
  error?: string;
}

const INITIAL_STATE: AuthState = {
  loading: false,
  user: undefined,
  error: undefined
};

export const authReducer = (
  state: AuthState = INITIAL_STATE,
  action: AuthAction
) => {
  switch (action.type) {
    case AuthType.Change:
      return {
        ...state,
        loading: true
      };

    case AuthType.Success:
      return {
        ...state,
        user: action.payload.user,
        error: undefined,
        loading: false
      };
    case AuthType.Error:
      return {
        ...state,
        user: undefined,
        error: action.payload.error,
        loading: false
      };
    case AuthType.Logout:
      return {
        ...INITIAL_STATE
      };
    default:
      return state;
  }
};
