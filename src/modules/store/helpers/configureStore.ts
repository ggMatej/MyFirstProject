import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../../auth/redux/authReducer';
import { clientReducer } from '../../client/redux/clientReducer';
import { projectReducer } from '../../projects/redux/projectReducer';

export const configureStore = () =>
  createStore(
    combineReducers({
      auth: authReducer,
      client: clientReducer,
      project: projectReducer
    }),
    applyMiddleware(thunk)
  );
