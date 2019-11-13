import { createSwitchNavigator } from 'react-navigation';

import { AppRoute } from '../const/appRoutes';
import { SplashScreen } from '../screens';

import { AuthenticationNavigator } from './AuthenticationNavigator';
import { HomeStackNavigator } from './HomeStackNavigator';

export const MainNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthenticationNavigator,
    HomeStack: HomeStackNavigator
  },
  {
    initialRouteName: AppRoute.Splash
  }
);
