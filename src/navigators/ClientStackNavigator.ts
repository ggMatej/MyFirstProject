import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/appRoutes';
import {
  ClientScreen,
  ClientProjectsScreen,
  AddClientScreen,
  AddProjectScreen
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
    },
    AddProject: {
      screen: AddProjectScreen
    }
  },
  {
    initialRouteName: AppRoute.Clients
  }
);
