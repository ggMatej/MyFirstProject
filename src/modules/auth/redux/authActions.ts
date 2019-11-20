import firebase from 'firebase/app';

import { createAction } from '../../store/helpers/createAction';

import { AuthType } from './authType';

export const AuthAction = {
  loginSuccess: (user: firebase.User) =>
    createAction(AuthType.LoginSuccess, { user }),
  loginError: (error: string) => createAction(AuthType.LoginError, { error }),
  logout: () => createAction(AuthType.Logout),
  loading: () => createAction(AuthType.Loading)
};

export type AuthAction = ReturnType<typeof AuthAction[keyof typeof AuthAction]>;
