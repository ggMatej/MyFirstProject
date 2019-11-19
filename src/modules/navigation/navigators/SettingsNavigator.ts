import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/app-routes';
import { SettingsScreen } from '../screens/SettingsScreen';

export const SettingsNavigator = createStackNavigator({
  [AppRoute.Settings]: SettingsScreen
});
