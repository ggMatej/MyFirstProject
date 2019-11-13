import { createStore, combineReducers } from 'redux';

import { authReducer } from './auth/redux/authReducer';
import { userReducer } from './user/redux/userReducer';

export const store = createStore(
  combineReducers({
    auth: authReducer,
    user: userReducer
  })
);
