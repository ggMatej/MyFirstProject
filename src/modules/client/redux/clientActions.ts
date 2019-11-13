import { Client } from '../../../model/Client';

import { ClientType } from './clientType';

export const ClientAction = {
  addClientAction(client: Client) {
    return {
      type: ClientType.AddClient,
      payload: {
        client
      }
    };
  },

  getClientsAction(clients: Client[]) {
    return {
      type: ClientType.GetClients,
      payload: {
        clients
      }
    };
  }
};

export type ClientAction = ReturnType<
  typeof ClientAction[keyof typeof ClientAction]
>;
