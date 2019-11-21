import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/app-routes';
import { ClientScreen } from '../screens/ClientsScreen';
import { AddClientScreen } from '../screens/AddClientScreen';
import { ClientDetailsScreen } from '../screens/ClientDetailsScreen';

export const ClientNavigator = createStackNavigator({
  [AppRoute.Clients]: ClientScreen,
  [AppRoute.AddClient]: AddClientScreen,
  [AppRoute.ClientDetails]: ClientDetailsScreen
});
