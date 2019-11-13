import { createStore, combineReducers } from 'redux';

import { authReducer } from './auth/redux/authReducer';
import { clientReducer } from './client/redux/clientReducer';

export const store = createStore(
  combineReducers({
    auth: authReducer,
    client: clientReducer
  })
);
