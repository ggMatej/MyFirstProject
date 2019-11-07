import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import { AppRoute } from '../const/app-routes';
import { HomeScreen, AboutScreen } from '../screens';

export const HomeTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Clients'
      }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        title: 'About'
      }
    }
  },
  {
    initialRouteName: AppRoute.Home
  }
);
