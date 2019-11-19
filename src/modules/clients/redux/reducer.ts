import { Client } from '..';

import { ClientAction } from './actions';
import { ClientType } from './types';

export interface ClientState {
  isChanging: boolean;
  clients: Client[];
  error?: string;
}

const INITIAL_STATE: ClientState = {
  isChanging: false,
  clients: [],
  error: undefined
};

export const clientReducer = (
  state: ClientState = INITIAL_STATE,
  action: ClientAction
) => {
  switch (action.type) {
    case ClientType.Change:
      return {
        ...state,
        isChanging: true
      };
    case ClientType.Add:
      return {
        ...state,
        clients: [...state.clients, action.payload.client]
      };
    case ClientType.GetAll:
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
