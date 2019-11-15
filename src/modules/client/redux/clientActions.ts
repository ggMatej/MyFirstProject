import { Client } from '../../../model/Client';
import { ActionUnion } from '../../store/models/ActionUnion';
import { createAction } from '../../store/helpers/createAction';

import { ClientType } from './clientType';

export const ClientAction = {
  change: () => createAction(ClientType.ChangeClients),

  add: (client: Client) => createAction(ClientType.AddClient, { client }),

  getAll: (clients: Client[]) =>
    createAction(ClientType.GetAllClients, { clients }),

  error: (error: string) => createAction(ClientType.Error, { error })
};

export type ClientAction = ActionUnion<typeof ClientAction>;
