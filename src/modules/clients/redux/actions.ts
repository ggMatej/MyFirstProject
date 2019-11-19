import { ActionUnion, createAction } from '~/modules/store';

import { Client } from '..';

import { ClientType } from './types';

export const ClientAction = {
  change: () => createAction(ClientType.Change),

  add: (client: Client) => createAction(ClientType.Add, { client }),

  getAll: (clients: Client[]) => createAction(ClientType.GetAll, { clients }),

  error: (error: string) => createAction(ClientType.Error, { error })
};

export type ClientAction = ActionUnion<typeof ClientAction>;
