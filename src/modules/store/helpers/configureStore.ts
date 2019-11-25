import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { authReducer } from 'modules/auth';
import { clientReducer } from 'modules/clients';
import { projectReducer } from 'modules/projects';
// import AsyncStorage from '@react-native-community/async-storage';
// import { createLogger } from 'redux-logger';

const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  project: projectReducer
});

export const configureStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// const persistConfig = {
//   key: 'rootReducer',
//   storage: AsyncStorage,
//   whitelist: ['auth'],
//   blacklist: ['client', 'project']
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(
//   persistedReducer,
//   composeWithDevTools(applyMiddleware(thunk, createLogger()))
// );
// export const persistor = persistStore(store);
