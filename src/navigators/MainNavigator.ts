import { createSwitchNavigator } from 'react-navigation';

import { AppRoute } from '../const/appRoutes';
import { SplashScreen } from '../screens';

import { AuthenticationNavigator } from './AuthenticationNavigator';
import { HomeTabNavigator } from './HomeTabNavigator';

export const MainNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthenticationNavigator,
    HomeTab: HomeTabNavigator
  },
  {
    initialRouteName: AppRoute.Splash
  }
);
