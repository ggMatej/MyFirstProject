import { createAppContainer } from 'react-navigation';
import React from 'react';
import { Provider } from 'react-redux';

import { MainNavigator } from './navigators';
import { configureStore } from './modules/store/helpers/configureStore';

export const AppContainer = createAppContainer(MainNavigator);

export const App: React.FC = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
