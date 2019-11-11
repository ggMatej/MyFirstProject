export enum AuthActions {
  LoginSuccess = 'LOGIN_SUCCESS',
  LoginError = 'LOGIN_FAILED'
}

export function loginAction(user) {
  return {
    type: AuthActions.LoginSuccess,
    payload: {
      user
    }
  };
}

export function loginFailedAction(error: string) {
  return {
    type: AuthActions.LoginError,
    payload: {
      error
    }
  };
}
