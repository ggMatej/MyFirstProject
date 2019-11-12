import { createSwitchNavigator } from 'react-navigation';

import { AppRoute } from '../const/appRoutes';
import { LoadingScreen } from '../screens';

import { AuthenticationNavigator } from './AuthenticationNavigator';
import { HomeTabNavigator } from './HomeTabNavigator';

export const MainNavigator = createSwitchNavigator(
  {
    Loading: LoadingScreen,
    Auth: AuthenticationNavigator,
    HomeTab: HomeTabNavigator
  },
  {
    initialRouteName: AppRoute.Loading
  }
);
