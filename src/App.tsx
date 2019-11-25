import { createAppContainer } from 'react-navigation';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'modules/store';
import { MainNavigator } from 'modules/navigation';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';

export const AppContainer = createAppContainer(MainNavigator);

export const App: React.FC = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};
