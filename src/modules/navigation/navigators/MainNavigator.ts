import { createSwitchNavigator } from 'react-navigation';

import { AppRoute } from '../const/app-routes';

import { AuthenticationNavigator } from './AuthenticationNavigator';
import { BottomTabNavigator } from './BottomTabNavigator';

export const MainNavigator = createSwitchNavigator({
  [AppRoute.Auth]: AuthenticationNavigator,
  [AppRoute.Home]: BottomTabNavigator
});
