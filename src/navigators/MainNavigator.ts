import { createSwitchNavigator } from 'react-navigation';

import { AppRoute } from '../const/app-routes';
import { LoadingScreen } from '../screens';

import { AuthenticationNavigator } from './AuthenticationNavigator';
import { HomeNavigator } from './HomeNavigator';

export const MainNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Auth: AuthenticationNavigator,
    Home: HomeNavigator
  },
  {
    initialRouteName: AppRoute.Loading
  }
);
