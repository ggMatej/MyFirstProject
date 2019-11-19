import { Client } from '../../../model/Client';
import { Project } from '../../../model/Project';

import { ClientType } from './clientType';
import { ClientAction } from './clientActions';

export interface ClientState {
  isChanging: boolean;
  clients: Client[];
  projects: Project[];
  error: string;
}

const INITIAL_STATE: ClientState = {
  isChanging: false,
  clients: [],
  projects: [],
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
    case ClientType.GetClientProjects:
      return {
        ...state,
        isChanging: false,
        projects: action.payload.projects
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
