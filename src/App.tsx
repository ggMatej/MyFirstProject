import { createAppContainer } from 'react-navigation';
import React from 'react';
import { Provider } from 'react-redux';

import { MainNavigator } from './navigators';
import { store } from './modules/store';

export const AppContainer = createAppContainer(MainNavigator);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
