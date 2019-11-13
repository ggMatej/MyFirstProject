import { Client } from '../../../model/Client';

import { UserType } from './userType';
import { UserAction } from './userActions';

export interface UserState {
  clients?: Client[];
}

const INITIAL_STATE: UserState = {
  clients: []
};

// Reducer
export const userReducer = (state = INITIAL_STATE, action: UserAction) => {
  switch (action.type) {
    case UserType.AddClient:
      return {
        ...state,
        clients: [...state.clients, action.payload.client]
      };
    case UserType.GetClients:
      return {
        ...state,
        clients: action.payload.clients
      };
    default:
      return INITIAL_STATE;
  }
};
