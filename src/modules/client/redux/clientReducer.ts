import { Client } from '../../../model/Client';

import { ClientType } from './clientType';
import { ClientAction } from './clientActions';

export interface ClientState {
  clients?: Client[];
}

const INITIAL_STATE: ClientState = {
  clients: []
};

// Reducer
export const clientReducer = (state = INITIAL_STATE, action: ClientAction) => {
  switch (action.type) {
    case ClientType.AddClient:
      return {
        ...state,
        clients: [...state.clients, action.payload.client]
      };
    case ClientType.GetClients:
      return {
        ...state,
        clients: action.payload.clients
      };
    default:
      return INITIAL_STATE;
  }
};
