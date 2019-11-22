import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from 'modules/auth';
import { clientReducer } from 'modules/clients';
import { projectReducer } from 'modules/projects';

const rootreducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  project: projectReducer
});

export const configureStore = () =>
  createStore(rootreducer, composeWithDevTools(applyMiddleware(thunk)));
