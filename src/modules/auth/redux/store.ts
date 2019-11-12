import { createStore, combineReducers } from 'redux';

import { authReducer } from './authReducer';

export const store = createStore(authReducer);
