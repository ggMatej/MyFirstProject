import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/appRoutes';
import { SettingsScreen } from '../screens';

export const SettingStackNavigator = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  {}
);
