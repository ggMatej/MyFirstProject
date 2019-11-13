import { createStackNavigator } from 'react-navigation-stack';

import { AppRoute } from '../const/appRoutes';
import { AddClientScreen } from '../screens';
import { HomeTabNavigator } from '../navigators/HomeTabNavigator';

export const HomeStackNavigator = createStackNavigator(
  {
    AddClient: {
      screen: AddClientScreen
    },
    HomeTab: HomeTabNavigator
  },
  {
    initialRouteName: AppRoute.HomeTab,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'black'
      },
      title: 'Welcome!',
      headerTitleStyle: {
        color: 'white',
        fontWeight: 'bold'
      },
      headerLeft: null
    }
  }
);
