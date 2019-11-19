import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '~/modules/auth';
import { clientReducer } from '~/modules/clients';
import { projectReducer } from '~/modules/projects';

export const configureStore = () =>
  createStore(
    combineReducers({
      auth: authReducer,
      client: clientReducer,
      project: projectReducer
    }),
    applyMiddleware(thunk)
  );
