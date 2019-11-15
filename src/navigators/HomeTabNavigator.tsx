import { createBottomTabNavigator } from 'react-navigation-tabs';

import { AppRoute } from '../const/appRoutes';

import { ClientStackNavigator } from './ClientStackNavigator';
import { ProjectStackNavigator } from './ProjectStackNavigator';
import { SettingStackNavigator } from './SettingStackNavigator';

export const HomeTabNavigator = createBottomTabNavigator(
  {
    ClientStack: ClientStackNavigator,
    ProjectStack: ProjectStackNavigator,
    SettingStack: SettingStackNavigator
  },
  {
    initialRouteName: AppRoute.ClientStack
  }
);
