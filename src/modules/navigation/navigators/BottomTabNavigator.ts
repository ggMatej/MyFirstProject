import { createBottomTabNavigator } from 'react-navigation-tabs';

import { AppRoute } from '../const/app-routes';

import { ClientNavigator } from './ClientNavigator';
import { ProjectNavigator } from './ProjectNavigator';
import { SettingsNavigator } from './SettingsNavigator';

export const BottomTabNavigator = createBottomTabNavigator({
  [AppRoute.Clients]: ClientNavigator,
  [AppRoute.Projects]: ProjectNavigator,
  [AppRoute.Settings]: SettingsNavigator
});
