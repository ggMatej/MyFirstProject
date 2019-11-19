import { createAction, ActionUnion } from '~/modules/store';

import { AuthType } from './types';

export const AuthAction = {
  change: () => createAction(AuthType.Change),

  authSuccess: (user: firebase.User) =>
    createAction(AuthType.Success, { user }),

  authError: (error: string) => createAction(AuthType.Error, { error }),

  logout: () => createAction(AuthType.Logout)
};

export type AuthAction = ActionUnion<typeof AuthAction>;
