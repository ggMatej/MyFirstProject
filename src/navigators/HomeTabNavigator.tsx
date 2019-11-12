import { createBottomTabNavigator } from 'react-navigation-tabs';

import { AppRoute } from '../const/appRoutes';
import { ClientScreen, SettingsScreen, ProjectsScreen } from '../screens';

export const HomeTabNavigator = createBottomTabNavigator(
  {
    Clients: {
      screen: ClientScreen
    },
    Project: {
      screen: ProjectsScreen
    },

    Settings: {
      screen: SettingsScreen
    }
  },
  {
    initialRouteName: AppRoute.Clients
  }
);
