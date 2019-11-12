import firebase from 'firebase/app';

import { AuthType } from './authType';

export const AuthAction = {
  loginAction(user: firebase.User) {
    return {
      type: AuthType.LoginSuccess,
      payload: {
        user
      }
    };
  },
  loginFailedAction(error: firebase.auth.AuthError) {
    return {
      type: AuthType.LoginError,
      payload: {
        error
      }
    };
  },
  logOutAction() {
    return {
      type: AuthType.Logout
    };
  }
};

export type AuthAction = ReturnType<typeof AuthAction[keyof typeof AuthAction]>;

// export function loginAction(user: firebase.User) {
//   return {
//     type: AuthType.LoginSuccess,
//     payload: {
//       user
//     }
//   };
// }

// export function loginFailedAction(error: firebase.auth.AuthError) {
//   return {
//     type: AuthType.LoginError,
//     payload: {
//       error
//     }
//   };
// }
