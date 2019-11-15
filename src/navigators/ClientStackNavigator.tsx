import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/appRoutes';
import {
  ClientScreen,
  ClientProjectsScreen,
  AddClientScreen
} from '../screens';

export const ClientStackNavigator = createStackNavigator(
  {
    Clients: {
      screen: ClientScreen
    },
    AddClients: {
      screen: AddClientScreen
    },
    ClientProjects: {
      screen: ClientProjectsScreen
    }
  },
  {
    initialRouteName: AppRoute.Clients
  }
);
