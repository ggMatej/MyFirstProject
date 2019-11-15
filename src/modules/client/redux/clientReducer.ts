import { Client } from '../../../model/Client';

import { ClientType } from './clientType';
import { ClientAction } from './clientActions';

export interface ClientState {
  isChanging: boolean;
  clients: Client[];
  error: string;
}

const INITIAL_STATE: ClientState = {
  isChanging: false,
  clients: [],
  error: ''
};

// Reducer
export const clientReducer = (
  state: ClientState = INITIAL_STATE,
  action: ClientAction
) => {
  switch (action.type) {
    case ClientType.ChangeClients:
      return {
        ...state,
        isChanging: true
      };
    case ClientType.AddClient:
      return {
        ...state,
        clients: [...state.clients, action.payload.client]
      };
    case ClientType.GetAllClients:
      return {
        ...state,
        isChanging: false,
        clients: action.payload.clients
      };
    case ClientType.Error:
      return {
        ...state,
        isChanging: false,
        error: action.payload.error
      };
    default:
      return INITIAL_STATE;
  }
};
