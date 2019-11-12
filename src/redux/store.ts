import { createStore, combineReducers } from 'redux';

import { authReducer } from './auth/authReducer';

export const store = createStore(authReducer);
