import { Client } from '../../../model/Client';

import { UserType } from './userType';

export const UserAction = {
  addClientAction(client: Client) {
    return {
      type: UserType.AddClient,
      payload: {
        client
      }
    };
  },

  getClientsAction(clients: Client[]) {
    return {
      type: UserType.GetClients,
      payload: {
        clients
      }
    };
  }
};

export type UserAction = ReturnType<typeof UserAction[keyof typeof UserAction]>;
