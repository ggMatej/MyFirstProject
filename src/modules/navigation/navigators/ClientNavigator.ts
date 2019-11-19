import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/app-routes';
import { ClientScreen } from '../screens/ClientsScreen';
import { AddClientScreen } from '../screens/AddClientScreen';

export const ClientNavigator = createStackNavigator({
  [AppRoute.Clients]: ClientScreen,
  [AppRoute.AddClient]: AddClientScreen
  // Add client details here
});
